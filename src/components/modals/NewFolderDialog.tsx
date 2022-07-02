import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import { createNewFolder } from "../../api/user";
import { UserDataContext } from "../../context/UserDataContext";
import { Folder } from "../../types";

interface ModalProps {
  isOpen: boolean;
  uid: string;
  onClose: () => void;
  parentFolderId: string;
}

const NewFolderDialog: FC<ModalProps> = (props) => {
  const [initialFocusRef, setInitialFocusRef] = useState<any>();
  const [folderName, setFolderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addFolder } = useContext(UserDataContext);

  const mutation = useMutation(createNewFolder, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setFolderName("");
      addFolder(data as Folder);
      setIsLoading(false);
      props.onClose();
    },
  });

  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      blockScrollOnMount
      closeOnEsc={!isLoading}
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize="xl">New Folder</Heading>
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              placeholder="Type folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              ref={initialFocusRef}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isLoading}
            onClick={props.onClose}
            variant="outline"
            colorScheme="red"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              mutation.mutate({
                uid: props.uid,
                folderName,
                parentFolder: props.parentFolderId,
              })
            }
            variant="solid"
            colorScheme="green"
            ml={4}
            isLoading={isLoading}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewFolderDialog;
