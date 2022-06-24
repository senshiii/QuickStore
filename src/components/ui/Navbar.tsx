import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import AppLink from "./AppLink";

const Navbar = () => {
  return (
    <Flex justify="start" align="center" py={6} bg="black" px={6}>
      <AppLink href="/">
        <Heading as="h1" fontSize="2xl" color="white">
          QuickStore
        </Heading>
      </AppLink>
    </Flex>
  );
};

export default Navbar;
