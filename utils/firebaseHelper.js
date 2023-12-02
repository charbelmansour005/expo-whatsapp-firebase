import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import firebaseConfig from "./firebaseConfig"

const app = initializeApp(firebaseConfig)

export const initAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export const getFireBaseApp = () => {
  return app
}
