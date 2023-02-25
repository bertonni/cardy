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
} from "native-base";

export const Home = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  return (
    <View flex={1} px={6} pt={60} bgColor="white">
      <Heading fontSize={"xl"} color="primary.500">
        Hello, {user.name}
      </Heading>
      <HStack space={2} mt={5}>
        <Card data="29" title="Studied Cards" />
        <Card data="20" title="Decks" color="secondary" />
      </HStack>
      <Text color="primary.500" my={5} fontWeight="semibold" fontSize={16}>
        Community Decks
      </Text>
      <ScrollView
        // horizontal={true}
        maxHeight={25}
        w={"full"}
        showsHorizontalScrollIndicator={false}
      >
        <Card data="20" title="Animals" />
        <Card data="20" title="Code" />
        <Card data="20" title="Food" />
        <Card data="20" title="Animals" />
        <Card data="20" title="Animals" />
        <Card data="20" title="Animals" />
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
