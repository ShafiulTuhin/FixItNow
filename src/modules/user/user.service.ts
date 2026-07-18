import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUser } from "./user.interface";

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
    },
  });

  const profile = await prisma.technicianProfile.create({
    data: {
      userId: createUser.id,
      profileImage,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });
  return user;
};

export const userService = {
  registerUserIntoDB,
};
