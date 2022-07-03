import { FieldValue } from "firebase/firestore";

export interface Profile{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  maxSpaceAvailable: number;
  totalSpaceUsed: number;
  createdAt: { seconds: number; nanoseconds: number }
}

export interface UserBody {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

export interface SignUpBody{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpFormErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface SignInFormErrors {
  email: string | null;
  password: string | null;
}

export interface SignInUserVariables{
  email: string;
  password: string;
}

export interface NewFolderVariables{
  uid: string;
  folderName: string;
  parentFolder: string;
}

export interface Folder{
  id: string;
  uid: string;
  parentFolder: string;
  name: string;
  createdAt: FirebaseTimestamp | FieldValue;
  starred: boolean
}

export interface AppFile{
  id: string;
  src: string;
  fileType: string;
  sizeInBytes: number;
  fileName: string; 
  uid?: string;
  parentFolder?: string;
  starred?: boolean;
  createdAt: FirebaseTimestamp | FieldValue
}

export interface UploadFileVariables{
  file: File;
  path: string;
}

export interface CreateNewFileVariables{
  file: File;
  folderId: string;
  uid: string;
}

export interface FirebaseTimestamp{
  seconds: number;
  nanoseconds: number;
}

export interface RenameFolderVariables{
  folderId: string;
  name: string;
}