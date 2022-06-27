import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useMutation } from "react-query";
import { createNewFile } from "../../../api/user";

interface NewFileModalProps {
  uid: string;
  isOpen: boolean;
  onClose: () => void;
}

const NewFileModal: FC<NewFileModalProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("Selected File", file);

  const mutation = useMutation(createNewFile, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      console.log("Uploaded File Data", data);
      setFile(null);
      setIsLoading(false);
      props.onClose();
    },
    onError: (error) => {
      setIsLoading(false);
    }
  });

  return (
    <Modal
      closeOnEsc={!isLoading}
      closeOnOverlayClick={!isLoading}
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h1" fontSize="xl">
            Upload New File
          </Heading>
        </ModalHeader>
        <ModalBody>
          {file && (
            <Flex
              justify={"center"}
              h="60px"
              my={3}
              rounded="lg"
              bg="gray.100"
              align={"center"}
            >
              <Text fontSize="sm">
                You are about to upload: <strong>{file.name}</strong>
              </Text>
            </Flex>
          )}
          <FileUploader
            disabled={isLoading}
            handleChange={setFile}
            name="file"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isLoading}
            colorScheme="red"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => mutation.mutate({ uid: props.uid, file: file! })}
            ml={4}
            colorScheme="green"
            variant="outline"
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewFileModal;
