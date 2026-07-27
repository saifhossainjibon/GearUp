import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";


const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.user?.id;

  const result = await reviewService.createReview(
    customerId as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully.",
    data: result,
  });
});

export const reviewController = {
  createReview,
};

