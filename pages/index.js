// CustomButton/index.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomButton = () => {
  return (
        <View style={styles.container}>
           <Text> hello button </Text> 
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
