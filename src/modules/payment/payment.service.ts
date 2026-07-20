import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import config from "../../config";

const createCheckoutSession = async (bookingId: string) => {
  // Find booking with service information
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
    },
  });

  if (!booking) {
    throw new Error("Booking is not accepted yet");
  }

  // Technician must accept first
  //   if (booking.status !== "ACCEPT") {
  //     throw new Error("Booking is not accepted yet");
  //   }

  // Prevent duplicate payment
  if (booking.paymentStatus === "PAID") {
    throw new Error("Booking already paid");
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "bdt",

          product_data: {
            name: booking.service.title,
            description: booking.service.description,
          },

          unit_amount: Math.round(booking.service.price * 100),
        },

        quantity: 1,
      },
    ],

    success_url: `${config.app_url}/payment-success`,
    cancel_url: `${config.app_url}/payment-cancel`,

    metadata: {
      bookingId: booking.id,
      customerId: booking.customerId,
    },
  });

  // Save payment as pending
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      customerId: booking.customerId,
      amount: booking.service.price,
      status: "PENDING",
      sessionId: session.id,
    },
  });

  return {
    checkoutUrl: session.url,
  };
};

const getMyPayments = async (userId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      customerId: userId,
    },
    // include: {
    //   booking: true,
    // },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const getPaymentById = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findFirstOrThrow({
    where: {
      id: paymentId,
      customerId: userId,
    },
    include: {
      booking: {
        include: {
          service: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return payment;
};

export const paymentService = {
  createCheckoutSession,
  getMyPayments,
  getPaymentById,
};
