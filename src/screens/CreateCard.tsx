import { CreateCardBack } from "@components/CreateCardBack";
import { CreateCardFront } from "@components/CreateCardFront";
import { Header } from "@components/Header";
import {
  Button,
  FormControl,
  Heading,
  ScrollView,
  StatusBar,
  VStack,
} from "native-base";

export const CreateCard = () => {
  return (
    <ScrollView flex={1} bgColor="#F5F8FF" mb={20}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"#013099"}
        translucent
      />
      <Header title={"Create a Card"} description="Create your card" />
      <VStack px={6} mb={10}>
        <Heading fontSize={"xl"} pt={4} color="primary.500">
          Front
        </Heading>
        <VStack space={5} mt={5}>
          <CreateCardFront word="Title" tip="Tip" tag="Tag" />
        </VStack>
        <Heading fontSize={"xl"} pt={4} color="primary.500">
          Back
        </Heading>
        <VStack space={5} mt={5}>
          <CreateCardBack />
        </VStack>
        <FormControl mt={6} alignItems="center">
          <Button
            bgColor={"secondary.500"}
            fontSize={"xl"}
            fontWeight="bold"
            rounded={"md"}
            w="full"
            _pressed={{
              bg: "secondary.800",
            }}
          >
            Save
          </Button>
        </FormControl>
      </VStack>
    </ScrollView>
  );
};
