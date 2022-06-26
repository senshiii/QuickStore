import { Box, Flex, Grid, GridItem, Image, Skeleton, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { AppFile } from "../../../types";
import NoFilesImage from '../../../assets/no-folders.png'

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
  file: AppFile;
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
  files: AppFile[];
  isLoading: boolean;
}

const FileList: FC<FileListProps> = (props) => {
  if (props.isLoading) return <LoadingSkeleton />;

  if(props.files.length === 0) {
    return <Flex my={4} justify={"center"} align="center" direction={"column"}  >
      <Image src={NoFilesImage} alt="No Files" width="300px" />
      <Text color="paragraph" mt={4} >No Files to show. Upload one</Text>
    </Flex>
  }

  return (
    <>
    <Text color="headline" mb={4} fontSize="xl" fontWeight={"bold"} >Folders</Text>
    <Grid>
      {props.files.map((file) => (
        <GridItem key={file.id} w="100%">
          <FileCard file={file} />
        </GridItem>
      ))}
    </Grid>
      </>
  );
};

export default FileList;
