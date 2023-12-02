import { isIOS } from "../helpers/helpers"
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"

const heightForiOS = Dimensions.get("screen").height * 0.94

export default function SafeAreaiOS({
  children,
  top = "white",
  bottom = "green",
}) {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: top }} />
      <View style={styles.children}>{children}</View>
      <SafeAreaView style={{ backgroundColor: bottom }} />
    </>
  )
}

const styles = StyleSheet.create({
  children: {
    width: "100%",
    height: isIOS ? heightForiOS : "100%",
    backgroundColor: "#fff",
  },
})
