import { useAuth } from "@contexts/AuthContext";
import { View, Heading, Box, Button, HStack } from "native-base";
import { ReviewCard } from "./ReviewCard";

export const Review = () => {
  const { user } = useAuth();

  return (
    <View flex={1} px={6} pt={60} bgColor="#F5F8FF">
      <Heading fontSize={"xl"} color="primary.500">
        Review Time
      </Heading>
      <Box mt={5}>
        <ReviewCard title="Avocado" />
        <HStack space={2} mt={4} w={"full"}>
          <Button
            rounded={"lg"}
            w={"1/3"}
            variant={"ghost"}
            bg={"white"}
            colorScheme="error"
          >
            Hard
          </Button>
          <Button
            rounded={"lg"}
            w={"1/3"}
            variant={"ghost"}
            bg={"white"}
            _text={{ color: "#013099" }}
          >
            Medium
          </Button>
          <Button
            rounded={"lg"}
            w={22}
            variant={"ghost"}
            bg={"white"}
            colorScheme="success"
          >
            Easy
          </Button>
        </HStack>
      </Box>
    </View>
  );
};
