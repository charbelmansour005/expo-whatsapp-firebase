import { StyleSheet, Text, TextInput, View } from "react-native"
import Colors from "../constants/Colors"
import { useState } from "react"

const Input = ({
  label = "",
  icon,
  iconSize,
  errorText,
  onInputChange,
  initialValue,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  const onChangeText = (text) => {
    setValue(text)
    onInputChange(props.id, text)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && props.iconPack && (
          <props.iconPack
            name={icon}
            size={iconSize || 15}
            color={Colors.gray}
          />
        )}
        <TextInput
          {...props}
          onChangeText={onChangeText}
          style={styles.input}
          value={value}
        />
      </View>
      {errorText ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 2,
    backgroundColor: Colors.nearlyWhite,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: Colors.text,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
    paddingHorizontal: 10,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
})

export default Input
