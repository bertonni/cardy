import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";
import { sendReview } from "@services/useCards";
import {
  View,
  Heading,
  Box,
  Button,
  HStack,
  Text,
  useToast,
  StatusBar,
  VStack,
} from "native-base";
import { useState } from "react";
import { AlertFeedback } from "./AlertFeedback";
import { ReviewCard } from "./ReviewCard";

export const Review = () => {
  const { user } = useAuth();
  const { reviewCards, updated, setUpdated, nextReviewTime } = useDecks();
  const toast = useToast();
  const [showTip, setShowTip] = useState<boolean>(false);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const toastId = "toast-id";

  const handleReviewClick = async (rate: string) => {
    console.log('call');
    try {
      const message = await sendReview(
        reviewCards[0].id,
        user.access_token,
        rate
      );
      setShowTip(false);
      setShowMeaning(false);
      setUpdated(updated - 1);
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
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
      // setRated(rated + 1);
      // setCurrentCard(currentCard + 1);
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
        {reviewCards.length > 0 ? (
          <>
            <ReviewCard
              showTip={showTip}
              showMeaning={showMeaning}
              title={reviewCards[0].front_message}
              tip={reviewCards[0].tip}
              meaning={reviewCards[0].back_message}
            />
            <HStack space={2} my={6} w={"full"}>
              <Button
                onPress={() => setShowTip(true)}
                bgColor={"secondary.500"}
                fontSize={"xl"}
                fontWeight="bold"
                flex={1}
                isDisabled={showMeaning}
                _pressed={{
                  bg: "secondary.800",
                }}
              >
                Tip
              </Button>
              <Button
                onPress={() => setShowMeaning(!showMeaning)}
                bgColor={"secondary.500"}
                fontSize={"xl"}
                fontWeight="bold"
                flex={1}
                _pressed={{
                  bg: "secondary.800",
                }}
              >
                {showMeaning ? "Show Word" : "Show Meaning"}
              </Button>
            </HStack>
            <HStack space={2} w={"full"}>
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
          <VStack space={4}>
            <Text fontSize={"sm"} color={"primary.500"} opacity={50}>
              There are no cards to review
            </Text>
            <Text fontSize={"sm"} color={"primary.500"} opacity={50}>
              Time to next review: {nextReviewTime} seconds
            </Text>
          </VStack>
        )}
      </Box>
    </View>
  );
};
