import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
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
  if (props.isLoading) return <LoadingSkeleton />;

  if (props.folders.length === 0) {
    return (
      <Flex justify="center" align="center" my={4} height="300px">
        <Text>No Folders Found</Text>
      </Flex>
    );
  }

  return (
    <>
      <Text color="headline" mb={4}>
        Folders
      </Text>
      <Grid my={4} w="100%" templateColumns="repeat(5, 1fr)" gap={6}>
        {props.folders.map((folder) => (
          <GridItem key={folder.id}>
            <FolderCard
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
