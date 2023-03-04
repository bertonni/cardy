import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./Home";
import { Platform } from "react-native";
import { Ellipse, Path, Svg } from "react-native-svg";
import { Decks } from "./Decks";
import { CreateCard } from "./CreateCard";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Review } from "@components/Review";
import { useTheme } from "native-base";
import { ViewCards } from "./ViewCards";
import { CreateDeck } from "./CreateDeck";

const { Navigator, Screen } = createBottomTabNavigator();

export const Tabs = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.primary[100],
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
      initialRouteName="main"
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
            <Svg width={53} height={51} viewBox="0 0 53 51" fill="none">
              <Path
                d="M29.2333 10.5793C29.8223 10.339 30.4394 10.3924 31.0844 10.7395C31.7295 11.0866 32.1923 11.5671 32.4728 12.1812L40.5082 32.967C40.7887 33.5811 40.7607 34.1819 40.4241 34.7693C40.0875 35.3567 39.5687 35.7839 38.8675 36.0509L25.4891 40.6566C24.844 40.8702 24.2129 40.8168 23.5959 40.4964C22.9788 40.176 22.5301 39.6954 22.2496 39.0546L14.2142 18.5091C14.0178 17.8416 14.0599 17.1875 14.3404 16.5467C14.6208 15.9059 15.1117 15.4653 15.8128 15.225L29.2333 10.5793ZM30.0327 12.9021L16.6542 17.5479L24.6897 38.3337L38.0681 33.728L30.0327 12.9021Z"
                fill={color}
                stroke={color}
              />
              <Ellipse
                cx="37.5819"
                cy="32.4546"
                rx="5.87216"
                ry="5.79545"
                fill="#F5F8FF"
              />
              <Path
                d="M37.1836 35.3211V30.6336H37.979V35.3211H37.1836ZM35.2376 33.3751V32.5796H39.9251V33.3751H35.2376Z"
                fill={color}
              />
            </Svg>
            // <MCIcon name={"cards-outline"} size={40} color={color} />
          ),
          tabBarLabel: "New Card",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={CreateCard}
      />
      <Screen
        name="newDeck"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width={53} height={51} viewBox="0 0 53 51" fill="none">
              <Path
                d="M40.0015 13.2074L40.973 13.4952C41.8742 13.879 42.4868 14.537 42.8106 15.469C43.1345 16.4011 43.043 17.3194 42.536 18.2241L40.0015 23.8165L40.0015 13.2074ZM32.1442 10C33.1018 10 33.9185 10.329 34.5943 10.9869C35.2702 11.6448 35.6082 12.4398 35.6082 13.3719L35.6082 21.8838L31.7218 11.1103C31.6655 10.8909 31.581 10.699 31.4684 10.5346C31.3557 10.3701 31.2149 10.1919 31.0459 10L32.1442 10ZM24.2025 10.9869C24.7939 10.7402 25.4135 10.795 26.0612 11.1514C26.709 11.5078 27.1736 12.0012 27.4553 12.6317L35.5237 33.9733C35.8053 34.6038 35.7771 35.2206 35.4392 35.8237C35.1013 36.4268 34.5803 36.8654 33.8762 37.1396L20.4429 41.8684C19.7952 42.0877 19.1615 42.0329 18.542 41.7039C17.9224 41.375 17.4718 40.8815 17.1902 40.2236L9.12176 19.1288C8.92463 18.4434 8.96687 17.7718 9.24849 17.1139C9.53011 16.4559 10.0229 16.0036 10.727 15.7569L24.2025 10.9869ZM27.6665 31.3416C27.3285 31.3416 27.0328 31.4649 26.7794 31.7116C26.5259 31.9584 26.3992 32.2462 26.3992 32.5752C26.3992 32.9041 26.5259 33.192 26.7794 33.4387C27.0328 33.6854 27.3285 33.8088 27.6665 33.8088C28.0044 33.8088 28.3001 33.6854 28.5536 33.4387C28.807 33.192 28.9338 32.9041 28.9338 32.5752C28.9338 32.2462 28.807 31.9584 28.5536 31.7116C28.3001 31.4649 28.0044 31.3416 27.6665 31.3416ZM25.0052 13.3719L11.5719 18.1419L19.6403 39.4834L33.0736 34.7546L25.0052 13.3719ZM33.0736 34.7546L19.6403 39.4834L33.0736 34.7546Z"
                fill={color}
                stroke={color}
              />
              <Ellipse cx="30.5" cy="34" rx="5.5" ry="6" fill="#F5F8FF" />
              <Path
                d="M30.1018 36.5028V31.8153H30.8973V36.5028H30.1018ZM28.1558 34.5568V33.7614H32.8433V34.5568H28.1558Z"
                fill={color}
              />
            </Svg>
            // <MCIcon name={"cards-outline"} size={40} color={color} />
          ),
          tabBarLabel: "New Deck",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        component={CreateDeck}
      />
      <Screen
        name="viewCard"
        component={ViewCards}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Screen
        name="review"
        component={Review}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Navigator>
  );
};
