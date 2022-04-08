import * as React from 'react';
import { Button } from 'react-native';

function GoToButton({ navigation, screenName }) {
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}