import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import { moveFolderToBin } from "../../api/user";
import { SelectionContext } from "../../context/SelectionContext";
import { UserDataContext } from "../../context/UserDataContext";
import { Folder } from "../../types";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderId: string;
  folderName: string;
}

const DeleteFolderModal: FC<DeleteModalProps> = (props) => {
  const [ldRef, setLdRef] = useState();
  const [folderName, setFolderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { removeFolder } = useContext(UserDataContext);
  const { updateFolder } = useContext(SelectionContext);

  const onCloseHandler = () => {
    setFolderName("");
    props.onClose();
  }

  const toast = useToast();

  const moveToBinMutation = useMutation(moveFolderToBin, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess(data) {
      removeFolder(data as Folder);
      updateFolder(null);
      setIsLoading(false);
      onCloseHandler();
      setFolderName("");
      toast({
        title: "Deleted Folder",
        duration: 8000,
        isClosable: true,
        status: "success",
        position: "bottom-left",
      });
    },
    onError: (error) => {},
  });

  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={onCloseHandler}
      closeOnEsc={!isLoading}
      closeOnOverlayClick={!isLoading}
      isCentered
      leastDestructiveRef={ldRef!}
    >
      <AlertDialogOverlay backdropFilter="blur(5px)" />
      <AlertDialogContent>
        <AlertDialogHeader>Delete Folder</AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            Are you sure you want to delete the folder{" "}
            <strong>{props.folderName}</strong> ? To conitnue, please type the
            name of the folder below.
          </Text>
          <Input
            disabled={isLoading}
            mt={4}
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            onClick={onCloseHandler}
            colorScheme="red"
            ref={ldRef}
          >
            Cancel
          </Button>
          <Button
            disabled={props.folderName != folderName}
            colorScheme="green"
            variant="solid"
            ml={4}
            isLoading={isLoading}
            onClick={() => moveToBinMutation.mutate(props.folderId)}
          >
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFolderModal;
