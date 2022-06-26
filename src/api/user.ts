import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import {
  CreateNewFileVariables,
  NewFolderVariables,
  UploadFileVariables,
  UserBody,
} from "../types";
import { id } from "../utils";
import { uploadFile } from "./storage";
import { executeQuery } from "./util";

export async function createUser(body: UserBody) {
  try {
    const docRef = doc(db, "user", body.id);
    const userSnap = await setDoc(
      docRef,
      {
        ...body,
        profilePhoto: body.profilePhoto,
        totalSpaceUsed: 0,
        maxSpaceAvailable: 500000000,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    const getSnap = await getDoc(docRef);
    return getSnap.data();
  } catch (err: any) {
    throw err;
  }
}

export async function fetchUserProfile(uid: string) {
  try {
    const userRef = doc(db, "user", uid);
    const userData = (await getDoc(userRef)).data();
    return userData;
  } catch (error: any) {
    console.log("Error fetching user profile", error);
    throw error;
  }
}

export async function fetchFilesAndFolders(uid: string) {
  try {
    const folderRef = collection(db, "folder");
    const q = query(folderRef, where("uid", "==", uid));
    const folders = await executeQuery(q);

    const fileRef = collection(db, "file");
    const fileQuery = query(
      fileRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const files = await executeQuery(fileQuery);
    return { folders, files };
  } catch (error: any) {
    console.log("Error fetching files and folders", error.message);
    throw error;
  }
}

export async function createNewFolder({ uid, folderName }: NewFolderVariables) {
  try {
    console.log("Variables", { uid, folderName });
    const folderId = id();
    const folderData = {
      id: folderId,
      name: folderName,
      uid,
      createdAt: serverTimestamp(),
    };
    const docRef = doc(db, "folder", folderId);
    await setDoc(docRef, folderData);

    return (await getDoc(docRef)).data();
  } catch (error: any) {
    console.log("Error creating new folder", error.message);
  }
}

export async function createNewFile({ file, uid }: CreateNewFileVariables) {
  try {
    console.log("File", file);
    await uploadFile({file, path: `/${uid}/${file.name}`})
  } catch (error: any) {
    console.log("Error uploading file", error);
    throw error;
  }
}
