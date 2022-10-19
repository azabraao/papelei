import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({
    id: null,
    name: null,
    email: null,
    picture: null,
    googleId: null,
    facebookId: null,
    business: [],
  });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
