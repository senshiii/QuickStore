import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { SignInFormErrors } from "../../types";
import AppLink from "../common/AppLink";

interface SignInFormProps {
  email: string;
  password: string;
  erorrs: SignInFormErrors;
  isLoading: boolean;
  onChangeEmail: ChangeEventHandler<HTMLInputElement>;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

const SignInForm: FC<SignInFormProps> = ({
  erorrs,
  isLoading,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) => {
  return (
    <Box my={4}>
      <FormControl isInvalid={!!erorrs.email} mb={3} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          disabled={isLoading}
          id="email"
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={onChangeEmail}
        />
        {!!erorrs.email && <FormErrorMessage>{erorrs.email}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!erorrs.password} mb={3} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          placeholder="Type your password"
          value={password}
          onChange={onChangePassword}
        />
        {!!erorrs.password && (
          <FormErrorMessage>{erorrs.password}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        onClick={onSubmit}
        my={3}
        type="submit"
        variant="solid"
        colorScheme="green"
        isLoading={isLoading}
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
