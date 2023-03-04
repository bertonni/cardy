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
  HStack,
  ScrollView,
  StatusBar,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { FlashCardData } from "src/@types/types";
// import { createCard } from "../services/useDecks";
import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";

const schema = yup.object({
  title: yup.string().required("Insert the title"),
  tip: yup.string().required("Insert the tip"),
  tag: yup.string().notOneOf(["", "tag"]).required("Select a tag"),
  meaning: yup.string().required("Insert the meaning"),
});

export const CreateCard = ({ route, navigation }: any) => {
  const id = "test-toast";
  const [isRequestingData, setIsRequestingData] = useState<boolean>(false);
  const { user } = useAuth();
  const { createFlashCard } = useDecks();
  const methods = useForm<FlashCardData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tag: "",
      title: "",
      meaning: "",
      tip: "",
    },
  });

  const toast = useToast();

  const scrollRef: any = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    return unsubscribe;
  }, [navigation]);

  const onSubmit = async ({ meaning, tag, title, tip }: FlashCardData) => {
    setIsRequestingData(true);
    try {
      await createFlashCard(
        {
          deck_id: tag,
          front_message: title,
          back_message: meaning,
          tip,
        },
        user.access_token
      );
      // setUpdated(updated + 1);
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Success",
          placement: "top",
          render: () => (
            <AlertFeedback
              title="Success"
              message={"Card created successfully"}
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

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"#013099"}
        translucent
      />
      <Header title={"Create a Card"} description="Create your card" />
      <ScrollView flex={1} bgColor="#F5F8FF" mb={20} ref={scrollRef}>
        <VStack px={6} mb={10}>
          <Heading fontSize={"xl"} pt={4} color="primary.500">
            Front
          </Heading>
          <VStack space={1} mt={5}>
            <FormProvider {...methods}>
              <CreateCardFront
                word="Title"
                tip="Tip"
                tag="Tag"
                cardId=""
                deckId=""
                control={methods.control}
              />
            </FormProvider>
            <HStack space={2} justifyContent="space-between">
              <Text fontSize={"xs"} color="secondary.500">
                {methods.formState.errors.tag?.message}
              </Text>
              <Text fontSize={"xs"} color="secondary.500">
                {methods.formState.errors.title?.message}
              </Text>
              <Text fontSize={"xs"} color="secondary.500">
                {methods.formState.errors.tip?.message}
              </Text>
            </HStack>
          </VStack>
          <Heading fontSize={"xl"} pt={4} color="primary.500">
            Back
          </Heading>
          <VStack space={1} mt={5}>
            <CreateCardBack control={methods.control} />
            <Text fontSize={"xs"} color="secondary.500">
              {methods.formState.errors.meaning?.message}
            </Text>
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
    </>
  );
};
