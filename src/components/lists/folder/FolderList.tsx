import { Box, Flex, Grid, GridItem, Icon, Skeleton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AiFillFolder } from "react-icons/ai";
import { SelectionContext } from "../../../context/SelectionContext";
import { Folder } from "../../../types";
import FolderCard from "./FolderCard";

const SkeletonFolder = () => {
  return (
    <Box>
      <Skeleton roundedBottom={"none"} w="20%" h="15px" />
      <Skeleton roundedTop="none" w="100%" h="60px" />
    </Box>
  );
};

const LoadingSkeleton = () => {
  return (
    <Grid my={4} w="100%" templateColumns={"repeat(5, 1fr)"} gap={6}>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
      <GridItem w="100%" flex={1}>
        <SkeletonFolder />
      </GridItem>
    </Grid>
  );
};

interface FolderListProps {
  folders: Folder[];
  isLoading: boolean;
}

const FolderList = (props: FolderListProps) => {
  const { setFolder, selectedFolder } = useContext(SelectionContext);

  if (props.isLoading) return <LoadingSkeleton />;

  if (props.folders.length === 0) {
    return (
      <Flex justify="center" align="center" my={4} height="40px">
        <Icon as={AiFillFolder} color="white" fontSize="xl" mr={3} />
        <Text color="white" >No Folders Found</Text>
      </Flex>
    );
  }

  return (
    <>
      <Text color="headline" mb={4}>
        Folders
      </Text>
      <Grid my={4} w="100%" templateColumns="repeat(5, 1fr)" mr={3} gap={6}>
        {props.folders.map((folder) => (
          <GridItem key={folder.id}>
            <FolderCard
              selected={folder.id === selectedFolder?.id}
              onClick={() => setFolder(folder)}
              name={folder.name}
              id={folder.id}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default FolderList;
