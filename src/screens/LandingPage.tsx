import React from "react";
import { Text, View, Heading, Button, StatusBar, Box } from "native-base";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@contexts/AuthContext";

export const LandingPage = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  return (
    <ImageBackground
      source={require("@assets/main-bg.png")}
      style={{ flex: 1, justifyContent: "center" }}
      blurRadius={0}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(1, 48, 153, 0.5)", "rgba(1, 33, 105, 0.5)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      <View flex={1} justifyContent="space-between" px={30}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Box alignSelf={"center"} mt={16}>
          <Svg width={40} height={44} fill="none" viewBox="0 0 40 44">
            <Path
              d="M0 17.5902C0 14.1835 0.737774 11.1535 2.21332 8.50028C3.68887 5.81426 5.73824 3.73423 8.36144 2.26019C11.0174 0.753397 14.0177 0 17.3623 0C21.461 0 24.9695 1.08096 27.8878 3.24288C30.8062 5.4048 32.7572 8.35288 33.7409 12.0871H24.4941C23.8055 10.6458 22.8218 9.54848 21.543 8.79509C20.297 8.04169 18.8706 7.66499 17.2639 7.66499C14.6735 7.66499 12.5749 8.56579 10.9682 10.3674C9.36153 12.169 8.55818 14.5766 8.55818 17.5902C8.55818 20.6038 9.36153 23.0114 10.9682 24.813C12.5749 26.6146 14.6735 27.5154 17.2639 27.5154C18.8706 27.5154 20.297 27.1387 21.543 26.3853C22.8218 25.6319 23.8055 24.5345 24.4941 23.0932H33.7409C32.7572 26.8275 30.8062 29.7755 27.8878 31.9375C24.9695 34.0666 21.461 35.1312 17.3623 35.1312C14.0177 35.1312 11.0174 34.3942 8.36144 32.9202C5.73824 31.4134 3.68887 29.3333 2.21332 26.6801C0.737774 24.0268 0 20.9968 0 17.5902Z"
              fill="white"
            />
            <Path
              d="M40 15.6936L27.9497 44H21.6147L26.0216 34.232L18.2062 15.6936H24.7822L29.2236 27.6972L33.6306 15.6936H40Z"
              fill="#C8102E"
            />
          </Svg>
        </Box>
        <Box>
          <Heading
            fontFamily={"heading"}
            color="white"
            fontSize={"5xl"}
            zIndex={50}
          >
            Cardy.
          </Heading>
          <Text fontSize={"2xl"} mb={8} color="white">
            Learning a language {"\n"}never been so easy
          </Text>
          <Button
            mb={"16"}
            bgColor={"secondary.500"}
            w={"32"}
            fontSize={"xl"}
            fontWeight="bold"
            _pressed={{
              bg: "secondary.800",
            }}
            onPress={() => {
              if (user.email) navigate("home");
              else navigate("signin");
            }}
          >
            Get Started
          </Button>
        </Box>
      </View>
    </ImageBackground>
  );
};
