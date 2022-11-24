import { PrismaClient } from "@prisma/client";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export const firebaseConfig = {
  apiKey: "AIzaSyAVpFpEMVxfd339rHYMtcPitKaYphR1HTg",
  authDomain: "pepelei.firebaseapp.com",
  projectId: "pepelei",
  storageBucket: "pepelei.appspot.com",
  messagingSenderId: "7888434998",
  appId: "1:7888434998:web:89e22defb602c3055ea597",
  measurementId: "G-6EYTGNE4HV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const prisma = new PrismaClient();

async function putBusinessPhoto(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(500).json({ message: "wrong method" });
  }

  const user = req.session.user;

  if (!user || !user.id) {
    res.status(401).end();
    return;
  }

  const { data_image, business_id } = JSON.parse(req.body);
  const storageRef = ref(storage, business_id);

  try {
    uploadString(storageRef, data_image, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        try {
          const response = await prisma.business.update({
            where: {
              id: business_id,
            },
            data: {
              picture: downloadURL,
            },
          });

          user.business[0] = response;
          req.session.user = user;
          await req.session.save();

          res.json({ business: response });
        } catch (error) {
          res.status(500).json({ message: (error as Error).message });
        }
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export default withIronSessionApiRoute(putBusinessPhoto, sessionOptions);
