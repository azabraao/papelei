import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(500).json({ message: "wrong method" });

  const { name, email, picture, googleId, facebookId } = await req.body;

  try {
    if (!googleId && !facebookId) throw new Error("No social account");

    let user = {} as User;

    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user?.facebookId && facebookId) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          facebookId,
        },
      });
    }

    if (!user?.googleId && googleId) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          googleId,
        },
      });
    }

    if (!user?.id) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          picture,
          googleId,
          facebookId,
        },
      });
    }

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
