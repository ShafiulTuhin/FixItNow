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

export const bookingController = { createBooking };
