import { Box, CheckIcon, HStack, Input, Select, VStack } from "native-base";
import { FlashCardProps } from "src/@types/types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Controller, useFormContext } from "react-hook-form";
import { useDecks } from "@contexts/DecksContext";
import { TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { useState } from "react";

export const CreateCardFront = ({
  word,
  tip,
  tag,
  data,
  control,
}: FlashCardProps) => {
  const { decks } = useDecks();
  const { getValues } = useFormContext();
  const { title } = getValues();
  const [test, setTest] = useState<string>(title);

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
      <VStack justifyContent={"space-between"} width="1/2" flexGrow={1}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              isFullWidth
              placeholder={word}
              onChangeText={(value) => {
                onChange(value);
                setTest(value);
              }}
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
              placeholder={tip}
              onChangeText={onChange}
              onBlur={onBlur}
              paddingLeft={-2}
              value={value}
              variant={"unstyled"}
              placeholderTextColor={"primary.500"}
              color={"primary.500"}
              opacity={50}
              fontSize={"sm"}
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
                placeholder={"Tag"}
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
                {decks.map(({ id, name }) => (
                  <Select.Item key={id} label={name} value={id} />
                ))}
              </Select>
            )}
            name="tag"
          />
        </Box>
        <HStack space={2}>
          <Box
            h={30}
            w={30}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bgColor={"transparent"}
          >
            {/* <Icon name="mic" size={20} color="#CCDCFF" /> */}
          </Box>
          <TouchableOpacity
            disabled={!title}
            activeOpacity={0.5}
            onPress={() => {
              Speech.speak(title, {
                rate: 1,
                language: "en",
              });
            }}
            onLongPress={() => {
              Speech.speak(title, {
                rate: 0.5,
                language: "en",
              });
            }}
            style={{
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              backgroundColor: "#F5F8FF",
            }}
          >
            <Icon
              name="record-voice-over"
              size={20}
              color={"#013099"}
            />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Box>
  );
};
