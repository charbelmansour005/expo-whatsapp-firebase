import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native"
import React, { useLayoutEffect } from "react"
import SafeAreaiOS from "../tools/SafeAreaiOS"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import CustomHeaderButton from "../components/CustomHeaderButton"
import Colors from "../constants/Colors"

const ChatListScreen = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="New chat"
              iconName="add-circle"
              onPress={() => props.navigation.navigate("NewChat")}
            />
          </HeaderButtons>
        )
      },
    })
  }, [])

  return (
    <SafeAreaiOS top="#fff" bottom="white">
      <View style={styles.container}>
        <Text style={{ color: "black" }}>Chat List Screen</Text>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChatScreen")}
        >
          <Text>go to chat screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaiOS>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.nearlyWhite,
  },
})

export default ChatListScreen
