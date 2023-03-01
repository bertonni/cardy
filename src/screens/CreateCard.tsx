import { CreateCardBack } from "@components/CreateCardBack";
import { CreateCardFront } from "@components/CreateCardFront";
import { AlertFeedback } from "@components/AlertFeedback";
import { Header } from "@components/Header";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  FormControl,
  Heading,
  ScrollView,
  StatusBar,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { FlashCardData } from "src/@types/types";
import { createCard } from "../services/useDecks";
import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";

const schema = yup.object({
  title: yup.string().required("Required field"),
  tip: yup.string().required("Required field"),
  tag: yup.string().required("Required field"),
  meaning: yup.string().required("Required field"),
});

export const CreateCard = () => {
  const [isRequestingData, setIsRequestingData] = useState<boolean>(false);
  const { user } = useAuth();
  const methods = useForm<FlashCardData>({
    resolver: yupResolver(schema),
  });
  
  // const onSubmit = async (data: FlashCardData) => {
  const { updated, setUpdated } = useDecks();

  const onSubmit = async ({ meaning, tag, title, tip }: FlashCardData) => {
    const id = "test-toast";
    setIsRequestingData(true);
    try {
      const response = await createCard(
        {
          deck_id: tag,
          front_message: title,
          back_message: meaning,
          tip,
        },
        user.access_token
      );
      setUpdated(updated + 1);
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Success",
          placement: "top",
          render: () => (
            <AlertFeedback
              title="Success"
              message={response}
              variant="success"
            />
          ),
        });
      }
      methods.reset();
    } catch (error: any) {
      const message = error.response.data.message;
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Error",
          placement: "top",
          render: () => (
            <AlertFeedback title="Error" message={message} variant="error" />
          ),
        });
      }
    } finally {
      setIsRequestingData(false);
    }
  };

  const toast = useToast();
  const [frontData, setFrontData] = useState<FlashCardData>(
    {} as FlashCardData
  );
  const [backData, setBackData] = useState<string>("");
  const [selectedDeck, setSelectedDeck] = useState<string>("");

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
          <FormProvider {...methods}>
            <CreateCardFront
              word="Title"
              tip="Tip"
              tag="Tag"
              control={methods.control}
              data={setFrontData}
            />
          </FormProvider>
        </VStack>
        <Heading fontSize={"xl"} pt={4} color="primary.500">
          Back
        </Heading>
        <VStack space={5} mt={5}>
          <CreateCardBack control={methods.control} />
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
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={isRequestingData}
          >
            Save
          </Button>
        </FormControl>
      </VStack>
    </ScrollView>
  );
}
