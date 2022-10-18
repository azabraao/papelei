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

    const shouldUpdateUserFacebookId =
      !!user && !user?.facebookId && facebookId;
    const shouldUpdateUserGoogleId = !!user && !user?.googleId && googleId;
    const shouldCreateUser = !user?.id;

    console.log(
      "{shouldUpdateUserFacebookId, shouldUpdateUserGoogleId, shouldCreateUser}>>>",
      { shouldUpdateUserFacebookId, shouldUpdateUserGoogleId, shouldCreateUser }
    );

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
      });
    }

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log("error.message>>>", error.message);

    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
