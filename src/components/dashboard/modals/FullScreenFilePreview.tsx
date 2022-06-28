import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import FileViewer from "react-file-viewer";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileSrc: string;
  fileName: string;
  fileType: string;
  headline: string;
}

const FullScreenFileDisplay: FC<ModalProps> = (props) => {
  return (
    <Modal
      closeOnOverlayClick
      size="full"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalContent bg="transparent" backdropFilter={"blur(5px)"}>
        <ModalHeader
          px={4}
          bg="cardBackground"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="headline" fontSize="sm">
            {props.headline}
          </Text>
          <IconButton
            aria-label="Close Modal Button"
            colorScheme="red"
            icon={<FaTimes />}
            onClick={props.onClose}
          />
        </ModalHeader>
        <ModalBody>
          <FileViewer
            fileType={props.fileType}
            filePath={props.fileSrc}
            onError={(error: any) =>
              console.log("Error dispkaying file for preview", error)
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenFileDisplay;
