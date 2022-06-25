import { auth } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createUser } from "./user";
import { SignInUserVariables, SignUpBody } from "../types";

const googleAuthProvider = new GoogleAuthProvider();

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
    const authUser = userCredentials.user;
    console.log("Authenticated User", authUser);

    if (!authUser.emailVerified) {
      await sendEmailVerification(userCredentials.user);
      console.log("Email Sent");
    }

    await createUser({
      id: authUser.uid,
      firstName,
      lastName,
      email,
      profilePhoto: authUser.photoURL ?? "",
    });

    return { success: true, id: authUser.uid };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createUserAccountUsingGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const authUser = result.user;
    await createUser({
      email: authUser.email!,
      firstName: authUser.displayName?.trim().split(" ")[0]!,
      lastName: authUser.displayName?.trim().split(" ")[0]!,
      id: authUser.uid,
      profilePhoto: authUser.photoURL!,
    });
    return { success: true, id: authUser.uid };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function signInUser({ email, password }: SignInUserVariables) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const authUser = userCredentials.user;
    return { success: true, id: authUser.uid };
  } catch (error: any) {
    console.log("Error Signing In", error);
    throw new Error(error.message);
  }
}

export async function signInUserUsingGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return { success: true, id: result.user.uid };
  } catch (error: any) {
    console.log("Error signing in with google", error);
    throw new Error(error.message)
  }
}
