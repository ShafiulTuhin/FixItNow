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

export const technicianService = { updateTechnicianProfile, getMyBookings };
