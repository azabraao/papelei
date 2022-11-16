import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function periodicDelete(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Invalid" });

  const twoDaysAgo = new Date();

  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const day = twoDaysAgo.getDate();
  const month = twoDaysAgo.getMonth() + 1;
  const year = twoDaysAgo.getFullYear();

  const productsToDelete = await prisma.product.findMany({
    where: {
      deleteRequested: true,
      updatedAt: {
        lte: new Date(`${year}-${month}-${day}`),
      },
    },
  });

  if (productsToDelete.length === 0) {
    return res.status(200).json({ message: "No products to delete" });
  }

  await Promise.all(
    productsToDelete.map(async (product) => {
      await prisma.product.delete({
        where: {
          id: product.id,
        },
      });
    })
  );

  return res.json(productsToDelete);
}

export default periodicDelete;
