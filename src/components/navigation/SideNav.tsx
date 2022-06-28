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
import { bytesToMegaBytes, storagePercentageCalc } from "../../utils";

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
        <Icon color="button" as={props.icon} fontSize="lg" />
        <Text
          color={props.isActive ? "button" : "headline"}
          flex={1}
          ml={6}
          fontSize="md"
        >
          {props.label}
        </Text>
      </Flex>
      <Box h=".5px" bg="gray.700" my={3} rounded="lg" />
    </>
  );
};

interface SideNavProps {
  onClickNewFolder: MouseEventHandler<HTMLButtonElement>;
  onClickUploadFile: MouseEventHandler<HTMLButtonElement>;
  maxSpaceAvailable: number;
  totalSpaceUsed: number;
}

const SideNav: FC<SideNavProps> = (props) => {
  const spaceUsed = bytesToMegaBytes(props.totalSpaceUsed);
  const totalSpace = bytesToMegaBytes(props.maxSpaceAvailable);

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
            background: "button",
          }}
          _active={{
            background: "button",
          }}
          _focus={{
            background: "button",
          }}
          leftIcon={<BsFilePlus fontSize="1rem" />}
        >
          New File
        </MenuButton>
        <MenuList bg="cardBackground">
          <MenuItem
            _focus={{ bg: "appBackground" }}
            _active={{ bg: "appBackground" }}
            color="headline"
            onClick={props.onClickUploadFile}
            icon={<FaFileUpload fontSize="1.2rem" />}
          >
            Upload New File
          </MenuItem>
          <MenuItem
            _focus={{ bg: "appBackground" }}
            _active={{ bg: "appBackground" }}
            color="headline"
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
        <Text
          color="headline"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Icon fontSize="xl" as={AiOutlineCloud} />
          &nbsp; Your Storage
        </Text>
        <Text fontSize="xs" color="tertiary" my={2}>
          {spaceUsed} / {totalSpace} Mb used.{" "}
          {storagePercentageCalc(spaceUsed, totalSpace)}% storage left
        </Text>
        <Slider max={totalSpace} value={spaceUsed}>
          <SliderTrack >
            <SliderFilledTrack bg="button" />
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
