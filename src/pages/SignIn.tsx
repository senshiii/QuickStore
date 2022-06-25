import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import SignInForm from "../components/auth/SignInForm";
import Navbar from "../components/ui/Navbar";
import { FcGoogle } from "react-icons/fc";
import {
  createUserAccountUsingGoogle,
  signInUser,
  signInUserUsingGoogle,
} from "../api/auth";
import { ChangeEventHandler, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "react-query";
import { SignInFormErrors } from "../types";

const SignIn = () => {
  const nav = useNavigate();
  const { setIsAuth, setUid } = useContext(AuthContext);

  const signinWithEmailAndPasswordMutate = useMutation(signInUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      nav("/");
      setIsAuth(true);
      setUid(data.id);
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  const signInWithGoogleMutate = useMutation(signInUserUsingGoogle, {
    onMutate: () => {
      setIsGoogleLoading(true);
    },
    onSuccess: (data) => {
      setIsGoogleLoading(false);
      setIsAuth(true);
      setUid(data?.id!);
    },
    onError: (error) => {
      console.log("Error Signing in With Google", error);
      setIsGoogleLoading(false);
    },
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const [erorrs, setErorrs] = useState<SignInFormErrors>({
    email: "",
    password: "",
  });

  const validate = useCallback(() => {
    let hasErrors = false;

    if (!email) {
      setErorrs((erorrs) => ({ ...erorrs, email: "Email is required" }));
      hasErrors = true;
    }

    if (!password) {
      setErorrs((erorrs) => ({ ...erorrs, password: "Password is required" }));
      hasErrors = true;
    }

    return hasErrors;
  }, [email, password]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    signinWithEmailAndPasswordMutate.mutate({ email, password });
  }, [email, password, signinWithEmailAndPasswordMutate, validate]);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setErorrs({ ...erorrs, email: null });
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setErorrs({ ...erorrs, password: null });
  };
  return (
    <>
      <Navbar />
      <Flex justify="center" align="start" py={12}>
        <Box boxShadow="0 0 10px -4px" p={6} rounded="lg" w="40%">
          <Heading as="h4" fontSize="2xl">
            Sign In To Your Account
          </Heading>
          <SignInForm
            email={email}
            onChangeEmail={handleEmailChange}
            password={password}
            onChangePassword={handlePasswordChange}
            erorrs={erorrs}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <Divider my={3} />
          <Button
            onClick={() => signInWithGoogleMutate.mutate()}
            variant="outline"
            colorScheme="red"
            rightIcon={<FcGoogle />}
            isLoading={isGoogleLoading}
          >
            Sign In With Google
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default SignIn;
