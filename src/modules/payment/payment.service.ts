import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { ICreatePaymentPayload } from "./payment.interface";
import { handleCheckoutCompleted, handleCheckoutExpired } from "./payment.utils";

const createPayment = async (
  customerId: string,
  payload: ICreatePaymentPayload,
) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rentalOrder = await tx.rentalOrder.findUnique({
      where: {
        id: payload.rentalOrderId,
        customerId,
      }
    });
    if (!rentalOrder) {
      throw new Error("Rental order can not find");
    }
    if (rentalOrder.status !== "PLACED") {
      throw new Error("This rental order cannot be paid.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: `Rental Order #${rentalOrder.id}`,
            },
            unit_amount: rentalOrder.totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${config.app_url}/payment/success`,
      cancel_url: `${config.app_url}/payment/cancel`,
      metadata: {
        rentalOrderId: rentalOrder.id,
        customerId,
      },
    });

    return session.url;
  });
  return {
    paymentUrl: transactionResult,
  };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret,
  );
  // console.log(event.type);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object);
      break;
    case "checkout.session.expired":
      await handleCheckoutExpired(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }
};

const getPaymentHistory = async (customerId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      rentalOrder: {
        customerId,
      },
    },
    include: {
      rentalOrder: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getPaymentById = async (paymentId: string, customerId: string) => {
  const result = await prisma.payment.findFirstOrThrow({
    where: {
      id: paymentId,
      rentalOrder: {
        customerId,
      },
    },
    include: {
      rentalOrder: {
        include: {
          rentalItems: {
            include: {
              gearItem: true,
            },
          },
        },
      },
    },
  });

  return result;
};

export const paymentService = {
  createPayment,
  handleWebhook,
  getPaymentHistory,
  getPaymentById,
};
