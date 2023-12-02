import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// the import below (import firebaseConfig from "./firebaseConfig") would look like the following:
// export default firebaseConfig = {
//   apiKey: "",
//   authDomain:  "",
//   projectId:  "",
//   storageBucket:  "",
//   messagingSenderId: "",
//   appId:  "",
//   measurementId:  "",
// }
import firebaseConfig from "./firebaseConfig"

const app = initializeApp(firebaseConfig)

export const initAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export const getFireBaseApp = () => {
  return app
}
