import { Box, Flex, Heading } from "@chakra-ui/react";
import SignUpForm from "../components/auth/SignUpForm";
import Navbar from "../components/ui/Navbar";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <Flex justify="center" align="start" py={12}>
        <Box boxShadow="0 0 10px -4px" p={6} rounded="lg" w="50%">
          <Heading as="h4" mb={6} fontSize="2xl">
            Create Your Account
          </Heading>
          <SignUpForm />
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
