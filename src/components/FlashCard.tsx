import { Text, Box, VStack, HStack } from 'native-base';
import React from 'react';
import { CardTag } from './CardTag';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlashCardProps } from 'src/@types/types';
import * as Speech from "expo-speech";
import { TouchableOpacity } from 'react-native';

export const FlashCard = ({ word, tip, tag }: FlashCardProps) => {
  return (
    <Box
      w="full"
      h={150}
      rounded="lg"
      flexDirection={"row"}
      bgColor="white"
      justifyContent={"space-between"}
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
      <VStack justifyContent={"space-between"}>
        <CardTag title={tag} />
        <HStack space={2}>
          {/* <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"transparent"}
          >
            <Icon name="mic" size={20} color="#CCDCFF" />
          </Box> */}
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
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              backgroundColor: "#F5F8FF",
            }}
          >
            <Icon name="record-voice-over" size={20} color="#013099" />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Box>
  );
}