import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <Appbar style={styles.appbar}>
        
      </Appbar>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  }
});

export default App
