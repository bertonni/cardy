import { FlashCard } from "@components/FlashCard";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { useDecks } from "@contexts/DecksContext";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import {
  Heading,
  HStack,
  ScrollView,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import { useRef } from "react";
import { Cards } from "src/@types/types";

interface ViewCardProps {
  headerTitle: string;
  cardsCount: number;
  headerDescription: string;
  cards: Cards[];
}

export const ViewCards = ({ route, navigation }: any) => {
  const { navigate } = useNavigation();
  const { currentCards } = useDecks();

  const ref = useRef(null);

  useScrollToTop(ref);

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
      <ScrollView bgColor={"#F5F8FF"} mb={8} ref={ref}>
        <Heading fontSize={"xl"} py={4} mx={6} color="primary.500">
          Created Cards
        </Heading>
        <VStack px={6} pb={10}>
          {route.params.cardsCount > 0 ? (
            <VStack space={2}>
              {currentCards.map(({ id, front_message, tip }) => (
                <FlashCard
                  key={id}
                  word={front_message}
                  tip={tip}
                  tag={route.params.headerTitle}
                />
              ))}
            </VStack>
          ) : (
            <Text fontSize={"xs"} color={"primary.500"} opacity={50}>
              There are no cards with tag '{route.params.headerTitle}'
            </Text>
          )}
          <VStack space={1} my={12}>
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
      </ScrollView>
    </>
  );
};
