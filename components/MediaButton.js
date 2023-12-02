import { StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { Feather } from "@expo/vector-icons"
import Colors from "../constants/Colors"

const MediaButton = ({
  onPress = () => {},
  iconName,
  buttonColor,
  sendStyleEnabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mediaButton, sendStyleEnabled ? styles.sendButton : null]}
      onPress={onPress}
    >
      <Feather
        name={iconName}
        size={sendStyleEnabled ? 20 : 24}
        color={buttonColor}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: Colors.blue,
    padding: 8,
    borderRadius: 50,
  },
})

export default MediaButton
