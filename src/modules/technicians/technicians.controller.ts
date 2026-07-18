import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { technicianService } from "./technicians.service";

const getAllTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const query = req.query;

    const technicians = await technicianService.getAllTechnicians();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technicians retrieved successfully",
      data: technicians,
    });
  },
);

export const technicianController = { getAllTechnician };
