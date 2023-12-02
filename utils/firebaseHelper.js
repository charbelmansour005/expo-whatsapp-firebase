import { initializeApp } from "firebase/app"
// import { initializeAuth, getReactNativePersistence } from "firebase/auth"
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// })

export const getFireBaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCD20SedXLdSd0ADbkb0RJMDTOyMIjv6IA",
    authDomain: "whatsapp-e1078.firebaseapp.com",
    projectId: "whatsapp-e1078",
    storageBucket: "whatsapp-e1078.appspot.com",
    messagingSenderId: "182752442537",
    appId: "1:182752442537:web:9782b8500f9748963bd1b8",
    measurementId: "G-M78ZY0HD9Q",
  }

  return initializeApp(firebaseConfig)
}
