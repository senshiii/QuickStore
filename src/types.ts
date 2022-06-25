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