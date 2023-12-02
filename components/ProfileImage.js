import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import DefaultUserImg from "../assets/images/userImage.jpeg"
import React, { useState } from "react"
import Colors from "../constants/Colors"
import { FontAwesome } from "@expo/vector-icons"
import { launchImagePicker, uploadImageAsync } from "../utils/imagePickerHelper"
import { updateSignedInUserData } from "../utils/actions/authActions"
import { useDispatch } from "react-redux"
import { updateLoggedinUserData } from "../store/reducers/authReducer"

const ProfileImage = (props) => {
  const dispatch = useDispatch()
  const source = props.uri ? props.uri : DefaultUserImg
  const [image, setImage] = useState(source)
  const [isLoading, setIsLoading] = useState(false)
  const userId = props.userId

  const pickImage = async () => {
    try {
      const tempURI = await launchImagePicker()
      if (!tempURI) return
      setIsLoading(true)
      const uploadURL = await uploadImageAsync(tempURI)
      if (!uploadURL) throw new Error("could not upload image")
      const newData = { profilePicture: uploadURL }
      await updateSignedInUserData(userId, newData)
      dispatch(updateLoggedinUserData({ newData: newData }))
      setImage(uploadURL)
    } catch (error) {
      if (__DEV__) console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      {!isLoading ? (
        <View
          style={{
            ...{ width: props.size, height: props.size },
          }}
        >
          <ActivityIndicator color={Colors.primary} style={styles.loader} />
        </View>
      ) : (
        <Image
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
          src={image}
        />
      )}
      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={15} color={"black"} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  loader: {
    padding: "25%",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 8,
  },
})

export default ProfileImage
