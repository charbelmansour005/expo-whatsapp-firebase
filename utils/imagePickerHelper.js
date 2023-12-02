import * as ImagePicker from "expo-image-picker"
import { Platform } from "react-native"
import { getFireBaseApp } from "./firebaseHelper"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import uuid from "react-native-uuid"
import Toast from "react-native-toast-message"

export const launchImagePicker = async () => {
  await checkMediaPermissions()

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  })
  if (!result.canceled && __DEV__) {
    console.log(result.assets[0].uri)
  }
  return result.assets[0].uri
}

export const uploadImageAsync = async (uri) => {
  const app = getFireBaseApp()

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }

    xhr.onerror = function (e) {
      if (__DEV__) console.log(e)
      reject(new TypeError("Network request failed"))
    }

    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send()
  })

  const pathFolder = "profilePics"
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`)

  await uploadBytesResumable(storageRef, blob)

  blob.close()

  return await getDownloadURL(storageRef)
}

const checkMediaPermissions = async () => {
  if (Platform.OS !== "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "We need permission to access your photos",
        position: "bottom",
        visibilityTime: 3000,
      })
      return Promise.reject("We need permission to access your photos")
    }

    return Promise.resolve()
  }
}
