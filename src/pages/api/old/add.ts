import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    await prisma.user.create({
      data: {
        name: "Rich",
        email: "hello@prisma.com",
      },
    });

    return response.json({});
  }
};
