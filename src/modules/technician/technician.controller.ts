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

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await technicianService.getMyBookings(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await technicianService.updateBookingStatus(
    req.user!.id,
    id as string,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking status updated successfully",
    data: result,
  });
});

const updateServiceAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await technicianService.updateServiceAvailability(
      req.user!.id,
      id as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability updated successfully",
      data: result,
    });
  },
);
export const technicianController = {
  updateTechnicianProfile,
  getMyBookings,
  updateBookingStatus,
  updateServiceAvailability,
};
