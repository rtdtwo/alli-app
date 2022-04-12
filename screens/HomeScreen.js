import React from 'react';
import { getCurrentUser } from '../storage/storage'
import { View, Button, TouchableOpacity, Image } from 'react-native';
import * as goTo from '../pages/goTo';

import API from '../network/api'
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react/cjs/react.development';

const HomeScreen = () => {

  const [goals, setGoals] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        if(user) {
          setCurrentUser(user)
        } else {
          // no user logged in, send to Login screen
          goTo.navigate('Login')
        }
      })
      .catch(e => {
        console.log(e)
        setCurrentUser(null)
      })
  }, [])

  useEffect(() => {
    if (currentUser !== null) {
      API.getAllGoalsOfUser(currentUser.id)
        .then(response => setGoals(response.data))
        .catch(error => console.log(`Error Occurred - ${error.code}: ${error.msg}`))
    }
  }, [currentUser])

  return (
    <View>
      <Button
        title={'Go to'}
        onPress={() =>
          goTo.navigate('Login', { userName: 'Lucy' })
        }
      />
    </View>
  );
}


export default HomeScreen

