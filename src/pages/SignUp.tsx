import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { ChangeEventHandler, useCallback, useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUserAccount, createUserAccountUsingGoogle } from "../api/auth";
import SignUpForm from "../components/auth/SignUpForm";
import Navbar from "../components/ui/Navbar";
import { AuthContext } from "../context/AuthContext";
import { SignUpFormErrors } from "../types";

const SignUp = () => {
  const nav = useNavigate();
  const { setIsAuth, setUid } = useContext(AuthContext);

  const mutation = useMutation(createUserAccount, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data, variables, context) => {
      setIsLoading(false);
      setIsAuth(true);
      setUid(data.id);
      nav("/");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const signUpWithGoogleMutate = useMutation(createUserAccountUsingGoogle, {
    onMutate: () => {
      setIsGoogleLoading(true);
    },
    onSuccess: (data) => {
      setIsAuth(true);
      setUid(data?.id);
      nav("/");
      setIsGoogleLoading(false);
    },
    onError: (error) => {
      console.log("Error Signing Up with google", error);
      setIsGoogleLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const [erorrs, setErorrs] = useState<SignUpFormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = useCallback(() => {
    let hasErrors = false;

    if (!firstName) {
      setErorrs((erorrs) => ({
        ...erorrs,
        firstName: "First name is required",
      }));
      hasErrors = true;
    }

    if (!lastName) {
      setErorrs((erorrs) => ({ ...erorrs, lastName: "LastName is Required" }));
      hasErrors = true;
    }

    if (!email) {
      setErorrs((erorrs) => ({ ...erorrs, email: "Email is required" }));
      hasErrors = true;
    }

    if (!password) {
      setErorrs((erorrs) => ({ ...erorrs, password: "Password is required" }));
      hasErrors = true;
    }

    if (!confirmPassword) {
      hasErrors = true;
      setErorrs((erorrs) => ({
        ...erorrs,
        confirmPassword: "Confirm Password is required",
      }));
    } else if (password != confirmPassword) {
      hasErrors = true;
      setErorrs({
        ...erorrs,
        password: "Password and Confirm Password have to match",
        confirmPassword: "Confirm Password and Password have to match",
      });
    }

    return hasErrors;
  }, [email, password, firstName, lastName, confirmPassword]);

  const handleSubmit = useCallback(() => {
    const hasErrors = validate();
    if (hasErrors) return;

    mutation.mutate({ firstName, lastName, email, password });
  }, [firstName, lastName, email, password, validate]);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setErorrs({ ...erorrs, email: null });
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setErorrs({ ...erorrs, password: null });
  };

  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
    setErorrs({ ...erorrs, firstName: null });
  };

  const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.target.value);
    setErorrs({ ...erorrs, lastName: null });
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setConfirmPassword(e.target.value);
    setErorrs({ ...erorrs, confirmPassword: null });
  };

  return (
    <>
      <Navbar />
      <Flex justify="center" align="start" py={12}>
        <Box boxShadow="0 0 10px -4px" p={6} rounded="lg" w="50%">
          <Heading as="h4" mb={6} fontSize="2xl">
            Create Your Account
          </Heading>
          <SignUpForm
            email={email}
            firstName={firstName}
            lastName={lastName}
            password={password}
            onChangeFirstName={handleFirstNameChange}
            onChangeLastName={handleLastNameChange}
            onChangeEmail={handleEmailChange}
            onChangePassword={handlePasswordChange}
            onChangeConfirmPassword={handleConfirmPasswordChange}
            confirmPassword={confirmPassword}
            erorrs={erorrs}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
          <Button
            onClick={() => signUpWithGoogleMutate.mutate()}
            variant="outline"
            colorScheme="red"
            rightIcon={<FcGoogle />}
          >
            Sign In With Google
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
