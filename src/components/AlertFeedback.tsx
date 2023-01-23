import { Alert, VStack, HStack, Heading, IconButton, Box } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface AlertFeedbackProps {
  title: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
}

export const AlertFeedback = ({
  title,
  message,
  variant = "info",
}: AlertFeedbackProps) => {

  const iconName: string =
    variant === "info"
      ? "information"
      : variant === "success"
      ? "check-circle"
      : variant === "error"
      ? "close-circle"
      : "alert";

  const iconColor: string =
    variant === "info"
      ? "#0891B2"
      : variant === "success"
      ? "#059669"
      : variant === "error"
      ? "#DB2777"
      : "#EA580C";

  return (
    <Alert shadow={2} w="full" colorScheme={variant}>
      <VStack flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <IconButton
              variant="unstyled"
              icon={<Icon name={iconName} size={20} color={iconColor} />}
            />
            <Heading fontSize="md" fontWeight="medium" color="coolGray.800">
              {title}
            </Heading>
          </HStack>
        </HStack>
        <Box
          pl={2}
          _text={{
            color: "coolGray.600",
          }}
        >
          {message}
        </Box>
      </VStack>
    </Alert>
  );
};
