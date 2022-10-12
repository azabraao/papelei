import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (_request: NextApiRequest, response: NextApiResponse) => {
  await prisma.user.create({
    data: {
      name: "Rich",
      email: "hello@prisma.com",
    },
  });

  return response.json({});
};
