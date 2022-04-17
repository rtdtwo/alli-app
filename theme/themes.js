import { configureFonts, DefaultTheme } from "react-native-paper"
import fontConfig from "./fontConfig"

const theme = {
    ...DefaultTheme,
    dark: false,
    mode: 'exact',
    // fonts: configureFonts(fontConfig),
    roundness: 8,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ffffff',
      accent: '#2ecc71',
      black: 'black',
      grayLight: '#bcbcbc',
      transparent: 'transparent',
      primaryText: '#454545'
    },
  }

  export default theme