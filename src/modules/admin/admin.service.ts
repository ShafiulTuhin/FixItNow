import { UserStatus } from "../../../generated/prisma/enums";
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

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUser = async (status: UserStatus, userId: string) => {
  // console.log(userId);
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });
  return result;
};

export const adminService = {
  createCategory,
  getAllCategory,
  getAllUser,
  updateUser,
};
