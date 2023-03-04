import { Text, Box, Pressable, useToast } from "native-base";
import { Alert } from "react-native";
import { DeckProps } from "src/@types/types";
import * as Haptics from "expo-haptics";
import { deleteDeck } from "@services/useDecks";
import { useAuth } from "@contexts/AuthContext";
import { AlertFeedback } from "./AlertFeedback";
import { useDecks } from "@contexts/DecksContext";

export const DeckItem = ({
  deckId,
  description,
  data,
  title,
  action,
}: DeckProps) => {
  const { user } = useAuth();
  const { updated, setUpdated } = useDecks();
  const toast = useToast();
  const removeDeck = async (id: string) => {
    try {
      const message = await deleteDeck(id, user.access_token);
      setUpdated(updated + 1);
      toast.show({
        id,
        title: "Success",
        placement: "top",
        render: () => (
          <AlertFeedback title="Success" message={message} variant="success" />
        ),
      });
    } catch (error: any) {
      const message = error.response.data.message;
      toast.show({
        id,
        title: "Error",
        placement: "top",
        render: () => (
          <AlertFeedback title="Error" message={message} variant="error" />
        ),
      });
    }
  };

  const handleLongPress = (deckId: string, title: string) => {
    makeVibration();
    return Alert.alert(
      `Delete deck ${title}?`,
      `Are you sure you want to delete this deck? All cards associated with this deck will be deleted as well. This action can't be undone.`,
      [{ text: "Yes", onPress: () => removeDeck(deckId) }, { text: "No" }]
    );
  };

  const makeVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <Pressable
      onPress={action}
      onLongPress={() => handleLongPress(deckId, title)}
    >
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
          {data < 10 ? "0" + data : data}
        </Text>
      </Box>
    </Pressable>
  );
};
