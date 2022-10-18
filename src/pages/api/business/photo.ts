import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVpFpEMVxfd339rHYMtcPitKaYphR1HTg",
  authDomain: "pepelei.firebaseapp.com",
  projectId: "pepelei",
  storageBucket: "pepelei.appspot.com",
  messagingSenderId: "7888434998",
  appId: "1:7888434998:web:89e22defb602c3055ea597",
  measurementId: "G-6EYTGNE4HV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const { file, businessId } = await req.body;

  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors

      switch (error.code) {
        case "storage/unauthorized":
          res.status(500).json({ message: "No Permission" });

          break;
        case "storage/canceled":
          res.status(500).json({ message: "Upload canceled" });

          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          res.status(500).json({ message: (error as Error).message });
          break;

        default:
          res.status(500).json({ message: (error as Error).message });
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);

        try {
          await prisma.business.update({
            where: {
              id: businessId,
            },
            data: {
              picture: downloadURL,
            },
          });

          res.json({ downloadURL });
        } catch (error) {
          res.status(500).json({ message: (error as Error).message });
        }
      });
    }
  );
}

export default withIronSessionApiRoute(putBusinessPhoto, sessionOptions);
