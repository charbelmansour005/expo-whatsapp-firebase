import { getFireBaseApp } from "../firebaseHelper"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { child, getDatabase, set, ref, update } from "firebase/database"
import Toast from "react-native-toast-message"
import { authenticate, logout } from "../../store/reducers/authReducer"
import * as SecureStore from "expo-secure-store"
import * as Haptics from "expo-haptics"
import { getUserData } from "./userActions"

const saveDataToStorage = async (token, userId, expiryDate) => {
  await SecureStore.setItemAsync(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  )
}

export const signIn = (email, password, callback) => async (dispatch) => {
  const app = getFireBaseApp()
  const auth = getAuth(app)

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    if (result) {
      callback && callback(result)
      // use the data from firebase
      const { uid, stsTokenManager } = result.user
      const { accessToken, expirationTime } = stsTokenManager
      // setup auto logout
      const expiryDate = new Date(expirationTime)
      const timeNow = new Date()
      const millisecondsUntilExpiry = expiryDate - timeNow
      // get user data from realtime db
      const userData = await getUserData(uid)
      // set user data in our app
      dispatch(authenticate({ token: accessToken, userData }))
      // save necessary data (like the token, uid, expiryDate) in secure storage
      saveDataToStorage(accessToken, uid, expiryDate)
      // clear the storage after an hour (set by firebase)
      timer = setTimeout(() => {
        // a bit unprofessional but ok
        dispatch(userLogout())
      }, millisecondsUntilExpiry)
    } else {
      callback && callback(false)
    }
  } catch (error) {
    callback && callback(false)
    let message = "Something went wrong"
    const errorCode = error.code
    if (
      errorCode === "auth/user-not-found" ||
      errorCode === "auth/wrong-password"
    ) {
      message = "The username or password is incorrect"
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Toast.show({
      type: "error",
      text1: "An error occured",
      text2: `⚠️ ${message}`,
      position: "bottom",
      visibilityTime: 3000,
    })
    if (__DEV__) {
      console.error(error)
    }
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync("userData")
    dispatch(logout())
  } catch (error) {
    if (__DEV__) {
      console.error(error)
    }
  }
}

export const signUp =
  (firstName, lastName, email, password, callback) => async (dispatch) => {
    const app = getFireBaseApp()
    const auth = getAuth(app) // allowing us to talk to the app
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (result) {
        callback && callback(result)

        const { uid, stsTokenManager } = result.user // from firebase
        const { accessToken, expirationTime } = stsTokenManager // from firebase

        const expiryDate = new Date(expirationTime)
        const timeNow = new Date()
        const millisecondsUntilExpiry = expiryDate - timeNow

        saveDataToStorage(accessToken, uid, expiryDate)
        const userData = await createUser(firstName, lastName, email, uid) // create a new user
        dispatch(authenticate({ token: accessToken, userData }))

        timer = setTimeout(() => {
          dispatch(userLogout())
        }, millisecondsUntilExpiry)
      } else {
        callback && callback(false)
      }
    } catch (error) {
      callback && callback(false)
      if (__DEV__) {
        console.error(error)
      }
      let message = "Something went wrong"
      const errorCode = error.code
      if (errorCode === "auth/email-already-in-use") {
        message = "This email is already in use"
      }
      Toast.show({
        type: "error",
        text1: "An error occured",
        text2: `⚠️ ${message}`,
        position: "bottom",
        visibilityTime: 3000,
      })
    }
  }

const createUser = async (firstName, lastName, email, userId) => {
  const firstLast = `${firstName} ${lastName}`.toLowerCase()
  const userData = {
    firstName,
    lastName,
    firstLast,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  }

  const dbRef = ref(getDatabase()) // gives a reference to our realtimedb
  const childRef = child(dbRef, `users/${userId}`)
  await set(childRef, userData)
  return userData
}

export const updateSignedInUserData = async (userId, newData) => {
  try {
    if (newData.firstName && newData.lastName) {
      const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase()
      newData.firstLast = firstLast
    }
    const dbRef = ref(getDatabase())
    const childRef = child(dbRef, `users/${userId}`)
    await update(childRef, newData)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `Account updated`,
      position: "bottom",
      visibilityTime: 3000,
    })
  } catch (e) {
    if (__DEV__) {
      console.error(e)
    }
    Toast.show({
      type: "error",
      text1: "An error occured",
      text2: `⚠️ Please authenticate again by logging out then in!`,
      position: "bottom",
      visibilityTime: 3000,
    })
  }
}
