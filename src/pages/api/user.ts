import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({
      id: null,
      name: null,
      email: null,
      picture: null,
      googleId: null,
      facebookId: null,
      business: [],
      onBoarded: null,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
