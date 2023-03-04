import { Text, Box, HStack, VStack } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

interface ReviewCardProps {
  title: string;
  showMeaning: boolean;
  showTip: boolean;
  tip: string;
  meaning: string;
}

export const ReviewCard = ({
  title,
  showTip,
  showMeaning,
  tip,
  meaning,
}: ReviewCardProps) => {
  return (
    <Box
      w="full"
      h={150}
      rounded="lg"
      alignItems={"center"}
      bgColor="white"
      justifyContent={"center"}
      position="relative"
      overflow={"hidden"}
      p={3}
    >
      <Box position={"absolute"} bottom={0} right={0}>
        <Svg width={63} height={52} fill="none" viewBox="0 0 63 52">
          <Path
            d="M112 58.9744C112 89.9165 86.9279 115 56 115C25.0721 115 0 89.9165 0 58.9744C0 28.0323 56.1842 54.9199 59.3158 0C90.2437 0 112 28.0323 112 58.9744Z"
            fill="#C8102E"
          />
        </Svg>
      </Box>
      <VStack
        flex={1}
        space={3}
        mt={4}
        alignItems="center"
        justifyContent={"center"}
      >
        <Text color={"primary.500"} fontSize={"lg"}>
          {showMeaning ? meaning : title}
        </Text>
        {!showMeaning ? (
          <HStack space={2} justifyContent="center">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                Speech.speak(title, {
                  rate: 1,
                  language: "en",
                });
              }}
              onLongPress={() => {
                Speech.speak(title, {
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
        ) : null}
        <Text fontSize={"sm"} color="primary.500" opacity={50}>
          {showTip && !showMeaning ? tip : null}
        </Text>
      </VStack>
    </Box>
  );
};
