import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICategoryPayload, IUpdateUserStatusPayload } from "./admin.interface";

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
const updateUserStatus = async (
  userId: string,
  payload: IUpdateUserStatusPayload,
) => {
  const { status } = payload;
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
      status,
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
const addCategoryToDB = async (payload: ICategoryPayload) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });
  if (isCategoryExist) {
    throw new Error("Already This category is exist");
  }
  const result = await prisma.category.create({
    data: {
      ...payload,
    },
  });

  return result;
};
const getAllCategoryFromDB = async () => {
  const category = await prisma.category.findMany();
  return category;
};
const updateCategoryToDB = async (
  categoryId: string,
  payload: ICategoryPayload,
) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("There have no category with this ID");
  }

  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: payload,
  });

  return result;
};
const deleteCategoryFromDB = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new Error("There have no category with this ID");
  }
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentalOrders,
  addCategoryToDB,
  getAllCategoryFromDB,
  updateCategoryToDB,
  deleteCategoryFromDB,
};
