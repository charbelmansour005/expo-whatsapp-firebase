import { ActivityIndicator, StyleSheet } from "react-native"
import Input from "./Input"
import SubmitButton from "./SubmitButton"
import React, { useState } from "react"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { validateInput } from "../utils/actions/formActions"
import { signUp } from "../utils/actions/authActions"
import Colors from "../constants/Colors"
import Toast from "react-native-toast-message"
import { useDispatch } from "react-redux"

export default function SignUpForm({ isSignUp, ...props }) {
  const dispatch = useDispatch()

  const [signUpFormState, setSignUpFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    emailError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
    loading: false,
  })

  const inputChangedHandler = (inputId, inputValue) => {
    // values
    if (inputId === "email") {
      setSignUpFormState((prevState) => ({ ...prevState, email: inputValue }))
    } else if (inputId === "password") {
      setSignUpFormState((prevState) => ({
        ...prevState,
        password: inputValue,
      }))
    } else if (inputId === "firstName") {
      setSignUpFormState((prevState) => ({
        ...prevState,
        firstName: inputValue,
      }))
    } else if (inputId === "lastName") {
      setSignUpFormState((prevState) => ({
        ...prevState,
        lastName: inputValue,
      }))
    }

    // validation
    const validationRes = validateInput(inputId, inputValue)
    if (validationRes === undefined) {
      setSignUpFormState((prevState) => ({
        ...prevState,
        emailError: "",
        passwordError: "",
        firstNameError: "",
        lastNameError: "",
      }))
    } else {
      if (inputId === "email") {
        setSignUpFormState((prevState) => ({
          ...prevState,
          emailError: validationRes[0],
        }))
      } else if (inputId === "password") {
        setSignUpFormState((prevState) => ({
          ...prevState,
          passwordError: validationRes[0],
        }))
      } else if (inputId === "firstName") {
        setSignUpFormState((prevState) => ({
          ...prevState,
          firstNameError: validationRes[0],
        }))
      } else if (inputId === "lastName") {
        setSignUpFormState((prevState) => ({
          ...prevState,
          lastNameError: validationRes[0],
        }))
      }
    }
  }

  const {
    email,
    password,
    firstName,
    lastName,
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    loading,
  } = signUpFormState

  const disabledSubmit =
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    emailError ||
    passwordError ||
    firstNameError ||
    lastNameError

  const handleFireBaseSignUp = () => {
    setSignUpFormState((prevState) => ({ ...prevState, loading: true }))
    try {
      dispatch(
        signUp(firstName, lastName, email, password, (result) => {
          if (result) {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Account created",
              position: "bottom",
              visibilityTime: 3000,
            })
            setSignUpFormState((prevState) => ({
              ...prevState,
              loading: false,
            }))
          } else {
            setSignUpFormState((prevState) => ({
              ...prevState,
              loading: false,
            }))
          }
        })
      )
    } catch (error) {
      if (__DEV__) console.error(error)
    }
  }

  return (
    <>
      <Input
        value={firstName}
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChange={inputChangedHandler}
        errorText={firstNameError}
      />

      <Input
        value={lastName}
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChange={inputChangedHandler}
        errorText={lastNameError}
      />

      <Input
        value={email}
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
        value={password}
        id="password" // id is a default prop
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
          disabled={disabledSubmit}
          title={"Sign up"}
          customStyle={{ marginTop: 20 }}
          onPress={() => handleFireBaseSignUp()}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({})
