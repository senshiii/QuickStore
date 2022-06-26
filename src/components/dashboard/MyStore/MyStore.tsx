import { Box, Text } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { useQuery } from "react-query";
import { fetchFilesAndFolders } from "../../../api/user";
import { UserDataContext } from "../../../context/UserDataContext";
import { File, Folder } from "../../../types";
import Folders from "./Folders";

interface MyStoreProps {
  uid: string;
}

const MyStore: FC<MyStoreProps> = ({ uid, ...props }) => {
  const { files, folders, setFiles, setFolders } = useContext(UserDataContext);

  const { isFetching, isError, error } = useQuery(
    ["user", uid, "files-folders"],
    ({ queryKey }) => {
      const [_key, uid, _key1] = queryKey;
      return fetchFilesAndFolders(uid);
    },
    {
      onSuccess: (data) => {
        const { files, folders } = (data as unknown) as {
          files: File[];
          folders: Folder[];
        };
        setFiles(files);
        setFolders(folders);
      },
    }
  );

  if (isError) return <h1>Error</h1>;

  console.log("Files And Folders", files, folders);

  return (
    <Box>
      <Text mb={3}>My Folders</Text>
      <Folders isLoading={isFetching} folders={folders} />
      <Text mb={3}>My Files</Text>
    </Box>
  );
};

export default MyStore;
