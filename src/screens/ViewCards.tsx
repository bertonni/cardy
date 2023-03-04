import { FlashCard } from "@components/FlashCard";
import { Header } from "@components/Header";
import { useDecks } from "@contexts/DecksContext";
import { Heading, StatusBar, Text, VStack, ScrollView, Box } from "native-base";
import { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";

export const ViewCards = ({ route, navigation }: any) => {
  const { currentCards } = useDecks();

  const scrollRef: any = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />
      <Header
        title={route.params.headerTitle}
        data={route.params.cardsCount}
        description={route.params.headerDescription}
      />
      <ScrollView ref={scrollRef} flex={1} bgColor="#F5F8FF" mb={8}>
        <TouchableOpacity activeOpacity={1}>
          <Heading fontSize={"xl"} py={4} mx={6} color="primary.500">
            Created Cards
          </Heading>
          <VStack px={6} pb={10}>
            {route.params.cardsCount > 0 ? (
              <VStack space={2}>
                {currentCards.map(
                  ({ id, front_message, tip, deck_id, back_message }) => (
                    <Box key={id}>
                      <FlashCard
                        // key={id}
                        cardId={id ? id : ""}
                        deckId={deck_id}
                        word={front_message}
                        tip={tip}
                        meaning={back_message}
                        tag={route.params.headerTitle}
                      />
                    </Box>
                  )
                )}
              </VStack>
            ) : (
              <Text fontSize={"xs"} color={"primary.500"} opacity={50}>
                There are no cards with tag '{route.params.headerTitle}'
              </Text>
            )}
            <VStack space={1} mt={6} mb={16}>
              <Heading fontSize={"xl"} color="primary.500">
                Community Cards
              </Heading>
              <Text fontSize={"xs"} color={"primary.500"} opacity={50}>
                Cards with tag '{route.params.headerTitle}'
              </Text>
              <Text fontSize={"xs"} mt={2} color={"primary.500"} opacity={50}>
                We didn't find any cards with tag '{route.params.headerTitle}'
              </Text>
            </VStack>
          </VStack>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
