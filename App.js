import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Appbar style={styles.appbar}>
        
      </Appbar>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  }
});

export default App
