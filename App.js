import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import theme from './theme/themes';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './screens/Login';
import { navigationRef } from './screens/goTo';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import GroupList from './screens/GroupList';
import Group from './screens/Group';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false }}
            component={Splash} />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen} />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login} />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={Profile} />
          <Stack.Screen
            name="Group List"
            options={{ headerShown: false }}
            component={GroupList} />
            <Stack.Screen
              name="Group"
              options={{ headerShown: false }}
              component={Group} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App
