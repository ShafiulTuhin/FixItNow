import { prisma } from "../../lib/prisma";
import { ICreateServicesPayload } from "./service.interface";

const createService = async (
  payload: ICreateServicesPayload,
  userId: string,
) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });
  console.log(technician.id);

  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianId: technician.id,
    },
  });

  return result;
};

const getAllService = async (query: Record<string, any>) => {
  const where: any = {
    AND: [],
  };

  // Search by service title
  if (query.searchTerm) {
    where.AND.push({
      title: {
        contains: query.searchTerm,
        mode: "insensitive",
      },
    });
  }

  // Filter by category name
  if (query.category) {
    where.AND.push({
      category: {
        name: {
          contains: query.category,
          mode: "insensitive",
        },
      },
    });
  }

  // Filter by location
  if (query.location) {
    where.AND.push({
      location: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  // Filter by price
  if (query.minPrice || query.maxPrice) {
    where.AND.push({
      price: {
        ...(query.minPrice && { gte: Number(query.minPrice) }),
        ...(query.maxPrice && { lte: Number(query.maxPrice) }),
      },
    });
  }

  const services = await prisma.service.findMany({
    where,
    include: {
      category: true,
      technician: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
      reviews: true,
    },
  });

  // Filter by average rating
  if (query.rating) {
    return services.filter((service) => {
      if (service.reviews.length === 0) return false;

      const averageRating =
        service.reviews.reduce((sum, review) => sum + review.rating, 0) /
        service.reviews.length;

      return averageRating >= Number(query.rating);
    });
  }

  return services;
};

export const techniciansService = { createService, getAllService };
