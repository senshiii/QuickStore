import { Box, Flex, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { IconType } from "react-icons";
import { BsImageFill } from "react-icons/bs";
import { AppFile } from "../../../types";
import { isFileImage } from "../../../utils";

interface FileCardProps {
  file: AppFile;
  selected: boolean;
  onDoubleClick: MouseEventHandler<HTMLDivElement>;
  onSelectFile: MouseEventHandler<HTMLDivElement>;
}

const FileCard: FC<FileCardProps> = (props) => {
  const fullFileName = `${props.file.fileName}.${props.file.fileType}`;

  let FileTypeIcon = null,
    FilePreview = null;
  if (isFileImage(props.file.fileType)) {
    FileTypeIcon = BsImageFill;
    FilePreview = (
      <Image
        w="100%"
        h="100%"
        src={props.file.src}
        alt={`${fullFileName} Preview`}
      />
    );
  }

  const selectionProps: { [x: string]: string } = {};
  if (props.selected) {
    selectionProps["borderWidth"] = "2px";
    selectionProps["borderColor"] = "blue.300";
  }

  return (
    <Box
      color="white"
      bg="cardBackground"
      cursor="pointer"
      onClick={props.onSelectFile}
      onDoubleClick={props.onDoubleClick}
      rounded="sm"
      p={2}
      {...selectionProps}
    >
      <Box height="160px">{FilePreview}</Box>
      <Flex justify="center" align="center" mt={2}>
        <Icon as={FileTypeIcon as IconType} mr={3} />
        <Tooltip label={fullFileName}>
          <Text noOfLines={1} fontSize="xs">
            {fullFileName}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default FileCard;
