import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReview = async (userId: string, payload: IReview) => {
  // Check if customer has completed the booking
  const booking = await prisma.booking.findFirst({
    where: {
      customerId: userId,
      serviceId: payload.serviceId,
      status: BookingStatus.COMPLETE,
    },
  });

  if (!booking) {
    throw new Error(
      "You can only review a service after the booking has been completed.",
    );
  }

  // Prevent duplicate reviews
  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      serviceId: payload.serviceId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this service.");
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      serviceId: payload.serviceId,
      userId,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
      service: true,
    },
  });

  return review;
};

export const reviewService = {
  createReview,
};
