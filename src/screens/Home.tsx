import { Card } from "@components/Card";
import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  HStack,
  Heading,
  ScrollView,
  Button,
  Pressable,
  StatusBar,
} from "native-base";

export const Home = () => {
  const { user, signOut } = useAuth();
  const { userStats, totalCards, decks } = useDecks();
  const { navigate } = useNavigation();

  return (
    <View flex={1} px={6} pt={60} bgColor="white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <HStack justifyContent={"space-between"} alignItems="flex-end">
        <Heading fontSize={"xl"} color="primary.500">
          Hello, {user.name}
        </Heading>
        <Pressable
          onPress={() => {
            signOut();
          }}
        >
          <Heading fontSize={"md"} color="secondary.500">
            Sign out
          </Heading>
        </Pressable>
      </HStack>
      <HStack space={2} mt={5}>
        <Card
          data={[userStats.studied_cards_count, userStats.cards_count]}
          title="Studied Cards"
        />
        <Card data={decks.length} title="Decks" color="secondary" />
      </HStack>
      <Text color="primary.500" my={5} fontWeight="semibold" fontSize={16}>
        Community Decks
      </Text>
      <ScrollView
        horizontal={true}
        style={{
          width: "100%",
        }}
        maxHeight={25}
        flex={1}
        showsHorizontalScrollIndicator={false}
      >
        {decks.map(({ id, name, cards_count }) => (
          <Card
            data={cards_count}
            title={name}
            deckId={id}
            key={id}
            customStyle={{
              width: 160,
              marginRight: 8,
            }}
          />
        ))}
      </ScrollView>
      <Button
        onPress={() => navigate("review")}
        bgColor={"secondary.500"}
        fontSize={"xl"}
        fontWeight="bold"
        w={"32"}
        _pressed={{
          bg: "secondary.800",
        }}
        mt={6}
        isDisabled={userStats.cards_count === 0}
      >
        Start Review
      </Button>
    </View>
  );
};
