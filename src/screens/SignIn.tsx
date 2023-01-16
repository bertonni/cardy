import {
  View,
  Text,
  Box,
  HStack,
  VStack,
  FormControl,
  Input,
  Pressable,
  StatusBar,
  Button,
} from "native-base";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "@contexts/AuthContext";
import { useState } from 'react';

export const SignIn = () => {

  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [name, setName] = useState<string>("");

  const handleSignIn: any = () => {
    if (name.trim().length === 0) return alert("Preencha o nome");
    signIn(name);
    navigate("main");
  };

  return (
    <View flex={1} alignItems="center" pt={32}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Box>
        <Pressable onPress={() => navigate("landing")}>
          <Svg width={68} height={75} fill="none" viewBox="0 0 68 75">
            <Path
              d="M0 29.9832C0 24.1764 1.25422 19.0117 3.76265 14.4891C6.27108 9.91067 9.75501 6.36516 14.2144 3.8526C18.7296 1.2842 23.8301 0 29.5159 0C36.4837 0 42.4482 1.84255 47.4093 5.52764C52.3705 9.21273 55.6872 14.2379 57.3595 20.603H41.6399C40.4694 18.1463 38.7971 16.2758 36.6231 14.9916C34.5049 13.7074 32.08 13.0653 29.3486 13.0653C24.945 13.0653 21.3774 14.6008 18.646 17.6717C15.9146 20.7426 14.5489 24.8465 14.5489 29.9832C14.5489 35.12 15.9146 39.2239 18.646 42.2948C21.3774 45.3657 24.945 46.9012 29.3486 46.9012C32.08 46.9012 34.5049 46.2591 36.6231 44.9749C38.7971 43.6907 40.4694 41.8202 41.6399 39.3635H57.3595C55.6872 45.7286 52.3705 50.7538 47.4093 54.4389C42.4482 58.0681 36.4837 59.8827 29.5159 59.8827C23.8301 59.8827 18.7296 58.6265 14.2144 56.1139C9.75501 53.5455 6.27108 50 3.76265 45.4774C1.25422 40.9548 0 35.7901 0 29.9832Z"
              fill="#013099"
            />
            <Path
              d="M68 26.7504L47.5145 75H36.7449L44.2368 58.3501L30.9505 26.7504H42.1297L49.6801 47.2111L57.1719 26.7504H68Z"
              fill="#C8102E"
            />
          </Svg>
        </Pressable>
      </Box>
      <VStack w="3/4" mt={6}>
        <FormControl>
          <FormControl.Label color={"black"}>E-mail</FormControl.Label>
          <Input
            isFullWidth
            onChangeText={setName}
            placeholder="your email here"
            _focus={{ borderColor: "primary.500" }}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            isFullWidth
            type="password"
            placeholder="your email here"
            _focus={{ borderColor: "primary.500" }}
          />
        </FormControl>
        <FormControl mt={6} alignItems="center">
          <Button
            onPress={handleSignIn}
            bgColor={"secondary.500"}
            fontSize={"xl"}
            fontWeight="bold"
            w="full"
            _pressed={{
              bg: "secondary.800",
            }}
          >
            Sign In
          </Button>
        </FormControl>
      </VStack>
      <HStack space={1} justifyContent="center" mt={6}>
        <Text color="primary.500">Doesn't have an account?</Text>
        <Pressable onPress={() => navigate("signup")}>
          <Text color="secondary.500">Signup</Text>
        </Pressable>
      </HStack>
    </View>
  );
};
