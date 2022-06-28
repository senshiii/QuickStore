import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchUserProfile } from "../api/user";
import {
  AiOutlineCaretDown,
  AiOutlineEdit,
  AiOutlineStar,
} from "react-icons/ai";
import { BsArrowsMove, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaFile, FaFileUpload, FaLink } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { ImFolderPlus } from "react-icons/im";
import { IoMdInformationCircleOutline } from "react-icons/io";
import MyStore from "../components/dashboard/MyStore/MyStore";
import Navbar from "../components/navigation/Navbar";
import NewFolderDialog from "../components/dashboard/modals/NewFolderDialog";
import Recents from "../components/dashboard/Recents";
import RecycleBin from "../components/dashboard/RecycleBin";
import SideNav from "../components/navigation/SideNav";
import Starred from "../components/dashboard/Starred";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { AuthContext } from "../context/AuthContext";
import { AppFile, Folder, Profile } from "../types";
import NewFileModal from "../components/dashboard/modals/NewFileModal";

const Dashboard = () => {
  const { uid } = useContext(AuthContext);

  const { data, error, isFetching, isError } = useQuery(
    ["user", uid],
    ({ queryKey }) => {
      const [_key, uid] = queryKey;
      return fetchUserProfile(uid);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const profile = data as Profile;

  const [display, setDisplay] = useState<
    "my-store" | "recents" | "starred" | "recycle-bin"
  >("my-store");
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [showNewFileModal, setShowNewFileModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<AppFile>();
  const [selectedFolder, setSelectedFolder] = useState<Folder>();

  const fileSelectionHandler = useCallback(
    (file: AppFile) => {
      if (selectedFile?.id == file.id) {
        setSelectedFile(undefined);
      } else {
        setSelectedFile(file);
      }
    },
    [selectedFile]
  );

  let DisplayComponent = null;

  switch (display) {
    case "my-store":
      DisplayComponent = (
        <MyStore
          selectedFile={selectedFile!}
          onSelectFile={fileSelectionHandler}
          uid={uid}
        />
      );
      break;
    case "recents":
      DisplayComponent = <Recents />;
      break;
    case "starred":
      DisplayComponent = <Starred />;
      break;
    case "recycle-bin":
      DisplayComponent = <RecycleBin />;
      break;
  }

  if (isFetching) {
    return <FullScreenLoader loadingText="Loading your profile" />;
  }

  return (
    <>
      <NewFolderDialog
        uid={uid}
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
      />
      <NewFileModal
        uid={uid}
        isOpen={showNewFileModal}
        onClose={() => setShowNewFileModal(false)}
      />
      <Navbar
        name={`${profile.firstName} ${profile.lastName}`}
        profilePhoto={profile.profilePhoto}
      />
      <Flex maxHeight="90vh" bg="appBackground" overflow="hidden">
        <Box w="20%" height="100vh" overflowY="hidden">
          <SideNav
            onClickNewFolder={() => setShowNewFolderModal(true)}
            onClickUploadFile={() => setShowNewFileModal(true)}
            maxSpaceAvailable={profile.maxSpaceAvailable}
            totalSpaceUsed={profile.totalSpaceUsed}
          />
        </Box>
        <Box w="80%" p={4}>
          <Flex
            borderBottomWidth="thin"
            borderBottomColor="whiteAlpha.300"
            pr={4}
            py={3}
            mb={4}
            justify="start"
            align="center"
          >
            {/* Main Menu */}
            <Menu>
              <MenuButton
                variant="ghost"
                color="white"
                fontWeight="normal"
                p={0}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                rightIcon={<Icon color="gray.200" as={AiOutlineCaretDown} />}
                as={Button}
              >
                My Store
              </MenuButton>
              <MenuList bg="cardBackground">
                <MenuItem
                  _focus={{ bg: "appBackground" }}
                  _active={{ bg: "appBackground" }}
                  color="headline"
                  onClick={() => setShowNewFileModal(true)}
                  icon={<FaFileUpload fontSize="1.2rem" />}
                >
                  Upload New File
                </MenuItem>
                <MenuItem
                  _focus={{ bg: "appBackground" }}
                  _active={{ bg: "appBackground" }}
                  color="headline"
                  onClick={() => setShowNewFolderModal(true)}
                  icon={<ImFolderPlus fontSize="1.2rem" />}
                >
                  Create New Folder
                </MenuItem>
              </MenuList>
            </Menu>
            {/* File Selection Options */}
            <Box ml="auto">
              {selectedFile && (
                <>
                  <Tooltip label="Add User">
                    <IconButton
                      bg="transparent"
                      _hover={{ bg: "transparent", color: "headline" }}
                      _active={{ bg: "cardBackground" }}
                      icon={<FiUserPlus />}
                      aria-label="Add User"
                      color="paragraph"
                      fontSize="xl"
                      fontWeight="bold"
                      mx={1}
                    />
                  </Tooltip>
                  <Tooltip label="Copy Link">
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
                  <Tooltip label="Delete File">
                    <IconButton
                      bg="transparent"
                      _hover={{ bg: "transparent", color: "headline" }}
                      _active={{ bg: "cardBackground" }}
                      icon={<BsTrash />}
                      aria-label="Delete File"
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
              )}
            </Box>
          </Flex>
          {DisplayComponent}
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
