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

const getTechnicianById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await technicianService.getTechnicianById(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician retrieved successfully",
      data: result,
    });
  },
);

export const technicianController = {
  getAllTechnician,
  getTechnicianById,
};
