import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@screens/Home";
import { LandingPage } from "@screens/LandingPage";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
  
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="landing" component={LandingPage} />
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
};

export default AppRoutes;
