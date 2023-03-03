import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";
import { View, Heading, Box, Button, HStack, Text, useToast, StatusBar } from "native-base";
import { useState } from "react";
import { sendReview } from "../services/useDecks";
import { AlertFeedback } from "./AlertFeedback";
import { ReviewCard } from "./ReviewCard";

export const Review = () => {
  const { user } = useAuth();
  const { reviewCards, setRated, rated } = useDecks();
  const toast = useToast();
  const [currentCard, setCurrentCard] = useState<number>(0);

  const handleReviewClick = async (rate: string) => {
    const id = "test-toast";

    try {
      const message = await sendReview(
        reviewCards[currentCard].id,
        user.access_token,
        rate
      );
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Success",
          placement: "top",
          render: () => (
            <AlertFeedback
              title="Success"
              message={message}
              variant="success"
            />
          ),
        });
      }
      setRated(rated + 1);
      setCurrentCard(currentCard + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1} px={6} pt={60} bgColor="#F5F8FF">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Heading fontSize={"xl"} color="primary.500">
        Review Time
      </Heading>
      <Box mt={5}>
        {reviewCards.length > 0 && currentCard < reviewCards.length ? (
          <>
            <ReviewCard title={reviewCards[currentCard].front_message} />
            <HStack space={2} mt={4} w={"full"}>
              <Button
                rounded={"lg"}
                w={"1/3"}
                variant={"ghost"}
                bg={"white"}
                colorScheme="error"
                onPress={() => handleReviewClick("hard")}
              >
                Hard
              </Button>
              <Button
                rounded={"lg"}
                w={"1/3"}
                variant={"ghost"}
                bg={"white"}
                _text={{ color: "#013099" }}
                onPress={() => handleReviewClick("medium")}
              >
                Medium
              </Button>
              <Button
                rounded={"lg"}
                w={22}
                variant={"ghost"}
                bg={"white"}
                colorScheme="success"
                onPress={() => handleReviewClick("easy")}
              >
                Easy
              </Button>
            </HStack>
          </>
        ) : (
          <Text fontSize={"sm"} color={"primary.500"} opacity={50}>
            There are no cards to review
          </Text>
        )}
      </Box>
    </View>
  );
};
