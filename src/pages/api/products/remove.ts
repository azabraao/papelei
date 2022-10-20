import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE")
    return res.status(500).json({ message: "wrong method" });

  const { productID } = await req.body;

  try {
    const product = await prisma.product.delete({
      where: {
        id: productID,
      },
    });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(deleteProduct, sessionOptions);
