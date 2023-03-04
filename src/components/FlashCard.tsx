import { Text, Box, VStack, HStack, Pressable, useToast } from "native-base";
import React from "react";
import { CardTag } from "./CardTag";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlashCardProps } from "src/@types/types";
import * as Speech from "expo-speech";
import { Alert, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useAuth } from "@contexts/AuthContext";
import { deleteCard } from "@services/useCards";
import { useDecks } from "@contexts/DecksContext";
import { AlertFeedback } from "./AlertFeedback";

export const FlashCard = ({ cardId, word, tip, tag, deckId }: FlashCardProps) => {
  const { user } = useAuth();
  const toast = useToast();
  const { removeCard } = useDecks();

  const handleRemoveCard = async () => {
    try {
      await removeCard(cardId, deckId);
      toast.show({
        title: "Success",
        placement: "top",
        render: () => (
          <AlertFeedback title="Success" message={"Card deleted successfully"} variant="success" />
        ),
      });
    } catch (error: any) {
      toast.show({
        title: "Error",
        placement: "top",
        render: () => (
          <AlertFeedback title="Success" message={"Some error ocurred"} variant="error" />
        ),
      });
    }
  };

  const handleLongPress = (title: string) => {
    makeVibration();
    return Alert.alert(
      `Delete card ${title}?`,
      "Are you sure you want to delete this card? This action can't be undone.",
      [{ text: "Yes", onPress: () => handleRemoveCard() }, { text: "No" }]
    );
  };

  const makeVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <Pressable
      w="full"
      h={150}
      rounded="lg"
      flexDirection={"row"}
      bgColor="white"
      justifyContent={"space-between"}
      onLongPress={() => handleLongPress(word)}
      p={3}
    >
      <VStack justifyContent={"space-between"}>
        <Text fontSize={"lg"} color="primary.500">
          {word}
        </Text>
        <Text fontSize={"sm"} color="primary.500" opacity={50}>
          {tip}
        </Text>
      </VStack>
      <VStack display={"flex"} justifyContent={"space-between"}>
        <CardTag title={tag} />
        <HStack space={2} justifyContent="flex-end">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Speech.speak(word, {
                rate: 1,
                language: "en",
              });
            }}
            onLongPress={() => {
              Speech.speak(word, {
                rate: 0.5,
                language: "en",
              });
            }}
            style={{
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              backgroundColor: "#F5F8FF",
            }}
          >
            <Icon name="record-voice-over" size={20} color="#013099" />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Pressable>
  );
};
