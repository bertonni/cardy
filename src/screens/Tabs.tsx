import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./Home";
import { Platform } from "react-native";
import { SignUp } from "./SignUp";
import { Path, Rect, Svg } from "react-native-svg";
import { Decks } from "./Decks";
import { Cards } from "./Cards";

const { Navigator, Screen } = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "#013099",
        tabBarInactiveTintColor: "#CCDCFF",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          height: 89,
          borderWidth: 0,
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
          paddingVertical: 8
        },
      }}
    >
      <Screen
        name="main"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width={41} height={39} fill="none" viewBox="0 0 53 51">
              <Path
                d="M30.2812 41.4375V31.875C30.2812 31.4523 30.1133 31.0469 29.8145 30.748C29.5156 30.4492 29.1102 30.2813 28.6875 30.2813H22.3125C21.8898 30.2813 21.4844 30.4492 21.1855 30.748C20.8867 31.0469 20.7188 31.4523 20.7188 31.875V41.4375C20.7188 41.8602 20.5508 42.2656 20.252 42.5645C19.9531 42.8633 19.5477 43.0313 19.125 43.0313H9.5625C9.13981 43.0313 8.73443 42.8633 8.43555 42.5645C8.13666 42.2656 7.96875 41.8602 7.96875 41.4375V23.0098C7.97232 22.7892 8.01998 22.5716 8.10894 22.3697C8.1979 22.1679 8.32634 21.9858 8.48672 21.8344L24.4242 7.35117C24.718 7.08239 25.1018 6.93332 25.5 6.93332C25.8982 6.93332 26.282 7.08239 26.5758 7.35117L42.5133 21.8344C42.6737 21.9858 42.8021 22.1679 42.8911 22.3697C42.98 22.5716 43.0277 22.7892 43.0312 23.0098V41.4375C43.0312 41.8602 42.8633 42.2656 42.5645 42.5645C42.2656 42.8633 41.8602 43.0313 41.4375 43.0313H31.875C31.4523 43.0313 31.0469 42.8633 30.748 42.5645C30.4492 42.2656 30.2812 41.8602 30.2812 41.4375Z"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
              />
            </Svg>
          ),
          tabBarLabel: "Home",
          tabBarIconStyle: {
            marginTop: 8
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={Home}
      />
      <Screen
        name="deckList"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width={46} height={44} fill="none" viewBox="0 0 46 44">
              <Path
                d="M11.6653 37.9595L10.7103 37.6791C9.82454 37.3053 9.22249 36.6645 8.90416 35.7567C8.58583 34.849 8.67579 33.9545 9.17404 33.0734L11.6653 27.6267V37.9595ZM19.3882 41.0834C18.4471 41.0834 17.6443 40.763 16.98 40.1222C16.3157 39.4814 15.9835 38.7071 15.9835 37.7993V29.509L19.8034 40.002C19.8588 40.2156 19.9418 40.4025 20.0525 40.5627C20.1633 40.7229 20.3017 40.8965 20.4678 41.0834H19.3882ZM27.1942 40.1222C26.6129 40.3625 26.0039 40.3091 25.3672 39.962C24.7306 39.6149 24.2738 39.1343 23.997 38.5202L16.0665 17.7344C15.7897 17.1203 15.8174 16.5195 16.1496 15.9322C16.4817 15.3448 16.9938 14.9176 17.6858 14.6506L30.8895 10.0448C31.5262 9.83125 32.149 9.88465 32.758 10.205C33.3669 10.5254 33.8098 11.006 34.0866 11.6468L42.0171 32.1923C42.2109 32.8598 42.1694 33.514 41.8926 34.1548C41.6158 34.7956 41.1314 35.2361 40.4393 35.4764L27.1942 40.1222ZM23.7894 20.2976C24.1216 20.2976 24.4122 20.1774 24.6614 19.9371C24.9105 19.6968 25.0351 19.4165 25.0351 19.0961C25.0351 18.7757 24.9105 18.4953 24.6614 18.255C24.4122 18.0147 24.1216 17.8946 23.7894 17.8946C23.4573 17.8946 23.1666 18.0147 22.9175 18.255C22.6684 18.4953 22.5438 18.7757 22.5438 19.0961C22.5438 19.4165 22.6684 19.6968 22.9175 19.9371C23.1666 20.1774 23.4573 20.2976 23.7894 20.2976ZM26.4053 37.7993L39.6089 33.1535L31.6784 12.3677L18.4747 16.9734L26.4053 37.7993ZM18.4747 16.9734L31.6784 12.3677L18.4747 16.9734Z"
                fill={color}
              />
            </Svg>
          ),
          tabBarLabel: "Decks",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={Decks}
      />
      <Screen
        name="newCard"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width={46} height={44} fill="none" viewBox="0 0 46 44">
              <Path
                d="M11.6653 37.9595L10.7103 37.6791C9.82454 37.3053 9.22249 36.6645 8.90416 35.7567C8.58583 34.849 8.67579 33.9545 9.17404 33.0734L11.6653 27.6267V37.9595ZM19.3882 41.0834C18.4471 41.0834 17.6443 40.763 16.98 40.1222C16.3157 39.4814 15.9835 38.7071 15.9835 37.7993V29.509L19.8034 40.002C19.8588 40.2156 19.9418 40.4025 20.0525 40.5627C20.1633 40.7229 20.3017 40.8965 20.4678 41.0834H19.3882ZM27.1942 40.1222C26.6129 40.3625 26.0039 40.3091 25.3672 39.962C24.7306 39.6149 24.2738 39.1343 23.997 38.5202L16.0665 17.7344C15.7897 17.1203 15.8174 16.5195 16.1496 15.9322C16.4817 15.3448 16.9938 14.9176 17.6858 14.6506L30.8895 10.0448C31.5262 9.83125 32.149 9.88465 32.758 10.205C33.3669 10.5254 33.8098 11.006 34.0866 11.6468L42.0171 32.1923C42.2109 32.8598 42.1694 33.514 41.8926 34.1548C41.6158 34.7956 41.1314 35.2361 40.4393 35.4764L27.1942 40.1222ZM23.7894 20.2976C24.1216 20.2976 24.4122 20.1774 24.6614 19.9371C24.9105 19.6968 25.0351 19.4165 25.0351 19.0961C25.0351 18.7757 24.9105 18.4953 24.6614 18.255C24.4122 18.0147 24.1216 17.8946 23.7894 17.8946C23.4573 17.8946 23.1666 18.0147 22.9175 18.255C22.6684 18.4953 22.5438 18.7757 22.5438 19.0961C22.5438 19.4165 22.6684 19.6968 22.9175 19.9371C23.1666 20.1774 23.4573 20.2976 23.7894 20.2976ZM26.4053 37.7993L39.6089 33.1535L31.6784 12.3677L18.4747 16.9734L26.4053 37.7993ZM18.4747 16.9734L31.6784 12.3677L18.4747 16.9734Z"
                fill={color}
              />
            </Svg>
          ),
          tabBarLabel: "New Card",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={SignUp}
      />
      <Screen name="cardList" component={Cards} options={{ tabBarButton: () => null }} />
    </Navigator>
  );
};
