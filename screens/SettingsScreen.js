import { isIOS } from "../helpers/helpers"
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native"
import React, { useState } from "react"
import PageTitle from "../components/PageTitle"
import PageContainer from "../tools/PageContainer"
import Input from "../components/Input"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { validateInput } from "../utils/actions/formActions"
import { useDispatch, useSelector } from "react-redux"
import SubmitButton from "../components/SubmitButton"
import Colors from "../constants/Colors"
import { updateLoggedinUserData } from "../store/reducers/authReducer"
import {
  updateSignedInUserData,
  userLogout,
} from "../utils/actions/authActions"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import ProfileImage from "../components/ProfileImage"

export default function SettingsScreen() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)

  const [settingsFormState, setSettingsFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    about: "",
    emailError: "",
    firstNameError: "",
    lastNameError: "",
    aboutError: "",
    loading: false,
  })

  const inputChangedHandler = (inputId, inputValue) => {
    // values
    if (inputId === "email") {
      setSettingsFormState((prevState) => ({ ...prevState, email: inputValue }))
    } else if (inputId === "firstName") {
      setSettingsFormState((prevState) => ({
        ...prevState,
        firstName: inputValue,
      }))
    } else if (inputId === "lastName") {
      setSettingsFormState((prevState) => ({
        ...prevState,
        lastName: inputValue,
      }))
    } else if (inputId === "about") {
      setSettingsFormState((prevState) => ({
        ...prevState,
        about: inputValue,
      }))
    }

    // validation
    const validationRes = validateInput(inputId, inputValue)
    if (validationRes === undefined) {
      setSettingsFormState((prevState) => ({
        ...prevState,
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        aboutError: "",
      }))
    } else {
      if (inputId === "email") {
        setSettingsFormState((prevState) => ({
          ...prevState,
          emailError: validationRes[0],
        }))
      } else if (inputId === "firstName") {
        setSettingsFormState((prevState) => ({
          ...prevState,
          firstNameError: validationRes[0],
        }))
      } else if (inputId === "lastName") {
        setSettingsFormState((prevState) => ({
          ...prevState,
          lastNameError: validationRes[0],
        }))
      } else if (inputId === "about") {
        setSettingsFormState((prevState) => ({
          ...prevState,
          aboutError: validationRes[0],
        }))
      }
    }
  }

  const {
    email,
    firstName,
    lastName,
    about,
    emailError,
    firstNameError,
    lastNameError,
    aboutError,
    loading,
  } = settingsFormState

  const handleLogout = async () => {
    await dispatch(userLogout())
  }

  const handleUpdateUserInfo = async () => {
    if (emailError || firstNameError || lastNameError) {
      return Toast.show({
        type: "error",
        text1: "Hmm",
        text2: `⚠️ Please check your values!`,
        position: "bottom",
        visibilityTime: 3000,
      })
    }
    const updatedValues = {
      email: email ? email : userData.email,
      firstName: firstName ? firstName : userData.firstName,
      lastName: lastName ? lastName : userData.lastName,
      about: about ? about : userData.about || "",
    }
    setSettingsFormState((prevState) => ({ ...prevState, loading: true }))
    await updateSignedInUserData(userData.userId, updatedValues)
    dispatch(updateLoggedinUserData({ newData: updatedValues }))
    setSettingsFormState((prevState) => ({
      ...prevState,
      loading: false,
      firstName: "",
      lastName: "",
      email: "",
      about: "",
    }))
  }

  const disabledState =
    email === "" && firstName === "" && lastName === "" && about === ""

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isIOS ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <PageContainer isBgWhite>
        <PageTitle>Settings</PageTitle>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <ProfileImage
            userId={userData.userId}
            size={80}
            uri={userData?.profilePicture}
          />
          <Input
            id="firstName"
            label="First name"
            icon="user-o"
            iconPack={FontAwesome}
            autoCapitalize="none"
            onInputChange={inputChangedHandler}
            errorText={firstNameError}
            initialValue={userData.firstName}
          />

          <Input
            id="lastName"
            label="Last name"
            icon="user-o"
            iconPack={FontAwesome}
            autoCapitalize="none"
            onInputChange={inputChangedHandler}
            errorText={lastNameError}
            initialValue={userData.lastName}
          />

          <Input
            id="email"
            label="Email"
            icon="mail"
            iconPack={Feather}
            autoCapitalize="none"
            keyboardType="email-address"
            onInputChange={inputChangedHandler}
            errorText={emailError}
            initialValue={userData.email}
          />

          <Input
            id="about"
            label="About"
            icon="user-o"
            iconPack={FontAwesome}
            autoCapitalize="none"
            onInputChange={inputChangedHandler}
            errorText={aboutError}
            initialValue={userData.about}
          />

          {loading ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
              size={"small"}
              color={Colors.primary}
            />
          ) : disabledState ? null : (
            <SubmitButton
              color={disabledState ? Colors.gray : Colors.primary}
              disabled={disabledState}
              title="Save"
              onPress={handleUpdateUserInfo}
              customStyle={{ marginTop: 20 }}
            />
          )}
          <SubmitButton
            title="Logout"
            color={Colors.red}
            onPress={() => handleLogout()}
            customStyle={{ marginTop: 20 }}
          />
        </ScrollView>
      </PageContainer>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
  },
})
