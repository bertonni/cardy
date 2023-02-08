import { Text, Box, HStack, VStack } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Svg, { Path } from "react-native-svg";

interface ReviewCardProps {
  title: string;
}

export const ReviewCard = ({ title }: ReviewCardProps) => {
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
          {title}
        </Text>
        <HStack space={2}>
          <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"#F5F8FF"}
          >
            <Icon name="record-voice-over" size={20} color="#013099" />
          </Box>
          <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"#F5F8FF"}
          >
            <Icon name="mic" size={20} color="#013099" />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
