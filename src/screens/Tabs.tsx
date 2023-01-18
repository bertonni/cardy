import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./Home";
import { Platform } from "react-native";
import { SignUp } from "./SignUp";
import { Path, Svg } from "react-native-svg";
import { Decks } from "./Decks";
import { Cards } from "./Cards";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

interface CardProps {
  title: string;
  currentCards?: number;
  totalCards?: number;
}

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
          paddingVertical: 8,
        },
      }}
    >
      <Screen
        name="main"
        options={{
          tabBarIcon: ({ color }) => (
            // <MCIcon name="home-outline" size={40} color={color} />
            <Svg width={41} height={39} fill="none" viewBox="0 0 53 51">
              <Path
                d="M30.2812 41.4375V31.875C30.2812 31.4523 30.1133 31.0469 29.8145 30.748C29.5156 30.4492 29.1102 30.2813 28.6875 30.2813H22.3125C21.8898 30.2813 21.4844 30.4492 21.1855 30.748C20.8867 31.0469 20.7188 31.4523 20.7188 31.875V41.4375C20.7188 41.8602 20.5508 42.2656 20.252 42.5645C19.9531 42.8633 19.5477 43.0313 19.125 43.0313H9.5625C9.13981 43.0313 8.73443 42.8633 8.43555 42.5645C8.13666 42.2656 7.96875 41.8602 7.96875 41.4375V23.0098C7.97232 22.7892 8.01998 22.5716 8.10894 22.3697C8.1979 22.1679 8.32634 21.9858 8.48672 21.8344L24.4242 7.35117C24.718 7.08239 25.1018 6.93332 25.5 6.93332C25.8982 6.93332 26.282 7.08239 26.5758 7.35117L42.5133 21.8344C42.6737 21.9858 42.8021 22.1679 42.8911 22.3697C42.98 22.5716 43.0277 22.7892 43.0312 23.0098V41.4375C43.0312 41.8602 42.8633 42.2656 42.5645 42.5645C42.2656 42.8633 41.8602 43.0313 41.4375 43.0313H31.875C31.4523 43.0313 31.0469 42.8633 30.748 42.5645C30.4492 42.2656 30.2812 41.8602 30.2812 41.4375Z"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
              />
            </Svg>
          ),
          tabBarLabel: "Home",
          tabBarIconStyle: {
            marginTop: 8,
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
            <MCIcon name={"cards-outline"} size={40} color={color} />
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
            <MCIcon name={"cards-outline"} size={40} color={color} />
          ),
          tabBarLabel: "New Card",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={SignUp}
      />
      <Screen
        name="cardList"
        children={({ route }) => {
          const params = route.params as CardProps
          return <Cards title={route.params ? params.title : ''} />;
        }}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
};
