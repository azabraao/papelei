import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listProducts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(500).json({ message: "wrong method" });

  const { businessID, skip, take } = req.query;

  const isAllowed = req.session?.user?.business?.some(
    (business) => businessID === business.id
  );

  if (!isAllowed) return res.status(401).json({ message: "not allowed" });

  if (!businessID || !skip || !take) {
    return res.status(401).json({ message: "wrong params" });
  }

  try {
    const product = await prisma.product.findMany({
      skip: Number(skip),
      take: Number(take),
      where: {
        businessID: String(businessID),
      },
    });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(listProducts, sessionOptions);
