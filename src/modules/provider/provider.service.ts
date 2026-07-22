import { prisma } from "../../lib/prisma";
import { IAddGearPayload, IUpdateGearPayload } from "./provider.interface";

const addGearToDB = async (payload: IAddGearPayload, providerId: string) => {

  const result = await prisma.gearItem.create({
    data: {
      ...payload, providerId
    },
  });
  return result;
};


const updateGear = async (
  gearId: string,
  payload: IUpdateGearPayload,
  providerId: string,
  isAdmin: boolean
) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });
  if (!isAdmin && gear.providerId !== providerId) {
    throw new Error("You are not the owner of this gear!");
  }

  const result = await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: payload,
    include: {
      provider: {
        omit: {
          password: true,
        },
      }
    },
  });

  return result;
};

const deleteGear = async (
  gearId: string,
  providerId: string,
  isAdmin: boolean,
) => {
  const gear = await prisma.gearItem.findFirstOrThrow({
    where: {
      id: gearId
    },
  });
  if (!isAdmin && gear.providerId !== providerId) {
    throw new Error("You are not the owner of this post!");
  }
  await prisma.gearItem.delete({
    where: {
      id: gearId
    },
  });
};

export const providerService = {
  addGearToDB, updateGear, deleteGear
};
