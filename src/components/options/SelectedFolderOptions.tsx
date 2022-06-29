import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillFolderOpen, AiOutlineEdit, AiOutlineStar } from "react-icons/ai";
import { BsArrowsMove, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const SelectedFolderOptions = () => {
  return (
    <>
      <Tooltip label="Open folder location">
        <IconButton
          bg="transparent"
          _hover={{ bg: "transparent", color: "headline" }}
          _active={{ bg: "cardBackground" }}
          icon={<AiFillFolderOpen />}
          aria-label="Open folder location"
          color="paragraph"
          fontSize="xl"
          fontWeight="bold"
          mx={1}
        />
      </Tooltip>
      <Tooltip label="Share File">
        <IconButton
          bg="transparent"
          _hover={{ bg: "transparent", color: "headline" }}
          _active={{ bg: "cardBackground" }}
          icon={<FaLink />}
          aria-label="Share File"
          color="paragraph"
          fontSize="xl"
          fontWeight="bold"
          mx={1}
        />
      </Tooltip>
      <Tooltip label="Move to Bin">
        <IconButton
          bg="transparent"
          _hover={{ bg: "transparent", color: "headline" }}
          _active={{ bg: "cardBackground" }}
          icon={<BsTrash />}
          aria-label="Move To Bin"
          color="paragraph"
          fontSize="xl"
          fontWeight="bold"
          mx={1}
        />
      </Tooltip>
      <Menu>
        <MenuButton
          bg="transparent"
          _hover={{ bg: "transparent", color: "headline" }}
          _active={{ bg: "cardBackground" }}
          as={IconButton}
        >
          <Tooltip label="More Options">
            <IconButton
              bg="transparent"
              _hover={{ bg: "transparent", color: "headline" }}
              _active={{ bg: "cardBackground" }}
              icon={<BsThreeDotsVertical />}
              aria-label="More Options"
              color="paragraph"
              fontSize="xl"
              fontWeight="bold"
              mx={1}
            />
          </Tooltip>
        </MenuButton>
        <MenuList>
          <MenuItem
            fontSize="sm"
            icon={<Icon as={BsArrowsMove} fontSize="lg" />}
          >
            Move To
          </MenuItem>
          <MenuItem
            fontSize="sm"
            icon={<Icon as={AiOutlineStar} fontSize="lg" />}
          >
            Add To Starred
          </MenuItem>
          <MenuItem
            fontSize="sm"
            icon={<Icon as={AiOutlineEdit} fontSize="lg" />}
          >
            Rename
          </MenuItem>
        </MenuList>
      </Menu>

      <Tooltip label="View Details">
        <IconButton
          bg="transparent"
          _hover={{ bg: "transparent", color: "headline" }}
          _active={{ bg: "cardBackground" }}
          icon={<IoMdInformationCircleOutline />}
          aria-label="View Details"
          color="paragraph"
          fontSize="xl"
          fontWeight="bold"
          mx={1}
        />
      </Tooltip>
    </>
  );
};

export default SelectedFolderOptions;
