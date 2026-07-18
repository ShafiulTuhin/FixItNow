import { prisma } from "../../lib/prisma";

// const updateTechnicianProfile = async (userId: string, payload: any) => {
//   const { name, experience, bio } = payload;
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       name,

//       technicianProfile: {
//         update: {
//           experience,
//           bio,
//         },
//       },
//     },
//     omit: {
//       password: true,
//     },
//     include: {
//       technicianProfile: true,
//     },
//   });
//   return updatedUser;
// };
const updateTechnicianProfile = async (userId: string, payload: any) => {
  const { name, phoneNumber, experience, bio } = payload;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      phoneNumber,
      technicianProfile: {
        upsert: {
          update: {
            experience,
            bio,
          },
          create: {
            experience,
            bio,
          },
        },
      },
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  return updatedUser;
};
export const technicianService = { updateTechnicianProfile };
