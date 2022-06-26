import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase-config";
import { UploadFileVariables } from "../types";

export async function uploadFile({ file, path }: UploadFileVariables) {
  const fileRef = ref(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  console.log("File Upload Snapshot", snapshot);
}
