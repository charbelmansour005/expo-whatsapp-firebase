import { Text, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import Colors from "../constants/Colors"

export default function SubmitButton({
  color = Colors.primary,
  disabled = false,
  title,
  onPress = () => {},
  customStyle = {},
}) {
  const enabledBgColor = color
  const disabledBgColor = Colors.lightGray
  const bgColor = disabled ? disabledBgColor : enabledBgColor
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <LinearGradient
        colors={[color, color]}
        style={{
          ...styles.button,
          ...{ backgroundColor: bgColor },
          ...customStyle,
        }}
      >
        <Text style={{ color: "white" }}>{title || ""}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})
