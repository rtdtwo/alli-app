import React from 'react';
import { getCurrentUser } from '../storage/storage'
import { View, Button, Image } from 'react-native';
import * as goTo from './goTo';

import { Provider, BottomNavigation, Appbar, IconButton } from 'react-native-paper';
import styles from '../theme/styles';
import theme from '../theme/themes';

import appLogo from '../assets/croc.png'
import Goals from '../fragments/Goals';
import Mood from '../fragments/Mood';
import Social from '../fragments/Social';

const HomeScreen = () => {

  const [currentUser, setCurrentUser] = React.useState(undefined)

  React.useEffect(() => {
    // See if user is logged in
    getCurrentUser()
      .then(user => {
        if (user) {
          setCurrentUser(user)
        } else {
          // no user logged in, send to Login screen
          goTo.replace('Login')
        }
      })
      .catch(e => {
        console.log(e)
        goTo.replace('Login')
      })
  }, [])


  const ROUTES = {
    dashboard: () => <View />,
    goals: () => <Goals />,
    mood: () => <Mood />,
    milestones: () => <View />,
    social: () => <Social />,
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Dashboard', icon: 'view-dashboard-outline' },
    { key: 'goals', title: 'Goals', icon: 'bullseye-arrow' },
    { key: 'mood', title: 'Mood', icon: 'emoticon-outline' },
    { key: 'milestones', title: 'Milestones', icon: 'flag-checkered' },
    { key: 'social', title: 'Social', icon: 'account-group-outline' }
  ])
  const renderScene = BottomNavigation.SceneMap(ROUTES)

  return (
    <Provider theme={theme}>
      <Appbar.Header>
        <Image
          source={appLogo}
          style={styles.appbarLogo} />

        <IconButton
          icon={'account-circle-outline'}
          color='gray'
          style={styles.appbarProfile}
          onPress={() => goTo.navigate('Profile')} />
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene} />

    </Provider>
  );
}


export default HomeScreen

