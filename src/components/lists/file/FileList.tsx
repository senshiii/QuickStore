import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { FC, MouseEventHandler, useContext, useState } from "react";
import { AppFile } from "../../../types";
import NoFilesImage from "../../../assets/no-folders.png";
import FullScreenFilePreview from "../../modals/FullScreenFilePreview";
import FileCard from "./FileCard";
import { SelectionContext } from "../../../context/SelectionContext";

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

interface FileListProps {
  files: AppFile[];
  isLoading: boolean;
}

const FileList: FC<FileListProps> = (props) => {
  const [previewFileSrc, setPreviewFileSrc] = useState<string>();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewFileName, setPreviewFileName] = useState<string>();
  const [previewFileType, setPreviewFileType] = useState<string>();
  const [modalHeadline, setModalHeadline] = useState<string>();

  const { setFile, selectedFile } = useContext(SelectionContext);

  const filePreviewOpenHandler = (
    src: string,
    fileName: string,
    fileType: string
  ) => {
    setPreviewFileSrc(src);
    setPreviewFileName(fileName);
    setPreviewFileType(fileType);
    setModalHeadline("Your Files / " + fileName + "." + fileType);
    setIsPreviewModalOpen(true);
  };

  const filePreviewCloseHandler = () => {
    setPreviewFileSrc("");
    setPreviewFileName("");
    setPreviewFileType("");
    setModalHeadline("");
    setIsPreviewModalOpen(false);
  };

  if (props.isLoading) return <LoadingSkeleton />;

  if (props.files.length === 0) {
    return (
      <Flex my={4} justify={"center"} align="center" direction={"column"}>
        <Image src={NoFilesImage} alt="No Files" width="300px" />
        <Text color="paragraph" mt={4}>
          No Files to show. Upload one
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Text color="headline" mb={4} fontSize="md">
        Files
      </Text>
      <FullScreenFilePreview
        isOpen={isPreviewModalOpen}
        onClose={filePreviewCloseHandler}
        fileSrc={previewFileSrc!}
        headline={modalHeadline!}
        fileName={previewFileName!}
        fileType={previewFileType!}
      />
      <Grid my={4} templateColumns={"repeat(5, 1fr)"} gap={6} mr={3}>
        {props.files.map((file) => (
          <GridItem key={file.id} w="100%">
            <FileCard
              selected={selectedFile?.id === file.id}
              onSelectFile={() => setFile(file)}
              onDoubleClick={() =>
                filePreviewOpenHandler(file.src, file.fileName, file.fileType)
              }
              file={file}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default FileList;
