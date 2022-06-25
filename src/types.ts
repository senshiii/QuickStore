export interface User{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
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