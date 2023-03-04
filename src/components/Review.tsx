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
  VStack,
  useToast,
  StatusBar,
} from "native-base";
import { useEffect, useState } from "react";
import { AlertFeedback } from "./AlertFeedback";
import { ReviewCard } from "./ReviewCard";
import CountDown from "react-native-countdown-fixed";

export const Review = () => {
  const { user } = useAuth();
  const { reviewCards, updated, setUpdated, nextReviewTime } = useDecks();
  const toast = useToast();
  const [showTip, setShowTip] = useState<boolean>(false);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const toastId = "toast-id";

  useEffect(() => {    
  }, []);

  const handleReviewClick = async (rate: string) => {
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
          <VStack space={4} alignItems="flex-start">
            <Text fontSize={"sm"} color={"primary.500"} opacity={50}>
              There are no cards to review
            </Text>
            
            <Text fontWeight={"bold"} fontSize={"2xl"} color="primary.500">
              Next Review in:
            </Text>
            <CountDown
              until={nextReviewTime}
              running={true}
              size={28}
              digitStyle={{
                backgroundColor: "white",
              }}
              digitTxtStyle={{
                color: "#013099",
              }}
              timeLabelStyle={{
                color: "#013099",
              }}
              onFinish={() => {
                setUpdated(updated + 1)
              }}
              
            />
          </VStack>
        )}
      </Box>
    </View>
  );
};
