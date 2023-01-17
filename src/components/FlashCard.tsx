import { Text, Box, VStack, HStack } from 'native-base';
import React from 'react';
import { CardTag } from './CardTag';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FlashCardProps {
  word: string;
  tip: string;
  tag: string;
}

export const FlashCard = ({ word, tip, tag }: FlashCardProps) => {
  return (
    <Box w="full" h={150} rounded="md" flexDirection={"row"} p={3}>
      <VStack justifyContent={"space-between"}>
        <Text fontSize={"lg"} color="primary.500">{word}</Text>
        <Text fontSize={"lg"} color="primary.500" opacity={50}>{tip}</Text>
      </VStack>
      <VStack justifyContent={"space-between"}>
        <CardTag title={tag} />
        <HStack space={2}>
          <Box h={30} w={30} rounded="full" bgColor={"#F5F8FF"}>
            <Icon name="mic" size={20} />
          </Box>
          <Box h={30} w={30} rounded="full" bgColor={"#F5F8FF"}>
            <Icon name="record-voice-over" size={20} />
          </Box>
        </HStack>
      </VStack>
    </Box>
  )
}