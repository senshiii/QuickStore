import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { FC, ChangeEventHandler, MouseEventHandler } from "react";
import { SignUpFormErrors } from "../../types";
import AppLink from "../ui/AppLink";

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  erorrs: SignUpFormErrors
  isLoading: boolean;
  onChangeFirstName: ChangeEventHandler<HTMLInputElement>;
  onChangeLastName: ChangeEventHandler<HTMLInputElement>;
  onChangeEmail: ChangeEventHandler<HTMLInputElement>;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
  onChangeConfirmPassword: ChangeEventHandler<HTMLInputElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

const SignUpForm: FC<SignUpFormProps> = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  erorrs,
  isLoading,
  onChangeEmail,
  onChangePassword,
  onChangeFirstName,
  onChangeLastName,
  onChangeConfirmPassword,
  onSubmit
}) => {
  return (
    <Box my={4}>
      <Grid mb={3} templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%">
          <FormControl isInvalid={!!erorrs.firstName} isRequired>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              disabled={isLoading}
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={onChangeFirstName}
            />
            {!!erorrs.firstName && (
              <FormErrorMessage>{erorrs.firstName}</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={!!erorrs.lastName} isRequired>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              disabled={isLoading}
              type="text"
              value={lastName}
              onChange={onChangeLastName}
              placeholder="Last Name"
            />
            {!!erorrs.lastName && (
              <FormErrorMessage>{erorrs.lastName}</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
      </Grid>
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
      <FormControl isInvalid={!!erorrs.confirmPassword} isRequired mb={3}>
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <Input
          disabled={isLoading}
          type="password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          placeholder="Type your password again"
        />
        {!!erorrs.confirmPassword && (
          <FormErrorMessage>{erorrs.confirmPassword}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        isLoading={isLoading}
        onClick={onSubmit}
        my={3}
        type="submit"
        variant="solid"
        colorScheme="green"
      >
        Sign Up
      </Button>
      <Text>
        Already have an account ? Sign In{" "}
        <AppLink color="blue" textDecoration="underline" href="/signin">
          here
        </AppLink>
      </Text>
    </Box>
  );
};

export default SignUpForm;
