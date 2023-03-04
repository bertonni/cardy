import { Text, VStack, HStack, Pressable, useToast, Center } from "native-base";
import React, { useState } from "react";
import { CardTag } from "./CardTag";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlashCardProps } from "src/@types/types";
import * as Speech from "expo-speech";
import { Alert, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useDecks } from "@contexts/DecksContext";
import { AlertFeedback } from "./AlertFeedback";

export const FlashCard = ({
  cardId,
  word,
  tip,
  tag,
  deckId,
  meaning
}: FlashCardProps) => {
  const toast = useToast();
  const { removeCard } = useDecks();
  const [showMeaning, setShowMeaning] = useState<boolean>(false);

  const handleRemoveCard = async () => {
    try {
      await removeCard(cardId, deckId);
      toast.show({
        title: "Success",
        placement: "top",
        render: () => (
          <AlertFeedback
            title="Success"
            message={"Card deleted successfully"}
            variant="success"
          />
        ),
      });
    } catch (error: any) {
      toast.show({
        title: "Error",
        placement: "top",
        render: () => (
          <AlertFeedback
            title="Success"
            message={"Some error ocurred"}
            variant="error"
          />
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
      justifyContent={showMeaning ? "center" : "space-between"}
      onLongPress={() => handleLongPress(word)}
      onPress={() => setShowMeaning(!showMeaning)}
      p={3}
    >
      {showMeaning ? (
        <Center>
          <Text fontSize={"lg"} color="primary.500">
            {meaning}
          </Text>
        </Center>
      ) : (
        <>
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
        </>
      )}
    </Pressable>
  );
};
