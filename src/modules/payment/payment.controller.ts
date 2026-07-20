import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { Request, Response } from "express";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const { bookingId } = req.body;

    const result = await paymentService.createCheckoutSession(bookingId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout session created successfully",
      data: result,
    });
  },
);

export const paymentController = { createCheckoutSession };
