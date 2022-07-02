import {
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import {
  AppFile,
  CreateNewFileVariables,
  Folder,
  NewFolderVariables,
  Profile,
  RenameFolderVariables,
  UserBody,
} from "../types";
import { bytesToMegaBytes, generateId } from "../utils";
import { getFileUrl, uploadFile } from "./storage";
import { create, executeQuery, read, update } from "./db-service";

export async function createUser(body: UserBody) {
  try {
    return await create("user", body.id, {
      ...body,
      profilePhoto: body.profilePhoto,
      totalSpaceUsed: 0,
      maxSpaceAvailable: 500000000,
      createdAt: serverTimestamp(),
    });
  } catch (err: any) {
    throw err;
  }
}

export async function fetchUserProfile(uid: string) {
  try {
    return read("user", uid);
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

export async function createNewFolder({
  uid,
  folderName,
  parentFolder,
}: NewFolderVariables) {
  try {
    const folderId = generateId();
    const folderData: Folder = {
      id: folderId,
      name: folderName,
      uid,
      parentFolder,
      starred: false,
      createdAt: serverTimestamp(),
    };

    const createdFolder = await create("folder", folderId, folderData);

    return createdFolder;
  } catch (error: any) {
    console.log("Error creating new folder", error.message);
  }
}

export async function createNewFile({
  file,
  uid,
  folderId,
}: CreateNewFileVariables) {
  try {
    const path = `/${uid}/${file.name}`;

    // CHECK FOR STORAGE AVAILABILITY

    const user = (await read("collection", uid)) as Profile;

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
    const fileType = file.name.substring(file.name.trim().lastIndexOf(".") + 1);
    const fileData: AppFile = {
      id: generateId(),
      fileType,
      fileName: filename,
      sizeInBytes: file.size,
      folderId,
      src: url,
      uid,
      starred: false,
      createdAt: serverTimestamp(),
    };
    const createdFile = await create("file", fileData.id, fileData);

    // UPDATE USER STORAGE INFORMATION
    await update("user", uid, { totalSpaceUsed: increment(file.size) });

    return createdFile;
  } catch (error: any) {
    console.log("Error uploading file", error);
    throw error;
  }
}

export async function renamedFolder({ folderId, name }: RenameFolderVariables) {
  try {
    return await update("folder", folderId, { name });
  } catch (error: any) {
    console.log("Error fetching folder tree", error);
  }
}
