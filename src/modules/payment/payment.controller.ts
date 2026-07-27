import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const result = await paymentService.createPayment(
      customerId as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Checkout session created successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body;
    const signature = req.headers["stripe-signature"]!;
    await paymentService.handleWebhook(event, signature as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Webhook tiggered Successfully",
      data: null,
    });
  },
);

const getPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.user?.id;
  const result = await paymentService.getPaymentHistory(customerId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully.",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.user?.id;
  const paymentId = req.params.id;

  const result = await paymentService.getPaymentById(
    paymentId as string,
    customerId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment retrieved successfully.",
    data: result,
  });
});

export const paymentController = {
  createCheckoutSession,
  handleWebhook,
  getPaymentHistory,
  getPaymentById,
};
