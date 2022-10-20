import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addProduct(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(500).json({ message: "wrong method" });

  const { image, name, description, price, businessID } = await req.body;

  try {
    const product = await prisma.product.create({
      data: {
        image,
        name,
        description,
        price,
        business: {
          connect: {
            id: businessID,
          },
        },
      },
    });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(addProduct, sessionOptions);
