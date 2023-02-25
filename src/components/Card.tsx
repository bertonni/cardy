import { Text, Box, Heading } from "native-base";
import { StyleProp, ViewStyle } from "react-native";

interface CardProps {
  color?: "primary" | "secondary";
  data: string | number;
  title: string;
  customStyle?: StyleProp<ViewStyle>;
}

export const Card = ({
  color = "primary",
  data,
  title,
  customStyle,
}: CardProps) => {
  const bg =
    color === "primary"
      ? "rgba(204, 220, 255, 0.2)"
      : "rgba(255, 179, 191, 0.2)";

  const squareBg =
    color === "primary"
      ? "rgba(204, 220, 255, 0.3)"
      : "rgba(255, 179, 191, 0.3)";
  const textColor = color === "primary" ? "primary.500" : "secondary.800";
  return (
    <Box
      p={3}
      bgColor={bg}
      rounded="md"
      h={25}
      style={[{ width: "50%" }, customStyle]}
    >
      <Box flexDirection={"row"} justifyContent="space-between" flex={1}>
        <Heading color={textColor} fontSize={"2xl"}>
          {data}
        </Heading>
        <Box h={26} w={30} bgColor={squareBg} rounded="md" />
      </Box>
      <Text fontSize={12} color={textColor}>
        {title}
      </Text>
    </Box>
  );
};
