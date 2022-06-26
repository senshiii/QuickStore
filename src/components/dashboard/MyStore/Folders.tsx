import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Folder } from "../../../types";

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

interface FolderProps {
  id: string;
  name: string;
  createdAt: Date;
}
const FolderComponent: FC<FolderProps> = (props) => {
  return (
    <Box my={3}>
      <Box bg="gray.200" rounded="sm" roundedBottom={"none"} w="20%" h="15px" />
      <Flex
        bg="gray.200"
        justify="center"
        align="center"
        rounded="sm"
        roundedTop="none"
        w="100%"
        h="60px"
      >
        <Text>{props.name}</Text>
      </Flex>
    </Box>
  );
};

interface FolderListProps {
  folders: Folder[];
  isLoading: boolean;
}

const FolderList = (props: FolderListProps) => {
  if (props.isLoading) return <LoadingSkeleton />;

  return (
    <Grid my={4} w="100%" templateColumns="repeat(5, 1fr)" gap={6}>
      {props.folders.map((folder) => (
        <GridItem key={folder.id}>
          <FolderComponent
            name={folder.name}
            id={folder.id}
            createdAt={folder.createdAt}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default FolderList;
