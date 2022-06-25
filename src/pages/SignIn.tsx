import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import SignInForm from "../components/auth/SignInForm";
import Navbar from "../components/ui/Navbar";
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <>
      <Navbar />
      <Flex justify="center" align="start" py={12}>
        <Box boxShadow="0 0 10px -4px" p={6} rounded="lg" w="40%">
          <Heading as="h4" fontSize="2xl">
            Sign In To Your Account
          </Heading>
          <SignInForm
            onSubmit={(email, password) => {
              return;
            }}
          />
          <Divider my={3} />
          <Button variant="outline" colorScheme="red" rightIcon={<FcGoogle />} >Sign In With Google</Button>
        </Box>
      </Flex>
    </>
  );
};

export default SignIn;
