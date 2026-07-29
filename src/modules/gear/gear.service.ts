import { GearItemWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IGearQuery } from "./gear.interface";

const getGearDetails = async (geadId: string) => {
  const gear = await prisma.gearItem.findUnique({
    where: { id: geadId },
  });
  if (!gear) {
    throw new Error("There have no gear with this ID");
  }
  return gear;
};

const getAllGears = async (query: IGearQuery) => {
  const andConditions: GearItemWhereInput[] = [];
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }
  if (query.brand) {
    andConditions.push({
      brand: query.brand,
    });
  }
  if (query.pricePerDay) {
    andConditions.push({
      pricePerDay: Number(query.pricePerDay),
    });
  }

  const gears = await prisma.gearItem.findMany({
    where: {
      AND: andConditions,
    },
    include: {
      provider: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  return gears;
};

export const gearService = {
  getAllGears,
  getGearDetails,
};