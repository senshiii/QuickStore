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
import { ChangeEventHandler, FC, useState } from "react";
import { createNewFolder } from "../../api/user";
import AsyncTaskModal from "../../hoc/AsyncTaskModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrimaryAction: any;
  name: string;
  onChangeName: ChangeEventHandler<HTMLInputElement>;
}

const NewFolderDialog: FC<ModalProps> = (props) => {
  const [initialFocusRef, setInitialFocusRef] = useState<any>();
  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      blockScrollOnMount
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
              value={props.name}
              onChange={props.onChangeName}
              ref={initialFocusRef}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose} variant="outline" colorScheme="red">
            Cancel  
          </Button>
          <Button onClick={props.onPrimaryAction} variant="solid" colorScheme="green" ml={4}>
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const WrappedComponent = AsyncTaskModal(NewFolderDialog, createNewFolder);

export default WrappedComponent;
