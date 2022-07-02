import {
  Query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export async function executeQuery(q: Query) {
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docs;
}

export async function create(
  collection: string,
  path: string,
  data: { [x: string]: any }
) {
  try {
    const ref = doc(db, collection, path);
    await setDoc(ref, data, { merge: true });
    const createdDoc = await read(collection, path);
    return createdDoc;
  } catch (err) {
    throw new Error("Error creating documet");
  }
}

export async function read(collection: string, path: string) {
  const ref = doc(db, collection, path);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) throw new Error("No data found");
  return docSnap.data();
}

export async function update(
  collection: string,
  path: string,
  data: { [x: string]: any }
) {
  try {
    const ref = doc(db, collection, path);
    await updateDoc(ref, data);

    const updatedDoc = read(collection, path);
    return updatedDoc;
  } catch (err) {
    throw new Error("Error updating document");
  }
}
