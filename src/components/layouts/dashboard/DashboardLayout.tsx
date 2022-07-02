import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import { ImFolderPlus } from "react-icons/im";
import { SelectionContext } from "../../../context/SelectionContext";
import { Profile } from "../../../types";
import DeleteFileModal from "../../modals/DeleteFileModal";
import NewFileModal from "../../modals/NewFileModal";
import NewFolderDialog from "../../modals/NewFolderDialog";
import RenameFolderModal from "../../modals/RenameFolderModal";
import Navbar from "../../navigation/Navbar";
import SideNav from "../../navigation/SideNav";
import SelectedFileOptions from "./SelectedFileOptions";
import SelectedFolderOptions from "./SelectedFolderOptions";

interface DashboardLayoutProps {
  profile: Profile;
  uid: string;
  children: any;
}

const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { selectedFile, selectedFolder } = useContext(SelectionContext);

  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [showNewFileModal, setShowNewFileModal] = useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteFileModal, setShowDeleteFileModal] = useState<boolean>(
    false
  );

  const clickNewFileHandler = () => setShowNewFileModal(true);
  const clickNewFolderHandler = () => setShowNewFolderModal(true);

  return (
    <>
      {/* MODALS */}
      <NewFolderDialog
        uid={props.uid}
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
      />
      <NewFileModal
        uid={props.uid}
        isOpen={showNewFileModal}
        onClose={() => setShowNewFileModal(false)}
      />
      <RenameFolderModal
        folderId={selectedFolder?.id!}
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
      />
      <DeleteFileModal
        isOpen={showDeleteFileModal}
        onClose={() => setShowDeleteFileModal(true)}
      />

      {/* PAGE UI */}
      <Navbar
        name={`${props.profile.firstName} ${props.profile.lastName}`}
        profilePhoto={props.profile.profilePhoto}
      />

      <Flex maxHeight="90vh" bg="appBackground" overflow="hidden">
        <Box w="20%" height="100vh" overflowY="hidden">
          <SideNav
            onClickNewFolder={clickNewFolderHandler}
            onClickUploadFile={clickNewFileHandler}
            maxSpaceAvailable={props.profile.maxSpaceAvailable}
            totalSpaceUsed={props.profile.totalSpaceUsed}
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
                  onClick={clickNewFileHandler}
                  icon={<FaFileUpload fontSize="1.2rem" />}
                >
                  Upload New File
                </MenuItem>
                <MenuItem
                  _focus={{ bg: "appBackground" }}
                  _active={{ bg: "appBackground" }}
                  color="headline"
                  onClick={clickNewFolderHandler}
                  icon={<ImFolderPlus fontSize="1.2rem" />}
                >
                  Create New Folder
                </MenuItem>
              </MenuList>
            </Menu>

            {/* File Selection Options */}
            <Box ml="auto">
              {selectedFile && <SelectedFileOptions />}
              {selectedFolder && (
                <SelectedFolderOptions
                  onClickRenameOption={() => setShowRenameModal(true)}
                  selectedFolder={selectedFolder}
                />
              )}
            </Box>
          </Flex>
          {props.children}
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
