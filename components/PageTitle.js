import { StyleSheet, Text, View } from "react-native"
import Colors from "../constants/Colors"

export default PageTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: "bold",
    letterSpacing: 0.3,
  },
})
