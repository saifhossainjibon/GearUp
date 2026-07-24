import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { rentalService } from "./rental.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";


const createRental = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;

    const result = await rentalService.createRental(customerId as string, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental order created successfully.",
      data: result
    });
  },
);

const getMyRentalOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    
    const result = await rentalService.getMyRentalOrders(
      customerId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental orders retrieved successfully.",
      data: result,
    });
  },
);

const getRentalOrderById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const rentalOrderId = req.params?.id;
  const customerId = req.user?.id;

  const result = await rentalService.getRentalOrderById(
    rentalOrderId as string,
    customerId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental order retrieved successfully.",
    data: result,
  });
});
export const rentalController = {
  createRental,getMyRentalOrders,getRentalOrderById
};
