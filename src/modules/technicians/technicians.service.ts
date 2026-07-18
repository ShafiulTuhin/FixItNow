import { prisma } from "../../lib/prisma";

const getAllTechnicians = async () => {
  //   const result = await prisma.technicianProfile.findMany({
  //     include: {
  //       user: {
  //         omit: {
  //           password: true,
  //         },
  //       },
  //       services: {
  //         include: {
  //           category: true,
  //           reviews: {
  //             include: {
  //               user: {
  //                 omit: {
  //                   password: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   const result = await prisma.technicianProfile.findMany();
  const result = await prisma.technicianProfile.findMany({
    include: {
      services: {
        include: {
          reviews: true,
          category: true,
        },
      },
    },
  });
  return result;
};

export const technicianService = { getAllTechnicians };
