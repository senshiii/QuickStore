import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface EditFolderProp {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
}

const EditFolderNameModal: FC<EditFolderProp> = (props) => {
  const [name, setName] = useState("");
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Folder Name</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              defaultValue={props.currentName}
              placeholder="Enter folder name"
              w="100%"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditFolderNameModal;
