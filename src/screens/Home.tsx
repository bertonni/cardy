import { Card } from "@components/Card";
import { useAuth } from "@contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  HStack,
  Heading,
  ScrollView,
  Box,
  Button,
  Pressable,
  StatusBar,
} from "native-base";
const cards = [
  {
    data: 20,
    title: "Animals",
  },
  {
    data: 20,
    title: "Code",
  },
  {
    data: 20,
    title: "Food",
  }
];

export const Home = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  return (
    <View flex={1} px={6} pt={60} bgColor="white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <HStack justifyContent={"space-between"}>
        <Heading fontSize={"xl"} color="primary.500">
          Hello, {user.name}
        </Heading>
        <Pressable
          onPress={() => {
            signOut();
            navigate("signin");
          }}
        >
          <Heading fontSize={"xl"} color="secondary.500">
            Sign out
          </Heading>
        </Pressable>
      </HStack>
      <HStack space={2} mt={5}>
        <Card data={[29, 100]} title="Studied Cards" />
        <Card data="20" title="Decks" color="secondary" />
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
        {cards.map((card, index) => (
          <Card
            data={card.data}
            title={card.title}
            key={index}
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
      >
        Start Review
      </Button>
    </View>
  );
};
