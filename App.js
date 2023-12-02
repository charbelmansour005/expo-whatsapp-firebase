import "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import * as Font from "expo-font"
import SafeAreaiOS from "./tools/SafeAreaiOS"
import AppNavigation from "./navigation/AppNavigation"
import Toast from "react-native-toast-message"
import { store } from "./store/store"
import { Provider } from "react-redux"
import { StatusBar } from "expo-status-bar"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        })
      } catch (error) {
        console.log.error()
      } finally {
        setAppIsLoaded(true)
      }
    }

    prepare()
  }, [])

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [appIsLoaded])

  if (!appIsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar backgroundColor="white" />
      <Provider store={store}>
        <SafeAreaProvider style={styles.container} onLayout={onLayout}>
          <SafeAreaiOS top="#fff" bottom="#fff">
            <AppNavigation />
            <Toast />
          </SafeAreaiOS>
        </SafeAreaProvider>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // ?
  },
  parent: {
    backgroundColor: "green",
    flex: 1,
  },
  label: {
    color: "black",
    fontSize: 18,
    fontFamily: "regular",
  },
})
