import { FC, ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UnAuthProtection: FC<{ children: ReactElement }> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Navigate to="/" /> : children;
};

export default UnAuthProtection;
