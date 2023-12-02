import React, { useCallback, useEffect, useState } from "react"
import Input from "./Input"
import SubmitButton from "./SubmitButton"
import { Feather } from "@expo/vector-icons"
import { validateInput } from "../utils/actions/formActions"
import { signIn } from "../utils/actions/authActions"
import { useDispatch } from "react-redux"
import { ActivityIndicator } from "react-native"
import Colors from "../constants/Colors"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import * as Haptics from "expo-haptics"

const isTestMode = true // test mode flag

const SignInForm = ({ isSignUp, ...props }) => {
  const dispatch = useDispatch()
  const [signInFormState, setSignInFormState] = useState({
    email: isTestMode ? "charbel@gmail.com" : "",
    password: isTestMode ? "pornhub" : "",
    emailError: "",
    passwordError: "",
    loading: false,
  })

  const load = () =>
    setSignInFormState((prevState) => ({
      ...prevState,
      loading: true,
    }))

  const stopLoad = () =>
    setSignInFormState((prevState) => ({
      ...prevState,
      loading: false,
    }))

  const inputChangedHandler = (inputId, inputValue) => {
    // values
    if (inputId === "email") {
      setSignInFormState((prevState) => ({ ...prevState, email: inputValue }))
    } else if (inputId === "password") {
      setSignInFormState((prevState) => ({
        ...prevState,
        password: inputValue,
      }))
    }

    // validation
    const validationRes = validateInput(inputId, inputValue)
    if (validationRes === undefined) {
      setSignInFormState((prevState) => ({
        ...prevState,
        emailError: "",
        passwordError: "",
      }))
    } else {
      if (inputId === "email") {
        setSignInFormState((prevState) => ({
          ...prevState,
          emailError: validationRes[0],
        }))
      } else if (inputId === "password") {
        setSignInFormState((prevState) => ({
          ...prevState,
          passwordError: validationRes[0],
        }))
      }
    }
  }

  const email = signInFormState.email
  const password = signInFormState.password
  const emailError = signInFormState.emailError
  const passwordError = signInFormState.passwordError
  const loading = signInFormState.loading

  const handleSignIn = useCallback(() => {
    load()
    dispatch(
      signIn(email, password, (result) => {
        if (result) {
          stopLoad()
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Welcome back!",
            position: "top",
            visibilityTime: 3000,
          })
        } else {
          stopLoad()
        }
      })
    )
  }, [dispatch, signInFormState])

  return (
    <>
      <Input
        initialValue={email}
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChange={inputChangedHandler}
        errorText={emailError}
      />

      <Input
        initialValue={password}
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        onInputChange={inputChangedHandler}
        errorText={passwordError}
      />

      {loading ? (
        <ActivityIndicator
          style={{ marginVertical: 20 }}
          size={"small"}
          color={Colors.white}
        />
      ) : (
        <SubmitButton
          isSignUp={isSignUp}
          disabled={!email || !password || !!emailError || !!passwordError}
          title="Sign in"
          onPress={handleSignIn}
          customStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}

export default SignInForm
