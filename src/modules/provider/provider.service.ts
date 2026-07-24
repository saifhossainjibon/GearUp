import { prisma } from "../../lib/prisma";
import { IAddGearPayload, IUpdateGearPayload, IUpdateRentalStatusPayload } from "./provider.interface";

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

const getProviderOrders = async (providerId: string) => {
  const result = await prisma.rentalOrder.findMany({
    where: {
      rentalItems: {
        some: {
          gearItem: {
            providerId,
          },
        },
      },
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      rentalItems: {
        where: {
          gearItem: {
            providerId,
          },
        },
        include: {
          gearItem: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const updateRentalStatus = async ( rentalOrderId: string, providerId: string, payload: IUpdateRentalStatusPayload) => {
  const {status} = payload
  const rentalOrder = await prisma.rentalOrder.findFirstOrThrow({
    where: {
      id: rentalOrderId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  const isOwner = rentalOrder.rentalItems.some(
    (item) => item.gearItem.providerId === providerId,
  );

  if (!isOwner) {
    throw new Error(
      "You are not authorized to update this rental order!",
    );
  }

  const result = await prisma.rentalOrder.update({
    where: {
      id: rentalOrderId,
    },
    data: {
      status
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  return result;
};


export const providerService = {
  addGearToDB, updateGear, deleteGear, getProviderOrders, updateRentalStatus 
};
