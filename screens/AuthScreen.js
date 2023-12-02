import React, { useEffect, useState } from "react"
import PageContainer from "../tools/PageContainer"
import SignUpForm from "../components/SignUpForm"
import SignInForm from "../components/SignInForm"
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Colors from "../constants/Colors"
import logo from "../assets/images/logo.png"
import { isIOS } from "../helpers/helpers"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import * as Haptics from "expo-haptics"
import blob from "../assets/images/blob.png"

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const offsetLogo = useSharedValue(0)

  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${offsetLogo.value}deg` }],
    }
  })

  const signUpOpacity = useSharedValue(1)
  const signInOpacity = useSharedValue(0)

  const signUpFormStyle = useAnimatedStyle(() => {
    return {
      opacity: signUpOpacity.value,
      transform: [
        {
          translateX: (1 - signUpOpacity.value) * 100,
        },
      ],
    }
  })

  const signInFormStyle = useAnimatedStyle(() => {
    return {
      opacity: signInOpacity.value,
      transform: [{ translateX: (1 - signInOpacity.value) * -100 }],
    }
  })

  useEffect(() => {
    if (isSignUp) {
      offsetLogo.value = withSpring(0)
      signUpOpacity.value = withTiming(1, { duration: 300 })
      signInOpacity.value = withTiming(0, { duration: 300 })
    } else {
      offsetLogo.value = withSpring(180)
      signUpOpacity.value = withTiming(0, { duration: 300 })
      signInOpacity.value = withTiming(1, { duration: 300 })
    }
  }, [isSignUp])

  const handleSwitchForms = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setIsSignUp((prev) => !prev)
  }

  return (
    <>
      <ImageBackground
        tintColor={Colors.primary}
        style={{ flex: 1 }}
        source={blob}
      >
        <PageContainer>
          <ScrollView>
            <KeyboardAvoidingView
              keyboardVerticalOffset={100} // pushed the view above the keyboard more
              style={styles.keyboardAvoidingView}
              behavior={isIOS ? "height" : undefined} // fixes hidden inputs for iOS
            >
              <View style={styles.imageContainer}>
                <Animated.Image
                  resizeMode="contain"
                  style={[styles.image, animatedLogo]}
                  source={logo}
                />
              </View>
              <Animated.View style={signUpFormStyle}>
                {/* sign up form  */}
                {isSignUp ? <SignUpForm isSignUp={isSignUp} /> : null}
              </Animated.View>
              <Animated.View style={signInFormStyle}>
                {/* sign in form  */}
                {isSignUp ? null : <SignInForm isSignUp={isSignUp} />}
              </Animated.View>

              <TouchableOpacity
                onPress={() => handleSwitchForms()}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>{`Switch to ${
                  isSignUp ? "Sign in screen" : "Sign up screen"
                }`}</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </PageContainer>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: Colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
    textDecorationLine: "underline",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
})

export default AuthScreen
