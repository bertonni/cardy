import { Text, HStack, VStack } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
  data?: number;
  description: string;
  onShare?: () => void;
}

export function Header({ title, data, description, onShare }: Props) {
  const currentDecks = data ? data : 0;

  return (
    <HStack
      w="full"
      h={36}
      bgColor="primary.500"
      alignItems="center"
      justifyContent={"space-between"}
      px={6}
      pt={8}
    >
      <VStack w={"1/2"}>
        <Icon name="cards-outline" size={25} color="white" />
        <Text color="white" fontSize="lg">
          {title}
        </Text>
        <Text color="white" opacity={60} fontSize="xs">
          {description}
        </Text>
      </VStack>
      {data? <Text color="white" fontSize="lg" textAlign="right" w={"1/2"}>
        {currentDecks < 10 ? "0" + currentDecks : currentDecks}
      </Text> :null}
    </HStack>
  );
}
