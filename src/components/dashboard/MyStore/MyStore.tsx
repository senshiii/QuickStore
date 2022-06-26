import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { fetchFilesAndFolders } from "../../../api/user";
import { Folder } from "../../../types";
import Folders from "./Folders";

interface MyStoreProps {
  uid: string;
}

const MyStore: FC<MyStoreProps> = ({ uid, ...props }) => {
  const { data, isFetching, isError, error } = useQuery(
    ["user", uid, "files-folders"],
    ({ queryKey }) => {
      const [_key, uid, _key1] = queryKey;
      return fetchFilesAndFolders(uid);
    }
  );

  if (isError) return <h1>Error</h1>;

  console.log("Files And Folders", data);

  return (
    <Box>
      <Text mb={3}>My Folders</Text>
      <Folders isLoading={isFetching} folders={data?.folders as Folder[]} />
      <Text mb={3}>My Files</Text>
    </Box>
  );
};

export default MyStore;
