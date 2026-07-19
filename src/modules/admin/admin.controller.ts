import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { adminService } from "./admin.service";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await adminService.createCategory(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllCategory();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: result,
    });
  },
);

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  },
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("params:", req.params);
    const userId = req.params.userId;

    const { status } = req.body;

    const result = await adminService.updateUser(status, userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  },
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllBookings();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
    });
  },
);

export const adminController = {
  createCategory,
  getAllCategory,
  getAllUser,
  updateUser,
  getAllBookings,
};
