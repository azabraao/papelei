import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUsers() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here

  return await prisma.user.findMany();
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<User[]>
) => {
  if (request.method === "GET") {
    try {
      const result = await getAllUsers();

      await prisma.$disconnect();

      response.json(result);
    } catch (err) {
      console.error(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  }
};
