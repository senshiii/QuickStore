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
import {
  useState,
  FC,
  useCallback,
  ChangeEventHandler,
  useContext,
} from "react";
import { useMutation } from "react-query";
import { createUserAccount } from "../../api/auth";
import AppLink from "../ui/AppLink";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface SignUpFormErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const SignUpForm = () => {
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              onChange={handleFirstNameChange}
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
              onChange={handleLastNameChange}
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
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
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
          onChange={handleConfirmPasswordChange}
          placeholder="Type your password again"
        />
        {!!erorrs.confirmPassword && (
          <FormErrorMessage>{erorrs.confirmPassword}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        isLoading={isLoading}
        onClick={handleSubmit}
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
