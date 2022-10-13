import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({
    id: "",
    name: "",
    email: "",
    picture: "",
    googleId: "",
    facebookId: "",
  });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
