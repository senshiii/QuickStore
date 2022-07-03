import { Box } from "@chakra-ui/react";
import React, { FC, useContext } from "react";

import { useQuery } from "react-query";
import { fetchFilesAndFolders } from "../../api/user";
import { UserDataContext } from "../../context/UserDataContext";
import { AppFile, Folder } from "../../types";
import FileList from "../lists/file/FileList";
import FolderList from "../lists/folder/FolderList";

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
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { files, folders } = (data as unknown) as {
          files: AppFile[];
          folders: Folder[];
        };
        setFiles(files);
        setFolders(folders);
      },
    }
  );

  if (isError) return <h1>Error</h1>;

  return (
    <Box>
      <FolderList isLoading={isFetching} folders={folders} />
      <FileList isLoading={isFetching} files={files} />
    </Box>
  );
};

export default MyStore;
