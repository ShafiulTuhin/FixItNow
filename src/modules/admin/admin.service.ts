import { prisma } from "../../lib/prisma";
import { ICreateCategoryPayload } from "./admin.interface";

const createCategory = async (payload: ICreateCategoryPayload) => {
  // const result = await prisma.category.create({
  //   data: {
  //     ...payload,
  //   },
  // });
  const result = await prisma.category.create({
    data: {
      name: payload.name,
    },
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const adminService = {
  createCategory,
  getAllCategory,
};
