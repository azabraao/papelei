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

    const selectUser = {
      id: true,
      name: true,
      email: true,
      picture: true,
      googleId: true,
      facebookId: true,
      business: {
        select: {
          picture: true,
          id: true,
          name: true,
        },
      },
    };

    user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: selectUser,
    });

    const shouldUpdateUserFacebookId =
      !!user && !user?.facebookId && facebookId;
    const shouldUpdateUserGoogleId = !!user && !user?.googleId && googleId;
    const shouldCreateUser = !user?.id;

    if (shouldCreateUser) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          picture,
          googleId,
          facebookId,
          business: {
            create: [
              {
                name: `Negócio de ${name}`,
              },
            ],
          },
        },
        select: selectUser,
      });
    }

    if (shouldUpdateUserFacebookId) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          facebookId,
        },
        select: selectUser,
      });
    }

    if (shouldUpdateUserGoogleId) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          googleId,
        },
        select: selectUser,
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
