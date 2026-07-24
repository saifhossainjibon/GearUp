import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IUpdateUserStatusPayload } from "./admin.interface";


const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


const updateUserStatus = async (userId: string, payload: IUpdateUserStatusPayload) => {
  const {status} =payload
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  if (user.role === Role.ADMIN) {
    throw new Error("Admin status cannot be updated.");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status
    },
    omit: {
      password: true,
    },
  });

  return result;
};


const getAllGear = async () => {
  const result = await prisma.gearItem.findMany({
    include: {
      provider: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getAllRentalOrders = async () => {
  const result = await prisma.rentalOrder.findMany({
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      rentalItems: {
        include: {
          gearItem: {
            include: {
              provider: {
                omit: {
                  password: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};
export const adminService = {getAllUsers, updateUserStatus, getAllGear, getAllRentalOrders}