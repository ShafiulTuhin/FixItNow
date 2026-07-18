import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { technicianService } from "./technician.service";
import httpStatus from "http-status";

const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("controller called");
    const userId = req.user?.id as string;
    console.log(userId);

    const payload = req.body;
    // console.log(payload);

    const updatedProfile = await technicianService.updateTechnicianProfile(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: { updatedProfile },
    });
  },
);

export const technicianController = { updateTechnicianProfile };
