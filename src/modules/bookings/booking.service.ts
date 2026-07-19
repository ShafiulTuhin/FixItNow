import { prisma } from "../../lib/prisma";
import { IBooking } from "./booking.interface";

const createBooking = async (userId: string, payload: IBooking) => {
  // Check service exists
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: payload.serviceId,
    },
    select: {
      id: true,
      technicianId: true,
    },
  });

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      customerId: userId,
      serviceId: service.id,
      technicianId: service.technicianId,
      bookingDate: payload.bookingDate,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      service: true,
      technician: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
  });

  return booking;
};

export const bookingService = { createBooking };
