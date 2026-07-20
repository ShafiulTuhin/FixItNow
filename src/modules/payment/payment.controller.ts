import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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

const getMyPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { id: string };
    // console.log(user);

    const result = await paymentService.getMyPayments(user.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment history retrieved successfully",
      data: result,
    });
  },
);

const getPaymentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const id = req.params.id as string;

    const result = await paymentService.getPaymentById(id, user.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment retrieved successfully",
      data: result,
    });
  },
);

export const paymentController = {
  createCheckoutSession,
  getMyPayments,
  getPaymentById,
};
