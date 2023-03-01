import { NativeBaseProvider, StatusBar } from "native-base";
import { theme } from "@styles/theme";
import { useFonts } from "expo-font";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "@contexts/AuthContext";
import { DecksContextProvider } from "@contexts/DecksContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular: require("@fonts/poppins/Poppins-Regular.ttf"),
    Poppins_700Bold: require("@fonts/poppins/Poppins-Bold.ttf"),
  });

  return (
    <AuthContextProvider>
      <DecksContextProvider>
        <NativeBaseProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </NativeBaseProvider>
      </DecksContextProvider>
    </AuthContextProvider>
  );
}
