import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import { renamedFolder } from "../../api/user";
import { SelectionContext } from "../../context/SelectionContext";
import { UserDataContext } from "../../context/UserDataContext";
import { Folder } from "../../types";

interface EditFolderProp {
  folderId: string;
  isOpen: boolean;
  onClose: () => void;
}

const RenameFolderModal: FC<EditFolderProp> = (props) => {
  const [name, setName] = useState<string>();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateFolder } = useContext(SelectionContext)
  const { updateFolder: updateFolderInStore } = useContext(UserDataContext)

  const mutation = useMutation(renamedFolder, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled(data) {
      updateFolder(data as Folder);
      updateFolderInStore(data as Folder);
      toast({
        title: "Folder Renamed",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
      setIsLoading(false);
      props.onClose();
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const onCloseHandler = () => {
    setName("");
    props.onClose();
  };

  return (
    <Modal
      isCentered
      closeOnEsc={!isLoading}
      closeOnOverlayClick={!isLoading}
      isOpen={props.isOpen}
      onClose={onCloseHandler}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Folder Name</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel size="sm" htmlFor="name">
              Name
            </FormLabel>
            <Input
              type="text"
              placeholder="Enter new folder name"
              w="100%"
              value={name}
              size="sm"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            disabled={isLoading}
            onClick={onCloseHandler}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() =>
              mutation.mutate({ name: name!, folderId: props.folderId })
            }
            size="sm"
            colorScheme="green"
            ml={4}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenameFolderModal;
