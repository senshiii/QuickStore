import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { MdTune } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const Navbar = () => {
  return (
    <Flex
      borderBottomColor="gray.300"
      borderBottomWidth="thin"
      align="center"
      justify="start"
      p={4}
      height="10vh"
    >
      <Box w="20%">
        <Heading fontSize="3xl">QuickStore</Heading>
      </Box>
      <InputGroup w="60%">
        <InputLeftElement pointerEvents="none">
          <Icon as={BiSearchAlt} />
        </InputLeftElement>
        <Input type="text" placeholder="Search your files & folders ..." />
        <InputRightElement p={4} pointerEvents="all">
          <IconButton
            onClick={() => {}}
            icon={<MdTune />}
            aria-label="Tune Search"
          />
        </InputRightElement>
      </InputGroup>
      <Flex justify="end" w="20%">
        <IconButton
          rounded="full"
          size="lg"
          mr={3}
          fontSize="2xl"
          bg="white"
          icon={<FiSettings />}
          aria-label="Settings Button"
        />
        <Flex ml={3} bg="gray.300" px={2} rounded="lg" justify="center" align="center" >
          <Avatar size="sm" name="Sayan Das" />
          <Text ml={3} >Sayan Das</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
