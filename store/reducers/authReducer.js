import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action
      state.token = payload.token
      state.userData = payload.userData
      state.didTryAutoLogin = true
    },
    setDidTryAutoLogin: (state, action) => {
      state.didTryAutoLogin = true
    },
    logout: (state, action) => {
      state.token = null
      state.userData = null
      state.didTryAutoLogin = false
    },
    updateLoggedinUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload.newData }
    },
  },
})

export default authSlice.reducer
export const {
  authenticate,
  setDidTryAutoLogin,
  logout,
  updateLoggedinUserData,
} = authSlice.actions
