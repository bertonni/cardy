import { Header } from "@components/Header";
import { Heading, StatusBar, View, VStack } from "native-base";

export const Decks = () => {
  return (
    <View flex={1} bgColor="white">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title="Decks"
        data={[5, 100]}
        description="All created decks"
      />
      <VStack px={6}>
        <Heading fontSize={"xl"} pt={5} color="primary.500">
          Decks List
        </Heading>
      </VStack>
    </View>
  );
}
