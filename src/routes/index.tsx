import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '@screens/SignIn';
import { Box } from 'native-base';
import AppRoutes from './app.routes';

export const Routes = () => {  
  return (
    <Box flex={1} bg={"gray.50"}>
      <NavigationContainer>
        {true ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
};
