import { Box, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchUserProfile } from "../api/user";
import MyStore from "../components/dashboard/MyStore/MyStore";
import Navbar from "../components/dashboard/Navbar";
import NewFolderDialog from "../components/dashboard/NewFolderDialog";
import Recents from "../components/dashboard/Recents";
import RecycleBin from "../components/dashboard/RecycleBin";
import SideNav from "../components/dashboard/SideNav";
import Starred from "../components/dashboard/Starred";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import { AuthContext } from "../context/AuthContext";
import { Profile } from "../types";

const Dashboard = () => {
  const { uid } = useContext(AuthContext);

  const { data, error, isFetching, isError } = useQuery(["user", uid], ({ queryKey }) => {
    const [_key, uid] = queryKey;
    return fetchUserProfile(uid);
  });

  const profile = data as Profile;

  const [display, setDisplay] = useState<
    "my-store" | "recents" | "starred" | "recycle-bin"
  >("my-store");
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");

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

  console.log("Profile Data", data);

  return (
    <>
      {/* <NewFolderDialog
        name={newFolderName}
        onChangeName={(e: any) => setNewFolderName(e.target.value)}
        variables={{}}
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
      /> */}
      <Navbar />
      <Flex maxHeight="90vh" overflow="hidden">
        <Box w="20%" height="100vh" overflowY="hidden">
          <SideNav
            onClickNewFolder={() => {
              console.log("Cliced new folder button");
              setShowNewFolderModal(true);
            }}
            onClickUploadFile={() => {}}
            onClickUploadFolder={() => {}}
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
