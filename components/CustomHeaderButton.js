import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { HeaderButton } from "react-navigation-header-buttons"
import colors from "../constants/Colors"

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      color={props.color ?? colors.blue}
    />
  )
}

export default CustomHeaderButton
