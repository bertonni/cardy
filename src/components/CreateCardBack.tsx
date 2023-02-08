import { Box, Center, Input, Text } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FlashCardBackProps } from "src/@types/types";
import Svg, { Path } from "react-native-svg";

const schema = yup.object({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

interface FlashCardDataBack {
  meaning: string;
}

export const CreateCardBack = ({ data }: FlashCardBackProps) => {
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
      position={"relative"}
    >
      <Box position={"absolute"} top={0} left={0}>
        <Svg width={54} height={60} fill="none" viewBox="0 0 54 60">
          <Path
            d="M54 1C2.5 5.85197 13.1727 37.6809 2.5 60C-25.9427 60 -49 33.5848 -49 1C-49 -31.5848 -25.9427 -58 2.5 -58C30.9427 -58 54 -31.5848 54 1Z"
            fill="#013099"
          />
        </Svg>
      </Box>
      <Box position={"absolute"} bottom={0} right={0}>
        <Svg width={63} height={52} fill="none" viewBox="0 0 63 52">
          <Path
            d="M112 58.9744C112 89.9165 86.9279 115 56 115C25.0721 115 0 89.9165 0 58.9744C0 28.0323 56.1842 54.9199 59.3158 0C90.2437 0 112 28.0323 112 58.9744Z"
            fill="#C8102E"
          />
        </Svg>
      </Box>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Meaning"
            onChangeText={onChange}
            onBlur={onBlur}
            isFullWidth
            textAlign="center"
            paddingLeft={-2}
            value={value}
            variant={"unstyled"}
            placeholderTextColor={"primary.500"}
            color={"primary.500"}
            fontSize={"lg"}
            _focus={{ borderColor: "primary.500" }}
            alignSelf="center"
          />
        )}
        name="meaning"
      />

      {/* <Text color="primary.500" fontSize={"lg"}>Meaning</Text> */}
    </Box>
  );
};
