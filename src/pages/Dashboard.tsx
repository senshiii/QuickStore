import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchUserProfile } from "../api/user";
import MyStore from "../components/dashboard/MyStore/MyStore";
import Recents from "../components/dashboard/Recents";
import RecycleBin from "../components/dashboard/RecycleBin";
import Starred from "../components/dashboard/Starred";
import FullScreenLoader from "../components/common/FullScreenLoader";
import { AuthContext } from "../context/AuthContext";
import { Profile } from "../types";
import DashboardLayout from "../components/layouts/dashboard/DashboardLayout";

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
    <DashboardLayout profile={profile} uid={uid}>
      {DisplayComponent}
    </DashboardLayout>
  );
};

export default Dashboard;
