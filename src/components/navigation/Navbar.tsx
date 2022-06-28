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
import { FC } from "react";

interface NavbarProps {
  name: string;
  profilePhoto: string;
}

const Navbar: FC<NavbarProps> = (props) => {
  return (
    <Flex
      borderBottomColor="button"
      borderBottomWidth="thin"
      align="center"
      justify="start"
      p={4}
      height="10vh"
      bg="appBackground"
    >
      <Box w="20%">
        <Heading color="headline" fontSize="3xl">
          QuickStore
        </Heading>
      </Box>
      <InputGroup w="60%">
        <InputLeftElement pointerEvents="none">
          <Icon color="button" as={BiSearchAlt} />
        </InputLeftElement>
        <Input
          _placeholder={{ color: "headline" }}
          color="headline"
          type="text"
          placeholder="Search your files & folders ..."
        />
        <InputRightElement p={4} pointerEvents="all">
          <IconButton
            bg="button"
            color="headline"
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
        <Flex
          ml={3}
          bg="cardBackground"
          px={2}
          rounded="lg"
          justify="center"
          align="center"
        >
          <Avatar
            color="headline"
            bg="button"
            size="sm"
            name={props.name}
            src={props.profilePhoto}
          />
          <Text color="headline" ml={3}>
            {props.name}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
