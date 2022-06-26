import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { File } from "../../../types";

const LoadingSkeleton = () => {
  return (
    <Grid templateColumns={"repeat(5, 1fr)"} gap={6}>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
      <GridItem>
        <Skeleton height="200px" w="100%" />
      </GridItem>
    </Grid>
  );
};

interface FileCardProps {
  file: File;
}

const FileCard: FC<FileCardProps> = (props) => {
  return (
    <Box height="200px" p={2}>
      <Box height="60%" />
      <Flex justify="center" align="center">
        <Text>{props.file.fileName}</Text>
      </Flex>
    </Box>
  );
};

interface FileListProps {
  files: File[];
  isLoading: boolean;
}

const FileList: FC<FileListProps> = (props) => {
  if (props.isLoading) return <LoadingSkeleton />;

  return (
    <Grid>
      {props.files.map((file) => (
        <GridItem key={file.id} w="100%">
          <FileCard file={file} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default FileList;
