import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";

interface DeleteFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteFileModal: FC<DeleteFileModalProps> = (props) => {
  const [ldref, setLdref] = useState();
  return (
    <AlertDialog
      leastDestructiveRef={ldref!}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      closeOnEsc
      closeOnOverlayClick
    >
      <AlertDialogOverlay backdropFilter={"blur('10px')"} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading as="h2" fontSize="xl">
            Delete File
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>Are you sure you want to delete the file</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={ldref} colorScheme="red">
            Cancel
          </Button>
          <Button variant={"outline"} colorScheme="green">
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFileModal;
