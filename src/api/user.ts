import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { UserBody } from "../types";

export async function createUser(body: UserBody) {
  try {
    const docRef = doc(db, "user", body.id);
    const userSnap = await setDoc(
      docRef,
      {
        ...body,
        profilePhoto: "",
        createdAt: new Date(),
      },
      { merge: true }
    );

    const getSnap = await getDoc(docRef);
    return getSnap.data();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
