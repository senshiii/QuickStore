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
}

export interface Folder{
  id: string;
  uid: string;
  name: string;
  createdAt: Date;
}

export interface AppFile{
  id: string;
  src: string;
  sizeInBytes: number;
  fileName: string; 
  createdAt: FieldValue;
  uid?: string;
  bucketId?: string;
}

export interface UploadFileVariables{
  file: File;
  path: string;
}

export interface CreateNewFileVariables{
  file: File;
  uid: string;
}

