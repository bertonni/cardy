import { Text, Box, Pressable } from "native-base";
import { DeckProps } from "src/@types/types";

export const DeckItem = ({ description, data, title, action }: DeckProps) => {
  return (
    <Pressable onPress={action}>
      <Box
        bgColor={"white"}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        rounded="lg"
        h={16}
        w={"full"}
        p={3}
      >
        <Box style={{ display: "flex" }}>
          <Text color={"primary.500"} fontSize={"md"}>
            {title}
          </Text>
          <Text color={"primary.500"} opacity={50} fontSize={"xs"}>
            {description}
          </Text>
        </Box>
        <Text fontSize={"lg"} color="primary.500">
          {data[0]}
        </Text>
      </Box>
    </Pressable>
  );
};
