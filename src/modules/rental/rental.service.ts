import { ICreateRentalPayload } from "./rental.interface";
import { prisma } from "../../lib/prisma";

const createRental = async (
  customerId: string,
  payload: ICreateRentalPayload,
) => {
  const { startDate, endDate, items } = payload;

  if (!items.length) {
    throw new Error("Please select at least one gear.");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    throw new Error("End date must be after start date.");
  }

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const transactionResult = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    const rentalItems = [];

    for (const item of items) {
      const gear = await tx.gearItem.findUniqueOrThrow({
        where: {
          id: item.gearItemId,
        },
      });

      if (!gear.isAvailable) {
        throw new Error(`${gear.name} is currently unavailable.`);
      }

      if (gear.availableStock < item.quantity) {
        throw new Error(`Only ${gear.availableStock} ${gear.name} available.`);
      }
      const remainingStock = gear.availableStock - item.quantity;
      totalAmount += gear.pricePerDay * item.quantity * totalDays;

      rentalItems.push({
        gearItemId: gear.id,
        quantity: item.quantity,
        pricePerDay: gear.pricePerDay,
      });

      await tx.gearItem.update({
        where: {
          id: gear.id,
        },
        data: {
          availableStock: remainingStock,
          isAvailable: remainingStock > 0,
        },
      });
    }

    const rentalOrder = await tx.rentalOrder.create({
      data: {
        customerId,
        startDate: start,
        endDate: end,
        totalAmount,
        totalDays: totalDays.toString(),
      },
    });

    await tx.rentalItem.createMany({
      data: rentalItems.map((item) => ({
        rentalOrderId: rentalOrder.id,
        ...item,
      })),
    });

    const result = await tx.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalOrder.id,
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
  });

  return transactionResult;
};

const getMyRentalOrders = async (customerId: string) => {

  const result = await prisma.rentalOrder.findMany({
    where: {
      customerId,
    },
    include: {
      rentalItems: {
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

export const rentalService = {
  createRental,
  getMyRentalOrders,
};
