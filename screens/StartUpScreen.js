import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import * as SecureStore from "expo-secure-store"
import React, { useEffect } from "react"
import Colors from "../constants/Colors"
import { useDispatch } from "react-redux"
import { authenticate, setDidTryAutoLogin } from "../store/reducers/authReducer"
import { getUserData } from "../utils/actions/userActions"

export default function StartUpScreen() {
  const dispatch = useDispatch()
  let key = "userData"
  // async function clear(key) {
  //   await SecureStore.deleteItemAsync(key)
  // }
  // clear(key)

  useEffect(() => {
    async function tryLogin() {
      const storedAuthInfo = await SecureStore.getItemAsync(key)

      if (!storedAuthInfo) {
        return dispatch(setDidTryAutoLogin(true))
      }

      const parsedData = JSON.parse(storedAuthInfo) // we have to parse after doing .stringify in saveDataToStorage
      const { token, userId, expiryDate: expiryDateString } = parsedData
      const expiryDate = new Date(expiryDateString)
      // if the expiry date of the token is in the past
      // or if we dont have the token or the userId
      if (expiryDate <= new Date() || !token || !userId) {
        // we mark that we have tried to login
        return dispatch(setDidTryAutoLogin(true))
      }

      const userData = await getUserData(userId)
      // getUserData needs an await because it is an async function
      console.log(userData)
      dispatch(authenticate({ token: token, userData }))
    }

    tryLogin()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={Colors.primary} size={"large"} />
    </View>
  )
}

const styles = StyleSheet.create({})
