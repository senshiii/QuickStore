import {
  As,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { FC, MouseEventHandler, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { BsFilePlus } from "react-icons/bs";
import {
  AiFillDelete,
  AiFillStar,
  AiOutlineClockCircle,
  AiOutlineCloud,
} from "react-icons/ai";
import { ImFolderPlus, ImFolderUpload } from "react-icons/im";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaFileUpload } from "react-icons/fa";
import { storagePercentageCalc } from "../../utils";

interface MenuOptionsProps {
  icon: As<any>;
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
}

const MenuOption: FC<MenuOptionsProps> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHover(true);

  const handleMouseLeave = () => setIsHover(false);

  return (
    <>
      <Flex
        p={2}
        pl={0}
        cursor="pointer"
        rounded="full"
        justify="start"
        align="center"
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
      >
        <Icon as={props.icon} fontSize="lg" />
        <Text flex={1} ml={6} fontSize="md">
          {props.label}
        </Text>
        {(props.isActive || isHover) && (
          <Box
            ml="auto"
            w="4px"
            rounded="lg"
            alignSelf="stretch"
            background="blue"
          />
        )}
      </Flex>
      <Box h=".5px" bg="gray.700" my={3} rounded="lg" />
    </>
  );
};

interface SideNavProps {
  onClickNewFolder: MouseEventHandler<HTMLButtonElement>;
  onClickUploadFolder: MouseEventHandler<HTMLButtonElement>;
  onClickUploadFile: MouseEventHandler<HTMLButtonElement>;
  maxSpaceAvailable: number;
  totalSpaceUsed: number;
}

const SideNav: FC<SideNavProps> = (props) => {
  return (
    <Box p={4} height="100%" color="black">
      {/* Add File Button */}
      <Menu>
        <MenuButton
          mb={3}
          w="100%"
          as={Button}
          color="white"
          background="linear-gradient(to right, #8e2de2, #4a00e0)"
          _hover={{
            background: "linear-gradient(to right, #fc466b, #3f5efb)",
          }}
          _active={{
            background: "linear-gradient(to right, #fc466b, #3f5efb)",
          }}
          _focus={{
            background: "linear-gradient(to right, #fc466b, #3f5efb)",
          }}
          leftIcon={<BsFilePlus fontSize="1rem" />}
        >
          New File
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={props.onClickUploadFile}
            icon={<FaFileUpload fontSize="1.2rem" />}
          >
            Upload New File
          </MenuItem>
          <MenuItem
            onClick={props.onClickUploadFolder}
            icon={<ImFolderUpload fontSize="1.2rem" />}
          >
            Upload New Folder
          </MenuItem>
          <MenuItem
            onClick={props.onClickNewFolder}
            icon={<ImFolderPlus fontSize="1.2rem" />}
          >
            Create New Folder
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Menu Options */}
      <Box mt={4}>
        <MenuOption
          isActive
          icon={CgFileDocument}
          label="My Store"
          onClick={() => {}}
        />
        <MenuOption
          icon={AiOutlineClockCircle}
          label="Recent"
          onClick={() => {}}
        />
        <MenuOption icon={AiFillStar} label="Starred" onClick={() => {}} />
        <MenuOption
          icon={AiFillDelete}
          label="Recycle Bin"
          onClick={() => {}}
        />
      </Box>

      {/* Storage Display */}
      <Box my={4}>
        <Text display="flex" justifyContent="flex-start" alignItems="center">
          <Icon fontSize="xl" as={AiOutlineCloud} />
          &nbsp; Your Storage
        </Text>
        <Text fontSize="xs" color="green" my={2}>
          {Math.round(props.totalSpaceUsed / 1000000)} /{" "}
          {props.maxSpaceAvailable / 1000000} Mb used.{" "}
          {storagePercentageCalc(props.totalSpaceUsed, props.maxSpaceAvailable)}
          % storage left
        </Text>
        <Slider value={props.totalSpaceUsed}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Box>

      {/* Sign Out Button */}
      <Button
        w="100%"
        _hover={{ bg: "red", color: "white", borderColor: "red" }}
        variant="outline"
        colorScheme="red"
        leftIcon={<RiLogoutBoxLine />}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default SideNav;
