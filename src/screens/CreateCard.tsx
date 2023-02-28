import { CreateCardBack } from "@components/CreateCardBack";
import { CreateCardFront } from "@components/CreateCardFront";
import { AlertFeedback } from "@components/AlertFeedback";
import { Header } from "@components/Header";
import { useForm } from "react-hook-form";
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

const schema = yup.object({
  title: yup.string().required("Required field"),
  tip: yup.string().required("Required field"),
  tag: yup.string().required("Required field"),
  meaning: yup.string().required("Required field"),
});

export const CreateCard = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashCardData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FlashCardData) => {
    console.log('err', errors);
    toast.show({
      title: "Error",
      placement: "top",
      render: () => (
        <AlertFeedback
          title="Error"
          message={"You must fill in all fields"}
          variant="error"
        />
      ),
    });
    console.log(data);
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
          <CreateCardFront
            word="Title"
            tip="Tip"
            tag="Tag"
            control={control}
            data={setFrontData}
          />
        </VStack>
        <Heading fontSize={"xl"} pt={4} color="primary.500">
          Back
        </Heading>
        <VStack space={5} mt={5}>
          <CreateCardBack control={control} />
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
            onPress={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </FormControl>
      </VStack>
    </ScrollView>
  );
};
