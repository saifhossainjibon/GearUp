import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, phone, password, role } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist) {
    throw new Error("user with this email already exist");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role
    },
  });
  // aita korar fole amra user er data find korci jaita respose pabo
  const user = await prisma.user.findUnique({
    where: { 
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    }
  });
  return user;
};

export const userService = {
  registerUserIntoDB
};
