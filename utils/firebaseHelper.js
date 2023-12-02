import { initializeApp } from "firebase/app"

export const getFireBaseApp = () => {
  const firebaseConfig = {}

  return initializeApp(firebaseConfig)
}
