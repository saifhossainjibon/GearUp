import { prisma } from "../../lib/prisma";

const getAllGears = async () => {
  const gears = await prisma.gearItem.findMany();
  return gears
};
const getGearDetails = async (geadId: string) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where:{id:geadId}
  });
  return gear
};

export const gearService={
    getAllGears, getGearDetails
}

























// {
//     include: {
//       provider: {
//         omit: {
//           password: true,
//         },
//       }
//     }
//   }