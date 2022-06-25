import { auth, db } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "./user";
import { SignUpBody } from "../types";

export async function createUserAccount({
  email,
  password,
  firstName,
  lastName,
}: SignUpBody) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const createdUser = userCredentials.user;

    await createUser({
      id: createdUser.uid,
      firstName,
      lastName,
      email,
      profilePhoto: createdUser.photoURL ?? "",
    });

    return { success: true, id: createdUser.uid };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
