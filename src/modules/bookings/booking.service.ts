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

const getMyBookings = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      customerId: userId,
    },
    // include: {
    //   service: true,
    //   technician: {
    //     include: {
    //       user: {
    //         omit: {
    //           password: true,
    //         },
    //       },
    //     },
    //   },
    // },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};

const getBookingDetails = async (userId: string, bookingId: string) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerId: userId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          profileImage: true,
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

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};
export const bookingService = {
  createBooking,
  getMyBookings,
  getBookingDetails,
};
