import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import theme from './themes';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './screens/Login';
import { navigationRef } from './pages/goTo';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log(require('./assets/croc.png'));
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerTitle: 'Home' }}
            component={HomeScreen} />
          <Stack.Screen
            name="Login"
            component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App
