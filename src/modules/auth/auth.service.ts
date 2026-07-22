import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILogInUser, RegisterUserPayload } from "./auth.interface";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import { ActiveStatus } from "../../../generated/prisma/enums";

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

const logInUser = async (payload: ILogInUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email }
  });
  if (user.status === ActiveStatus.SUSPENDED) {
    throw new Error("Your account is Suspended, please contact at support");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect!!");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return { accessToken, refreshToken };
};

const getMyProfileFromDB = async(id: string)=>{
  const user = await prisma.user.findUniqueOrThrow({
    where:{id},
    omit:{password: true}
  })
  return user
}

export const authService = {
  registerUserIntoDB, logInUser, getMyProfileFromDB
};
