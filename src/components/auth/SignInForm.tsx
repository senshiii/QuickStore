import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, FC, useCallback, ChangeEventHandler } from "react";
import AppLink from "../ui/AppLink";

interface FormProps {
  onSubmit: (email: string, password: string) => void;
}

interface SignInFormErrors {
  email: string | null;
  password: string | null;
}

const SignInForm: FC<FormProps> = ({ onSubmit, ...props }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

    onSubmit(email, password);
  }, [email, password, onSubmit, validate]);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setErorrs({ ...erorrs, email: null });
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setErorrs({ ...erorrs, password: null });
  };

  return (
    <Box my={4}>
      <FormControl isInvalid={!!erorrs.email} mb={3} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={handleEmailChange}
        />
        {!!erorrs.email && <FormErrorMessage>{erorrs.email}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!erorrs.password} mb={3} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Type your password"
          value={password}
          onChange={handlePasswordChange}
        />
        {!!erorrs.password && (
          <FormErrorMessage>{erorrs.password}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        onClick={handleSubmit}
        my={3}
        type="submit"
        variant="solid"
        colorScheme="green"
      >
        Sign In
      </Button>
      <Text mt={3}>
        Don&apos;t have an account ? Create One{" "}
        <AppLink href="/signup" color="blue" textDecoration="underline">
          here
        </AppLink>
      </Text>
    </Box>
  );
};

export default SignInForm;
