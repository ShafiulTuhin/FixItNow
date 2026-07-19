import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { techniciansService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await techniciansService.createService(
      payload,
      id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service created successfully",
      data: result,
    });
  },
);

// const getAllServices = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const posts = await techniciansService.getAllService();

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "Services retrieved successfully",
//       data: posts,
//     });
//   },
// );
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await techniciansService.getAllService(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully",
    data: result,
  });
});

export const serviceController = { createService, getAllServices };
