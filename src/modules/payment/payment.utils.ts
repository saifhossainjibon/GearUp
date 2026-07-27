import Stripe from "stripe";
import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const rentalOrderId = session.metadata?.rentalOrderId;
  const stripeSessionId = session.id;
  const stripePaymentIntentId = session.payment_intent as string;

  if (!rentalOrderId) {
    console.log("Webhook: Missing rentalOrderId");
    return;
  }
  await prisma.payment.upsert({
    where: {
      rentalOrderId,
    },
    create: {
      rentalOrderId,
      amount: (session.amount_total ?? 0) / 100,
      stripeSessionId,
      status: PaymentStatus.COMPLETED,
      stripePaymentIntentId,
      paidAt: new Date()
    },
    update: {
      stripeSessionId,
      status: PaymentStatus.COMPLETED,
    },
  });

  await prisma.rentalOrder.update({
    where: {
      id: rentalOrderId,
    },
    data: {
      status: RentalStatus.PAID,
    },
  });
};
export const handleCheckoutExpired = async (
  session: Stripe.Checkout.Session,
) => {
  const rentalOrderId = session.metadata?.rentalOrderId;
  const stripeSessionId = session.id;
  const stripePaymentIntentId = session.payment_intent as string;
  if (!rentalOrderId) {
    console.log("Webhook: Missing rentalOrderId");
    return;
  }

  await prisma.payment.upsert({
    where: {
      rentalOrderId,
    },
    create: {
      rentalOrderId,
      amount: (session.amount_total ?? 0) / 100,
      stripeSessionId,
      status: PaymentStatus.FAILED,
      stripePaymentIntentId,
      paidAt: new Date()
    },
    update: {
      stripeSessionId,
      status: PaymentStatus.FAILED,
    },
  });

  await prisma.rentalOrder.update({
    where: {
      id: rentalOrderId,
    },
    data: {
      status: RentalStatus.CANCELLED,
    },
  });
};
