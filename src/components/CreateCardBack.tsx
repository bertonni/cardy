import { Box, Text } from "native-base"

export const CreateCardBack = () => {
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
      <Text color="primary.500" fontSize={"lg"}>Meaning</Text>
    </Box>
  )
}
