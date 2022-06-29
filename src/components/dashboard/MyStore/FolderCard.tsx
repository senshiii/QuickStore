import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseTimestamp } from "../../../types";

interface FolderCardProps {
  id: string;
  name: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const FolderCard: FC<FolderCardProps> = ({ id, name, selected, onClick }) => {
  const nav = useNavigate();
  let folderProps: { [x: string]: string } = {};
  let textProps: { [x: string]: string } = {};

  if (selected) {
    folderProps["bg"] = "blue.100";
    textProps["color"] = "black";
  }

  return (
    <Box
      onClick={onClick}
      cursor={"pointer"}
      onDoubleClick={() => nav("/folder/" + id)}
    >
      <Box
        bg="cardBackground"
        rounded="sm"
        roundedBottom={"none"}
        w="20%"
        {...folderProps}
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
        {...folderProps}
      >
        <Tooltip label={name}>
          <Text noOfLines={1} color="headline" fontSize="sm" {...textProps}>
            {name}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default FolderCard;
