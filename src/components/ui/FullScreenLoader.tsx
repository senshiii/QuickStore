import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

interface FullScreenLoaderProps {
  loadingText?: string;
}

const FullScreenLoader: FC<FullScreenLoaderProps> = (props) => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justify={"center"}
      align={"center"}
      direction="column"
    >
      <CircularProgress isIndeterminate />
      {props.loadingText && <Text mt={3}>{props.loadingText}</Text>}
    </Flex>
  );
};

export default FullScreenLoader;
