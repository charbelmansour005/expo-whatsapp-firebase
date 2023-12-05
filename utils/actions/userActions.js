import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database"
import { getFireBaseApp } from "../firebaseHelper"
import { devPrint } from "../../helpers/helpers"

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
export const getUserData = async (userId) => {
  try {
    const app = getFireBaseApp()
    const dbRef = ref(getDatabase(app))
    const userRef = child(dbRef, `users/${userId}`)

    const snapshot = await get(userRef)
    return snapshot.val()
  } catch (error) {
    devPrint({ name: getUserData, data: error, error })
  }
}

export const searchUsers = async (queryText) => {
  const searchTerm = queryText?.toLowerCase()

  try {
    const app = getFireBaseApp()
    const dbRef = ref(getDatabase(app))
    const userRef = child(dbRef, "users")

    const queryRef = query(
      userRef,
      orderByChild("firstLast"),
      startAt(searchTerm),
      endAt(searchTerm + "\uf8ff")
    )

    const snapshot = await get(queryRef)
    if (snapshot.exists()) {
      devPrint({ name: searchUsers, data: snapshot.val(), error: false })
      return snapshot.val()
    }

    return {}
  } catch (error) {
    devPrint({ name: searchUsers, data: error, error })
    throw error
  }
}
