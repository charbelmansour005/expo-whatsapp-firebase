import { Platform } from "react-native"

const isIOS = Platform.OS === "ios"

const isDroid = Platform.OS === "android"

const devPrint = ({ name, data, error = false }) => {
  if (__DEV__) {
    if (error) {
      return console.error({ name, data })
    }
    console.log({ name, data })
  } else return
}

export { isDroid, isIOS, devPrint }
