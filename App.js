import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import theme from './themes';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            options={{ headerTitle: 'Home' }}
            component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App
