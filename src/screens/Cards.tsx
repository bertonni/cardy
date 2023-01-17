import { FlashCard } from "@components/FlashCard";
import { Header } from "@components/Header";
import { Heading, StatusBar, View, VStack } from "native-base";

interface CardProps {
  currentCards?: number;
  totalCards?: number;
}

export const Cards = ({ currentCards = 20, totalCards = 100 }: CardProps) => {

  return (
    <View flex={1} bgColor="#F5F8FF">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title="Animals Cards"
        data={[currentCards, totalCards]}
        description="Deck - Animals"
      />
      <VStack px={6}>
        <Heading fontSize={"xl"} pt={5} color="primary.500">
          Created Cards
        </Heading>
        <VStack space={5} mt={5}>
          <FlashCard word={"Ox"} tip={"Boi"} tag="Animals" />
          <FlashCard word={"Duck"} tip={"Pato"} tag="Animals" />
        </VStack>
      </VStack>
    </View>
  )
}
