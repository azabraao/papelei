import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";

import { fauna } from "services/fauna";

export const queryAllProducts = async () => {
  return fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("products"))),
      q.Lambda((x) => q.Get(x))
    )
  );
};

export default async (_request: NextApiRequest, response: NextApiResponse) => {
  const products = await queryAllProducts();
  return response.json(products);
};
