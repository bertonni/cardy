import { DeckItem } from "@components/DeckItem";
import { FlashCard } from "@components/FlashCard";
import { Header } from "@components/Header";
import { Heading, HStack, Pressable, StatusBar, Text, View, VStack } from "native-base";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardProps, DeckProps } from "src/@types/types";

interface DecksProps {
  currentDecks?: number;
  totalDecks?: number;
}

const cards: DeckProps[] = [
  {
    title: "Animals",
    description: "Deck of Animal's names",
    data: [20, 100]
  },
  {
    title: "Food",
    description: "Deck of Food's names",
    data: [22, 100]
  },
  {
    title: "Travel",
    description: "Deck of Travel's names",
    data: [15, 100]
  },
  {
    title: "Places",
    description: "Deck of Places's names",
    data: [10, 100]
  },
  {
    title: "Objects",
    description: "Deck of Objects's names",
    data: [8, 100]
  }
];

export const Decks = ({ currentDecks = 5, totalDecks = 100 }: DecksProps) => {
  const [showCards, setShowCards] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>("Decks");
  const [headerDescription, setHeaderDescription] = useState<string>("All created decks");
  const [headerData, setHeaderData] = useState<number[]>([currentDecks, totalDecks]);
  const [cardsData, setCardsData] = useState<number[]>([20, 100]);

  const handleShowDetail = (data: number, value: string) => {
    setShowCards(true);
    setHeaderTitle(value);
    setHeaderDescription(`Decks - ${value}`);
    setHeaderData([data, 100]);
    setCardsData([data, 100])
  };
  
  const handleBack = () => {
    setShowCards(false);
    setHeaderTitle("Decks");
    setHeaderDescription("All created decks");
    setHeaderData([currentDecks, totalDecks]);
  }

  return (
    <View flex={1} bgColor="#F5F8FF" w="full">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title={headerTitle}
        data={headerData}
        description={headerDescription}
      />
      <VStack px={6}>
        {showCards ? (
          <>
            <VStack>
              <HStack justifyContent={"space-between"} alignItems="center" pt={4}>
                <Heading fontSize={"xl"} color="primary.500">
                  Created Cards
                </Heading>
                <Pressable p={1} onPress={handleBack}>
                  <Icon name="arrow-left" size={24} color={"#013099"} />
                </Pressable>
                  
              </HStack>
              <VStack space={5} mt={5}>
                <FlashCard word={"Ox"} tip={"Boi"} tag={headerTitle} />
              </VStack>
              <VStack space={1} mt={32}>
                <Heading fontSize={"xl"} color="primary.500">
                  Community Cards
                </Heading>
                <Text fontSize={"xs"} color={"primary.500"} opacity={50}>Cards with tag '{headerTitle}'</Text>
              </VStack>
            </VStack>
          </>
        ) : (
          <>
            <Heading fontSize={"xl"} pt={4} color="primary.500">
              Decks List
            </Heading>
            <VStack space={5} mt={5}>
              {cards.map(
                ({ title, description, data }, index) => (
                  <DeckItem
                    key={index}
                    data={data}
                    title={title}
                    description={description}
                    action={() => handleShowDetail(data[0], title)}
                  />
                )
              )}
            </VStack>
          </>
        )}
      </VStack>
    </View>
  );
};
