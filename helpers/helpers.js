import { Platform } from "react-native"

const isIOS = Platform.OS === "ios"
const isDroid = Platform.OS === "android"

export { isDroid, isIOS }
