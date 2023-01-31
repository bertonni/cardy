import {
  Box,
  CheckIcon,
  HStack,
  Input,
  Select,
  VStack,
} from "native-base";
import { FlashCardProps } from "src/@types/types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

interface FlashCardData {
  title: string;
  tip: string;
  tag: string;
}

export const CreateCardFront = ({ word, tip, tag }: FlashCardProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashCardData>({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      w="full"
      h={150}
      rounded="lg"
      flexDirection={"row"}
      bgColor="white"
      justifyContent={"space-between"}
      p={3}
    >
      <VStack justifyContent={"space-between"} width="1/2">
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
          name="title"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              placeholder="Tip"
              onChangeText={onChange}
              onBlur={onBlur}
              paddingLeft={-2}
              value={value}
              variant={"unstyled"}
              placeholderTextColor={"primary.500"}
              color={"primary.500"}
              opacity={50}
              fontSize={"lg"}
              _focus={{ borderColor: "primary.500" }}
            />
          )}
          name="tip"
        />
      </VStack>
      <VStack justifyContent={"space-between"}>
        <Box
          p={1}
          rounded="md"
          bgColor="primary.100"
          display={"flex"}
          alignItems={"center"}
          opacity={50}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                w="full"
                selectedValue={value}
                dropdownIcon={<></>}
                accessibilityLabel="Tag"
                placeholder="Tag"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size={5} />,
                }}
                fontSize={10}
                color={"primary.500"}
                variant={"unstyled"}
                textAlign="center"
                mt={1}
                h={4}
                p={-1}
                onValueChange={onChange}
              >
                <Select.Item label="Animals" value="animals" />
                <Select.Item label="Places" value="places" />
                <Select.Item label="Objects" value="objects" />
                <Select.Item label="Food" value="food" />
                <Select.Item label="Travel" value="travel" />
              </Select>
            )}
            name="tag"
          />
          {/* <Text textAlign={"center"} color={"primary.500"} fontSize={10}>
            {title}
          </Text> */}
        </Box>
        <HStack space={2}>
          <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"#F5F8FF"}
          >
            <Icon name="record-voice-over" size={20} color="#013099" />
          </Box>
          <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"#F5F8FF"}
          >
            <Icon name="mic" size={20} color="#013099" />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
