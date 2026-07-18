import { prisma } from "../../lib/prisma";
import { ICreateServicesPayload } from "./service.interface";

const createPost = async (payload: ICreateServicesPayload, userId: string) => {
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

export const techniciansService = { createPost };
