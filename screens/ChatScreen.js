import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native"
import React, { useCallback, useState } from "react"
import backgroundImage from "../assets/images/droplet.jpeg"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import Colors from "../constants/Colors"
import MediaButton from "../components/MediaButton"
import { isIOS } from "../helpers/helpers"

export default function ChatScreen() {
  const [messageText, setMessageText] = useState("")
  const sendMessage = useCallback(async () => {
    setMessageText("")
  }, [])
  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIOS ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
        ></ImageBackground>

        <View style={styles.inputContainer}>
          <MediaButton
            buttonColor={Colors.blue}
            onPress={() => console.log("gallery")}
            iconName={"plus"}
          />
          <TextInput
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            style={styles.textbox}
            returnKeyType={"send"}
            onSubmitEditing={sendMessage}
          />
          <MediaButton
            buttonColor={messageText ? Colors.white : Colors.blue}
            sendStyleEnabled={messageText ? true : false}
            onPress={() => sendMessage()}
            iconName={messageText ? "send" : "camera"}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 50,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
})
