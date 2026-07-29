import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { gearService } from "./gear.service";

const getAllGears = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const query = req.query;
    const result = await gearService.getAllGears(query);

    sendResponse(res, {
        success : true,
        statusCode : HttpStatus.OK,
        message : "Gears Retrieved Successfully",
        data: result
    })
})

const getGearDetails = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const gearId = req.params.id;
    const result = await gearService.getGearDetails(gearId as string);

    sendResponse(res, {
        success : true,
        statusCode : HttpStatus.OK,
        message : "Gears Retrieved Successfully",
        data: result
    })
})
export const gearController = {
    getAllGears, getGearDetails
}