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
} from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface EditFolderProp {
  isOpen: boolean;
  onClose: () => void;
}

const RenameFolderModal: FC<EditFolderProp> = (props) => {
  const [name, setName] = useState<string>();
  
  const onCloseHandler = () => {
    setName("");
    props.onClose();
  }

  return (
    <Modal
      isCentered
      closeOnEsc
      closeOnOverlayClick
      isOpen={props.isOpen}
      onClose={onCloseHandler}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Folder Name</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel size="sm" htmlFor="name">Name</FormLabel>
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
          <Button size="sm" variant="outline" colorScheme="red" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button size="sm" colorScheme="green" ml={4}>
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenameFolderModal;
