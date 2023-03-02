import { DeckItem } from "@components/DeckItem";
import { FlashCard } from "@components/FlashCard";
import { Header } from "@components/Header";
import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";
import {
  Heading,
  HStack,
  Pressable,
  StatusBar,
  Text,
  ScrollView,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardProps, Cards, DeckProps } from "src/@types/types";
import { getCards } from "../services/useDecks";

interface DecksProps {
  currentDecks?: number;
  totalDecks?: number;
}

const cards: DeckProps[] = [
  {
    title: "Animals",
    description: "Deck of Animal's names",
    data: 20,
  },
  {
    title: "Food",
    description: "Deck of Food's names",
    data: 22,
  },
  {
    title: "Travel",
    description: "Deck of Travel's names",
    data: 15,
  },
  {
    title: "Places",
    description: "Deck of Places's names",
    data: 10,
  },
  {
    title: "Objects",
    description: "Deck of Objects's names",
    data: 8,
  },
];

export const Decks = ({ route, navigation }: any) => {

  const { decks } = useDecks();
  const { user } = useAuth();
  const [showCards, setShowCards] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>("Decks");
  const [headerDescription, setHeaderDescription] =
    useState<string>("All created decks");
  const [currentDeckId, setCurrentDeckId] = useState<string>("");
  const [currentCards, setCurrentCards] = useState<Cards[]>([]);
  const [tag, setTag] = useState<string>("");
  
  useEffect(() => {
    const getAllCards = async (deckId: string) => {
      setShowCards(false);
      const cards = await getCards(deckId, user.access_token);

      setCurrentCards(cards);
      setShowCards(true);
    };
    if (currentDeckId !== "") getAllCards(currentDeckId);
  }, [currentDeckId]);
  
  // if (route.params) {
  //   setTag(route.params);
  //   setShowCards(true);
  // }

  const handleShowDetail = (data: number, value: string, deckId: string) => {
    setShowCards(true);
    setCurrentDeckId(deckId);
    setHeaderTitle(value);
    setHeaderDescription(`Decks - ${value}`);
  };

  const handleBack = () => {
    setShowCards(false);
    setHeaderTitle("Decks");
    setHeaderDescription("All created decks");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#F5F8FF",
        flex: 1,
        paddingBottom: 16,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title={headerTitle}
        data={showCards ? currentCards.length : decks.length}
        description={headerDescription}
      />
      <ScrollView>
        <VStack px={6} pb={10}>
          {showCards ? (
            <>
              <VStack>
                <HStack
                  justifyContent={"space-between"}
                  alignItems="center"
                  pt={4}
                >
                  <Heading fontSize={"xl"} color="primary.500">
                    Created Cards
                  </Heading>
                  <Pressable p={1} onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color={"#013099"} />
                  </Pressable>
                </HStack>
                <VStack space={5} mt={5}>
                  {currentCards.length > 0 ? (
                    currentCards.map(({ id, front_message, tip }) => (
                      <FlashCard
                        key={id}
                        word={front_message}
                        tip={tip}
                        tag={headerTitle}
                      />
                    ))
                  ) : (
                    <Text fontSize={"xs"} color={"primary.500"} opacity={50}>
                      There are no cards with tag '{headerTitle}'
                    </Text>
                  )}
                </VStack>
                <VStack space={1} my={12}>
                  <Heading fontSize={"xl"} color="primary.500">
                    Community Cards
                  </Heading>
                  <Text fontSize={"xs"} color={"primary.500"} opacity={50}>
                    Cards with tag '{headerTitle}'
                  </Text>
                  <Text
                    fontSize={"xs"}
                    mt={2}
                    color={"primary.500"}
                    opacity={50}
                  >
                    We didn't find any cards with tag '{headerTitle}'
                  </Text>
                </VStack>
              </VStack>
            </>
          ) : (
            <>
              <Heading fontSize={"xl"} pt={4} color="primary.500">
                Decks List
              </Heading>
              <VStack space={5} mt={5}>
                {decks.map(({ name, description, cards_count, id }) => (
                  <DeckItem
                    key={id}
                    data={cards_count}
                    title={name}
                    description={description}
                    action={() => handleShowDetail(cards_count, name, id)}
                  />
                ))}
              </VStack>
            </>
          )}
        </VStack>
      </ScrollView>
    </ScrollView>
  );
};
