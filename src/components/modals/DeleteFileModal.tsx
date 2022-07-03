import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { FC, useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { moveFileToBin } from "../../api/user";
import { SelectionContext } from "../../context/SelectionContext";
import { UserDataContext } from "../../context/UserDataContext";
import { AppFile } from "../../types";

interface DeleteFileModalProps {
  isOpen: boolean;
  fileName: string;
  fileId: string;
  onClose: () => void;
}

const DeleteFileModal: FC<DeleteFileModalProps> = (props) => {
  const [ldref, setLdref] = useState();
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const { updateFile } = useContext(SelectionContext);
  const { removeFile } = useContext(UserDataContext);

  const onCloseHandler = () => {
    setFileName("");
    props.onClose();
  };

  const mutation = useMutation(moveFileToBin, {
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      updateFile(null);
      removeFile(data as AppFile);
      setIsLoading(false);
      onCloseHandler();
      toast({
        title: "Moved to bin",
        duration: 8000,
        position: "bottom-left",
        status: "success",
        isClosable: true,
      });
    },
    onError(){
      setIsLoading(false);
      onCloseHandler();
    }
  });

  return (
    <AlertDialog
      leastDestructiveRef={ldref!}
      isOpen={props.isOpen}
      onClose={onCloseHandler}
      isCentered
      closeOnEsc={!isLoading}
      closeOnOverlayClick={!isLoading}
    >
      <AlertDialogOverlay backdropFilter={"blur('10px')"} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading as="h2" fontSize="xl">
            Delete File
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            Are you sure you want to delete the file -{" "}
            <strong>{props.fileName}</strong>. To continue, enter the file name
            below.
          </Text>
          <Input
            type="text"
            placeholder="Enter file name..."
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            onClick={onCloseHandler}
            ref={ldref}
            colorScheme="red"
          >
            Cancel
          </Button>
          <Button
            ml={3}
            isLoading={isLoading}
            disabled={props.fileName != fileName}
            variant={"outline"}
            colorScheme="green"
            onClick={() => mutation.mutate(props.fileId)}
          >
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFileModal;
