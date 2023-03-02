import { DeckItem } from "@components/DeckItem";
import { Header } from "@components/Header";
import { useDecks } from "@contexts/DecksContext";
import { Heading, StatusBar, ScrollView, VStack } from "native-base";
import { useRef } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";

export const Decks = () => {
  const { decks, getCurrentCards } = useDecks();
  const { navigate } = useNavigation();

  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const handleShowDetail = (
    cardsCount: number,
    title: string,
    deckId: string
  ) => {
    getCurrentCards(deckId);
    navigate("viewCard", {
      headerTitle: title,
      headerDescription: `Decks - ${title}`,
      cardsCount,
    });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
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
          title={"Decks"}
          data={decks.length}
          description={"All created decks"}
        />
        <VStack px={6} pb={10}>
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
        </VStack>
      </ScrollView>
    </>
  );
};
