import { useAuth } from "@contexts/AuthContext";
import { useDecks } from "@contexts/DecksContext";
import { sendReview } from "@services/useCards";
import {
  // View,
  Heading,
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useToast,
  StatusBar,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { AlertFeedback } from "./AlertFeedback";
import { ReviewCard } from "./ReviewCard";
import CountDown from "react-native-countdown-fixed";
import { RefreshControl, ScrollView } from "react-native";

export const Review = () => {
  const { user } = useAuth();
  const { reviewCards, updated, setUpdated, nextReviewTime, updateScreen, setUpdateScreen } = useDecks();
  const toast = useToast();
  const [showTip, setShowTip] = useState<boolean>(false);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [isRequestingData, setIsRequestingData] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const toastId = "toast-id";

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setUpdateScreen(!updateScreen);
      setUpdated(updated - 1);
    }, 2000);
  }, []);

  useEffect(() => {
    setTest(true);
  }, []);

  if (!test) return;

  const handleReviewClick = async (rate: string) => {
    setIsRequestingData(true);
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
    } finally {
      setIsRequestingData(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        backgroundColor: "#F5F8FF",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
                isDisabled={isRequestingData}
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
                isDisabled={isRequestingData}
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
                isDisabled={isRequestingData}
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
                setUpdated(updated + 1);
              }}
            />
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
};
