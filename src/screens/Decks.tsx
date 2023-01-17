import { DeckItem } from "@components/DeckItem";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { Heading, StatusBar, View, VStack } from "native-base";

interface DecksProps {
  currentDecks?: number;
  totalDecks?: number;
}

export const Decks = ({ currentDecks = 5, totalDecks = 100 }: DecksProps) => {
  const { navigate } = useNavigation();

  const handleClick = () => {
    navigate("cardList");
  };

  return (
    <View flex={1} bgColor="#F5F8FF" w="full">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title="Decks"
        data={[currentDecks, totalDecks]}
        description="All created decks"
      />
      <VStack px={6}>
        <Heading fontSize={"xl"} pt={5} color="primary.500">
          Decks List
        </Heading>
        <VStack space={5} mt={5}>
          {["Animals", "Food", "Travel", "Places", "Objects"].map(
            (value, index) => (
              <DeckItem
                key={index}
                data={"20"}
                title={value}
                description="Deck description..."
                action={handleClick}
              />
            )
          )}
        </VStack>
      </VStack>
    </View>
  );
};
