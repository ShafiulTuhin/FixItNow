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

const getAllService = async () => {
  const services = await prisma.service.findMany();
  return services;
};

export const techniciansService = { createService, getAllService };
