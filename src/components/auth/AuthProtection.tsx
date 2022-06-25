import { FC, ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface AuthProtectionProps{
  children: ReactElement;
  href: string;
}

const AuthProtection: FC<AuthProtectionProps> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return !isAuth ? <Navigate to="/signin" state={{  }} /> : children;
};

export default AuthProtection;
