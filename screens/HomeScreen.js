import React from 'react';
import { getCurrentUser, setCurrentUser } from '../storage/storage'
import { View, Button, Image } from 'react-native';
import * as goTo from './goTo';

import { Provider, BottomNavigation, Appbar, IconButton } from 'react-native-paper';
import styles from '../theme/styles';
import theme from '../theme/themes';

import appLogo from '../assets/croc.png'
import Goals from '../fragments/Goals';
import Abstinence from '../fragments/Abstinence';
import Mood from '../fragments/Mood';
import Social from '../fragments/Social';
import APIS from '../network/api';

const HomeScreen = ({route, navigation}) => {

  const [loggedInUser, setLoggedInUser] = React.useState(undefined)
  const [refreshSocial, setRefreshSocial] = React.useState(false)

  const updateUserFromWeb = (user) => {
    APIS.getUserById(user.id).then(response => {
      if(response.code == 200) {
        setLoggedInUser(response.data)
        setCurrentUser(response.data)
      }
    }).catch(e => console.log(e))
  }

  React.useEffect(() => {
    if(route.params?.refreshSocial) {
      setRefreshSocial(true)
    }
  }, [route.params?.refreshSocial])

  React.useEffect(() => {
    getCurrentUser()
      .then(user => {
        if (user) {
          setLoggedInUser(user)
          updateUserFromWeb(user)
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
    goals: () => <Goals />,
    abstinence: () => <Abstinence />,
    mood: () => <Mood />,
    social: () => <Social refresh={refreshSocial}/>,
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'goals', title: 'Goals', icon: 'bullseye-arrow' },
    { key: 'abstinence', title: 'Abstinence', icon: 'timer-outline' },
    { key: 'mood', title: 'Mood', icon: 'emoticon-outline' },
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

