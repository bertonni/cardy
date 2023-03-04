import { useDecks } from "@contexts/DecksContext";
import { useNavigation } from "@react-navigation/native";
import { Text, Box, Heading, Pressable } from "native-base";
import { StyleProp, ViewStyle } from "react-native";

interface CardProps {
  color?: "primary" | "secondary";
  data: string | number | number[];
  title: string;
  deckId?: string;
  customStyle?: StyleProp<ViewStyle>;
}

export const Card = ({
  color = "primary",
  data,
  title,
  deckId,
  customStyle,
}: CardProps) => {
  const { navigate } = useNavigation();
  const { getCurrentCards } = useDecks();
  

  const handleCardPress = () => {
    if (title === "Studied Cards") return;
    else if (title === "Decks") {
      navigate("deckList");
    } else {
      if (deckId) {
        getCurrentCards(deckId);
      }
      navigate("viewCard", {
        headerTitle: title,
        headerDescription: `Decks - ${title}`,
        cardsCount: data,
      });
    }
  };

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
    <Pressable
      bgColor={bg}
      rounded="md"
      h={25}
      style={[{ width: "50%" }, customStyle]}
      onPress={handleCardPress}
    >
      <Box p={3} h={25} style={[{ width: "100%" }, customStyle]}>
        <Box flexDirection={"row"} justifyContent="space-between" flex={1}>
          <Heading color={textColor} fontSize={"2xl"}>
            {typeof data === "object"
              ? data[0] < 10
                ? "0" + data[0] + "/" + (data[1] < 10 ? "0" + data[1] : data[1])
                : data[0] + "/" + (data[1] < 10 ? "0" + data[1] : data[1])
              : data < 10
              ? "0" + data
              : data}
          </Heading>
          <Box h={26} w={30} bgColor={squareBg} rounded="md" />
        </Box>
        <Text fontSize={12} color={textColor}>
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};
