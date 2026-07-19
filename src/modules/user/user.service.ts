import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUser } from "./user.interface";
import { UserRole } from "../../../generated/prisma/enums";

const registerUserIntoDB = async (payload: RegisterUser) => {
  const { name, email, password, profileImage } = payload;

  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    throw new Error("Email already exist");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: payload.role,
    },
  });
  await prisma.profile.create({
    data: {
      userId: createUser.id,
    },
  });

  if (payload.role === UserRole.TECHNICIAN) {
    await prisma.technicianProfile.create({
      data: {
        userId: createUser.id,
        profileImage,
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include:
      createUser.role === UserRole.TECHNICIAN
        ? {
            technicianProfile: true,
          }
        : { profile: true },
  });

  return user;
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
      profile: true,
    },
  });
  if (user.role !== UserRole.TECHNICIAN) {
    const { technicianProfile, ...rest } = user;
    return rest;
  }

  return user;
};

export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
};
