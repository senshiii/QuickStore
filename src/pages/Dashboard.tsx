import { Box, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchUserProfile } from "../api/user";
import MyStore from "../components/dashboard/MyStore/MyStore";
import Navbar from "../components/dashboard/navigation/Navbar";
import NewFolderDialog from "../components/dashboard/modals/NewFolderDialog";
import Recents from "../components/dashboard/Recents";
import RecycleBin from "../components/dashboard/RecycleBin";
import SideNav from "../components/dashboard/navigation/SideNav";
import Starred from "../components/dashboard/Starred";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { AuthContext } from "../context/AuthContext";
import { Profile } from "../types";
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
  console.log("Profile Data", profile); 

  const [display, setDisplay] = useState<
    "my-store" | "recents" | "starred" | "recycle-bin"
  >("my-store");
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [showNewFileModal, setShowNewFileModal] = useState<boolean>(false);

  let DisplayComponent = null;

  switch (display) {
    case "my-store":
      DisplayComponent = <MyStore uid={uid} />;
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
          {DisplayComponent}
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
