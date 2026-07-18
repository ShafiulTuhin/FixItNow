import { NextFunction, Request, Response, Router } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";

import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully!",
      data: { user },
    });
  },
);

export const userController = { createUser };
