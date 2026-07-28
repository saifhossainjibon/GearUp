import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully.",
      data: result,
    });
  },
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params?.id;
    const result = await adminService.updateUserStatus(
      userId as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully.",
      data: result,
    });
  },
);

const getAllGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllGear();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear listings retrieved successfully.",
      data: result,
    });
  },
);

const getAllRentalOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllRentalOrders();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental orders retrieved successfully.",
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllCategoryFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Category retrieved successfully.",
      data: result,
    });
  },
);

const addCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await adminService.addCategoryToDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category Created successfully",
      data: result,
    });
  },
);
const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const payload = req.body;

    if (!categoryId) {
      throw new Error("category Id Required In Params");
    }

    const result = await adminService.updateCategoryToDB(
      categoryId as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "category updated successfully",
      data: result,
    });
  },
);
const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;

    if (!categoryId) {
      throw new Error("category Id Required In Params");
    }
    await adminService.deleteCategoryFromDB(categoryId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "category deleted successfully",
      data: null,
    });
  },
);

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentalOrders,
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
