import { child, get, getDatabase, ref } from "firebase/database"
import { getFireBaseApp } from "../firebaseHelper"

export const getUserData = async (userId) => {
  try {
    const app = getFireBaseApp()
    const dbRef = ref(getDatabase(app))
    const userRef = child(dbRef, `users/${userId}`)

    const snapshot = await get(userRef)
    return snapshot.val()
    /**
     * @returns
     * Object {
      "about": "this is my about",
      "email": "charbello@gmail.com",
      "firstLast": "charbel mansour",
      "firstName": "charbel",
      "lastName": "mansour",
      "signUpDate": "2023-07-30T19:31:52.010Z",
      "userId": "IDb4au2kwtQVYlmy5aRk5WdToCP2",
      }
     */
  } catch (error) {
    console.error(error)
  }
}
