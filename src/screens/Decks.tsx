import { Header } from "@components/Header";
import { Heading, View, VStack } from "native-base";

export const Decks = () => {
  return (
    <View flex={1} px={6} bgColor="white">
      <Header
        title="Decks"
        data={["05", "100"]}
        description="All created decks"
      />
      <Heading fontSize={"xl"} pt={5} color="primary.500">
        Decks List
      </Heading>
    </View>
  );
}
