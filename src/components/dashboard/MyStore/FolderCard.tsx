import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseTimestamp } from "../../../types";

interface FolderCardProps {
  id: string;
  name: string;
}

const FolderCard: FC<FolderCardProps> = ({ id, name }) => {
  const nav = useNavigate();
  return (
    <Box cursor={"pointer"} onDoubleClick={() => nav("/folder/" + id)}>
      <Box
        bg="cardBackground"
        rounded="sm"
        roundedBottom={"none"}
        w="20%"
        h="15px"
      />
      <Flex
        bg="cardBackground"
        justify="center"
        align="center"
        rounded="sm"
        roundedTop="none"
        w="100%"
        h="60px"
      >
        <Tooltip label={name}>
          <Text noOfLines={1} color="headline" fontSize="sm">
            {name}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default FolderCard;
