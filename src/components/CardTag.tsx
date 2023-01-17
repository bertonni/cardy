import React from "react";
import { Box, Text } from "native-base";

interface CardTagProps {
  title: string;
}

export const CardTag = ({ title }: CardTagProps) => {
  return (
    <Box h={6} w={"fit"} p={1} rounded="md" bgColor="primary.100" opacity={50}>
      <Text textAlign={"center"} color={"primary.500"}>
        {title}
      </Text>
    </Box>
  );
};
