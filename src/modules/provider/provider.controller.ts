import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { providerService } from "./provider.service";

const addGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await providerService.addGearToDB(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Gear Created successfully",
      data: result,
    });
  },
);

const updateGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const providerId = req.user?.id;
    const gearId = req.params.id;
    const payload = req.body;
    const isAdmin = req.user?.role === "ADMIN";
    
    if (!gearId) {
      throw new Error("gear Id Required In Params");
    }

    const result = await providerService.updateGear(
      gearId as string,
      payload,
      providerId as string, 
      isAdmin
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Gear updated successfully",
      data: result,
    });
  },
);

const deleteGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId = req.user?.id;
    const gearId = req.params.id;
    const isAdmin = req.user?.role === "ADMIN";

    if (!gearId) {
      throw new Error("Gear Id Required In Params");
    }
    await providerService.deleteGear(
      gearId as string,
      providerId as string,
      isAdmin
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Gear Deleted successfully",
      data: null,
    });
  },
);

export const providerController ={
    addGear, updateGear, deleteGear
}