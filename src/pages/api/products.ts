import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listProducts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(500).json({ message: "wrong method" });

  const { businessID, skip } = await req.body;

  try {
    const product = await prisma.product.findMany({
      skip,
      take: 3,
      where: {
        businessID,
      },
    });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(listProducts, sessionOptions);
