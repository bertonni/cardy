import { useAuth } from "@contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import AppRoutes from "./app.routes";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const getValuesFor = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  if (result) return result;
  return "";
};

export const Routes = () => {

  return (
    <Box flex={1} bg={"gray.50"}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
};
