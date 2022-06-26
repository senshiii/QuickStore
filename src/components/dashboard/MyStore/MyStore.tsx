import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { fetchFilesAndFolders } from "../../../api/user";

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

  if (isFetching) return <h1>Loading....</h1>;

  console.log("Files And Folders", data);

  return (
    <Box>
      <Text mb={3}>My Folders</Text>  
      
      <Text mb={3}>My Files</Text>
    </Box>
  );
};

export default MyStore;
