import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const updateTechnicianProfile = async (userId: string, payload: any) => {
  const { name, phoneNumber, experience, bio } = payload;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      phoneNumber,
      technicianProfile: {
        upsert: {
          update: {
            experience,
            bio,
          },
          create: {
            experience,
            bio,
          },
        },
      },
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  return updatedUser;
};

// Get bookings for a technician:
const getMyBookings = async (userId: string) => {
  // Find technician profile
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  // Get technician bookings
  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: technician.id,
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
    },
    orderBy: {
      bookingDate: "desc",
    },
  });

  return bookings;
};

// Update booking status: approve/decline/accept

// const updateBookingStatus = async (
//   userId: string,
//   bookingId: string,
//   status: BookingStatus,
// ) => {
//   // Find technician profile
//   const technician = await prisma.technicianProfile.findUniqueOrThrow({
//     where: {
//       userId,
//     },
//     select: {
//       id: true,
//     },
//   });

//   // Verify booking belongs to this technician
//   const booking = await prisma.booking.findFirst({
//     where: {
//       id: bookingId,
//       technicianId: technician.id,
//     },
//   });

//   // if (!booking) {
//   //   throw new AppError(httpStatus.NOT_FOUND, "Booking not found.");
//   // }

//   const updatedBooking = await prisma.booking.update({
//     where: {
//       id: bookingId,
//     },
//     data: {
//       status,
//     },
//     include: {
//       customer: true,
//       service: true,
//       technician: {
//         include: {
//           user: true,
//         },
//       },
//     },
//   });

//   return updatedBooking;
// };
const updateBookingStatus = async (
  userId: string,
  bookingId: string,
  status: BookingStatus,
) => {
  // Find the logged-in technician profile
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  // Find the booking that belongs to this technician
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      technicianId: technician.id,
    },
  });

  // Prevent other technicians from updating this booking
  if (!booking) {
    throw new Error("You are not authorized to update this booking.");
  }

  // Update booking status
  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status,
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
          user: true,
        },
      },
    },
  });

  return updatedBooking;
};

export const technicianService = {
  updateTechnicianProfile,
  getMyBookings,
  updateBookingStatus,
};
