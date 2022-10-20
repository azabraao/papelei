import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addProduct(req: NextApiRequest, res: NextApiResponse) {
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

async function productRoute(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      addProduct(req, res);
      break;
    case "PUT":
      updateProduct(req, res);
      break;
    case "DELETE":
      deleteProduct(req, res);
      break;
    default:
      res.status(500).json({ message: "wrong method" });
  }
}

export default withIronSessionApiRoute(productRoute, sessionOptions);
