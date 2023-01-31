import { Box, Input, Text } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

interface FlashCardDataBack {
  meaning: string;
}

export const CreateCardBack = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashCardDataBack>({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      w="full"
      h={150}
      rounded="lg"
      alignItems={"center"}
      bgColor="white"
      justifyContent={"center"}
      p={3}
    >
      <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              placeholder="Title"
              onChangeText={onChange}
              onBlur={onBlur}
              paddingLeft={-2}
              value={value}
              variant={"unstyled"}
              placeholderTextColor={"primary.500"}
              color={"primary.500"}
              fontSize={"lg"}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="meaning"
        />
      {/* <Text color="primary.500" fontSize={"lg"}>Meaning</Text> */}
    </Box>
  )
}
