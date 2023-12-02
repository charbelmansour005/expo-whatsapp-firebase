import { StyleSheet, View } from "react-native"
import React from "react"

export default function PageContainer({ children, isBgWhite = false }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isBgWhite ? "white" : null },
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
})
