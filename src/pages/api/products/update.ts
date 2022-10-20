import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT")
    return res.status(500).json({ message: "wrong method" });

  const { image, name, price, productID } = await req.body;

  try {
    const product = await prisma.product.update({
      where: {
        id: productID,
      },
      data: {
        image,
        name,
        price,
      },
    });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(updateProduct, sessionOptions);
