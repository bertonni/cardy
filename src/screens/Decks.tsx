import { DeckItem } from "@components/DeckItem";
import { Header } from "@components/Header";
import { useDecks } from "@contexts/DecksContext";
import { Heading, StatusBar, VStack, ScrollView } from "native-base";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const Decks = ({ route, navigation }: any) => {
  const { decks, getCurrentCards } = useDecks();
  const { navigate } = useNavigation();

  const scrollRef: any = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    return unsubscribe;
  }, [navigation]);

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
      <ScrollView ref={scrollRef} bgColor="#F5F8FF" flex={1} mb={16}>
        <TouchableOpacity activeOpacity={1}>
          <VStack px={6} pb={10}>
            <Heading fontSize={"xl"} pt={4} color="primary.500">
              Decks List
            </Heading>
            <VStack space={5} mt={5}>
              {decks.map(({ name, description, cards_count, id }) => (
                <DeckItem
                  key={id}
                  deckId={id}
                  data={cards_count}
                  title={name}
                  description={description}
                  action={() => handleShowDetail(cards_count, name, id)}
                />
              ))}
            </VStack>
          </VStack>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
