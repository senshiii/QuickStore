import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import { createContext, FC, ReactElement, useEffect, useState } from "react";
import { auth } from "../config/firebase-config";

interface AuthContextProps {
  isAuth: boolean;
  uid: string;
  setIsAuth: (isAuth: boolean) => void;
  setUid: (uid: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  uid: "",
  setIsAuth: (isAuth) => {},
  setUid: (uid) => {},
});

const AuthContextProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setUid(user.uid);
      }
      setIsPending(false);
    });
  }, []);

  if (isPending) {
    return (
      <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
        <CircularProgress isIndeterminate />
        <Text mt={4}>Trying to Sign in...</Text>
      </Flex>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        uid,
        setIsAuth,
        setUid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
