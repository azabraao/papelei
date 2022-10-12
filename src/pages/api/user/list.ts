import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUsers() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here

  return await prisma.user.findMany();
}

export default async (_request: NextApiRequest, response: NextApiResponse) => {
  let result = {};

  try {
    result = await getAllUsers();

    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }

  return response.json(result);
};
