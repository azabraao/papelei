import { PrismaClient } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import algoliasearch from "algoliasearch";

import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const firebaseConfig = {
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

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const algolia = client.initIndex("products");

const products = [];

products.forEach((product) => {
  algolia
    .partialUpdateObject({
      objectID: product.code,
      price: product.price,
    })
    .then(console.log)
    .catch(console.error);
});

const prisma = new PrismaClient();

const handleUploadImage = async (image: string, businessID: string) => {
  // TODO: use uuuid instead?
  const uniqueIdentifier = new Date().getTime() + Math.random();
  const storageRef = ref(storage, businessID + uniqueIdentifier);

  const snapshot = await uploadString(storageRef, image, "data_url");
  const downloadURL = getDownloadURL(snapshot.ref);

  return downloadURL;
};

async function addProduct(req: NextApiRequest, res: NextApiResponse) {
  const { image, name, description, price, businessID } = await req.body;

  try {
    let imageURL;

    if (image) {
      imageURL = await handleUploadImage(image, businessID);
    }

    try {
      const product = await prisma.product.create({
        data: {
          image: imageURL,
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

      await prisma.user.update({
        where: {
          id: req.session.user.id,
        },
        data: {
          onBoarded: true,
        },
      });

      algolia.saveObject({
        code: product.id,
        objectID: product.id,
        visible_by: [businessID],
        image: imageURL,
        name,
        description,
        price,
      });

      req.session.user.onBoarded = true;
      await req.session.save();

      return res.json({ product });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  } finally {
    prisma.$disconnect();
    res.status(200);
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT")
    return res.status(500).json({ message: "wrong method" });

  const { image, name, price, productID, businessID } = await req.body;

  try {
    let imageURL;

    if (image) {
      imageURL = await handleUploadImage(image, businessID);
    }

    const product = await prisma.product.update({
      where: {
        id: productID,
      },
      data: {
        image: imageURL,
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
    const product = await prisma.product.update({
      where: {
        id: productID,
      },
      data: {
        deleteRequested: true,
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
