import { AlertFeedback } from "@components/AlertFeedback";
import { Header } from "@components/Header";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Pressable,
  StatusBar,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { CreateDeckProps } from "src/@types/types";
import { useAuth } from "@contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { createDeck } from "@services/useDecks";

const schema = yup.object({
  name: yup.string().required("Insert the name"),
  description: yup.string().required("Insert the description"),
});

export const CreateDeck = () => {
  const id = "test-toast";
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const [isRequestingData, setIsRequestingData] = useState<boolean>(false);
  const toast = useToast();
  const methods = useForm<CreateDeckProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async ({ name, description }: CreateDeckProps) => {

    try {
      await createDeck(
        {
          name,
          description,
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
              message={"Deck created successfully"}
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
      <Header title={"Create a Deck"} description="Create a new Deck" />
      <VStack w="full" flex={1} px={6} bgColor="white">
        <FormControl.Label _text={{ color: "primary.500" }} mt={4}>Name</FormControl.Label>
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              placeholder="Enter the deck's name"
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color={"primary.500"}
              backgroundColor="#F5F8FF"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="name"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {methods.formState.errors.name?.message}
        </Text>
        <FormControl.Label _text={{ color: "primary.500" }}>Description</FormControl.Label>
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              placeholder="Enter the deck's description"
              onChangeText={onChange}
              borderWidth={0}
              placeholderTextColor={"#728ABE"}
              color={"primary.500"}
              backgroundColor="#F5F8FF"
              onBlur={onBlur}
              value={value}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="description"
        />
        <Text textAlign={"right"} color="rose.500" fontSize={"xs"}>
          {methods.formState.errors.description?.message}
        </Text>
        <FormControl mt={6} alignItems="center">
          <Button
            onPress={methods.handleSubmit(onSubmit)}
            bgColor={"secondary.500"}
            fontSize={"xl"}
            fontWeight="bold"
            w="full"
            _pressed={{
              bg: "secondary.800",
            }}
            isLoading={isRequestingData}
          >
            Save
          </Button>
        </FormControl>
      </VStack>
    </>
  );
};
