import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await bookingService.createBooking(req.user!.id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Booking created successfully",
      data: result,
    });
  },
);

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getMyBookings(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookingService.getBookingDetails(
    req.user!.id,
    id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking details retrieved successfully",
    data: result,
  });
});
export const bookingController = {
  createBooking,
  getMyBookings,
  getBookingDetails,
};
