import React from 'react';
import {View, Button, TouchableOpacity} from 'react-native';
import * as goTo from '../pages/goTo';



const HomeScreen = () => {
    return ( 
    <View>
        <Button
        title={'Go to'}
        onPress={() =>
          goTo.navigate('Login', {userName: 'Lucy'})
        }
      />
    </View>

  
  );
}


export default HomeScreen

