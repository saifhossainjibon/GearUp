import { ICreateReviewPayload } from "./review.interface";
import { prisma } from "../../lib/prisma";
import { RentalStatus } from "../../../generated/prisma/enums";


const createReview = async (customerId: string, payload: ICreateReviewPayload) => {
  const rentalOrder = await prisma.rentalOrder.findFirstOrThrow({
    where: {
      id: payload.rentalOrderId,
      customerId,
    },
    include: {
      rentalItems: true,
    },
  });

  if (rentalOrder.status !== RentalStatus.RETURNED) {
    throw new Error(
      "You can review only after returning the rental.",
    );
  }

  const rentedGear = rentalOrder.rentalItems.find(
    (item) => item.gearItemId === payload.gearItemId,
  );

  if (!rentedGear) {
    throw new Error(
      "This gear does not belong to this rental order.",
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      rentalOrderId: payload.rentalOrderId,
      gearItemId: payload.gearItemId,
    },
  });

  if (existingReview) {
    throw new Error(
      "You have already reviewed this gear.",
    );
  }

  const result = await prisma.review.create({
    data: {
      rentalOrderId: payload.rentalOrderId,
      gearItemId: payload.gearItemId,
      customerId,
      rating: payload.rating,
      comment: payload.comment,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      }
    },
  });

  return result;
};

export const reviewService = {
  createReview,
};