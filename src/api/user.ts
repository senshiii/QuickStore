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
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import {
  AppFile,
  CreateNewFileVariables,
  NewFolderVariables,
  Profile,
  UploadFileVariables,
  UserBody,
} from "../types";
import { bytesToMegaBytes, generateId } from "../utils";
import { getFileUrl, uploadFile } from "./storage";
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
    const folderId = generateId();
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
    const path = `/${uid}/${file.name}`;

    // CHECK FOR STORAGE AVAILABILITY
    const userDocRef = doc(db, "user", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists) throw new Error(`User with id = ${uid} not found`);
    const user = userDocSnap.data() as Profile;

    // console.log("Total Space", bytesToMegaBytes(user.maxSpaceAvailable));
    // console.log("Space Used", bytesToMegaBytes(user.totalSpaceUsed));
    // console.log("File Size", bytesToMegaBytes(file.size));
    // console.log(
    //   "Space exceeded",
    //   user.totalSpaceUsed + file.size > user.maxSpaceAvailable
    // );

    if (user.totalSpaceUsed + file.size > user.maxSpaceAvailable)
      throw new Error("Cannot upload file. Space not available.");

    // UPLOAD FILE
    await uploadFile({ file, path });

    // GET URL OF UPLOADED FILE
    const url = await getFileUrl(path);

    // CREATE FILE DOCUMENT IN FIRESTORE
    const filename = file.name.substring(0, file.name.trim().lastIndexOf("."));
    const fileData: AppFile = {
      id: generateId(),
      fileName: filename,
      sizeInBytes: file.size,
      src: url,
      uid,
      createdAt: serverTimestamp(),
    };
    const fileDocRef = doc(db, "file", fileData.id);
    await setDoc(fileDocRef, fileData);

    // UPDATE USER STORAGE INFORMATION
    await updateDoc(userDocRef, { totalSpaceUsed: increment(file.size) });

    return fileData;
  } catch (error: any) {
    console.log("Error uploading file", error);
    throw error;
  }
}
