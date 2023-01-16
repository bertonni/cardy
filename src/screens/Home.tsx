import { Card } from "@components/Card";
import { useAuth } from "@contexts/AuthContext";
import {
  View,
  Text,
  HStack,
  Heading,
} from "native-base";

export const Home = () => {
  const { user } = useAuth();
  return (
    <View flex={1} px={6} pt={60}>
      <Heading fontSize={"xl"} color="primary.500">
        Hello, {user.name}
      </Heading>
      <HStack space={2} mt={5}>
        <Card data="29/100" title="Studied Cards" />
        <Card data="20" title="Decks" color="secondary" />
      </HStack>
      <Text color="primary.500" my={5} fontWeight="semibold" fontSize={16}>Community Decks</Text>
      <HStack space={2} overflowX="auto">
        <Card data="20" title="Animals" />
        <Card data="20" title="Food" />
        <Card data="20" title="Code" />
        <Card data="20" title="Code" />
        <Card data="20" title="Code" />
      </HStack>
      <Text color="primary.500" my={5} fontWeight="semibold" fontSize={16}>Report Area</Text>
    </View>
  );
};
