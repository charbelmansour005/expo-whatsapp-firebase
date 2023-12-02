import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ChatListScreen from "../screens/ChatListScreen"
import ChatSettingsScreen from "../screens/ChatSettingsScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import SettingsScreen from "../screens/SettingsScreen"
import ChatScreen from "../screens/ChatScreen"
import { View } from "react-native"
import { isIOS } from "../helpers/helpers"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: true,
      }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons size={size} name="chatbubble-outline" color={color} />
            )
          },
        }}
      />
      <Tab.Screen
        name="ChatListSettings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons size={size} name="settings-outline" color={color} />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <View style={{ height: isIOS ? 0 : 40 }}></View>,
      }}
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: "", headerBackTitle: "Go Back" }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
          headerBackTitle: "Go Back",
        }}
      />
    </Stack.Navigator>
  )
}
