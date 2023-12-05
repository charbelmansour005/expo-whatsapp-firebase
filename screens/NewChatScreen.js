import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import SafeAreaiOS from "../tools/SafeAreaiOS"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import CustomHeaderButton from "../components/CustomHeaderButton"
import Colors from "../constants/Colors"
import PageContainer from "../tools/PageContainer"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import commonStyles from "../constants/commonStyles"
import { searchUsers } from "../utils/actions/userActions"

const NewChatScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState()
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        )
      },
      headerTitle: "New Chat",
    })
  }, [])

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers()
        setNoResultsFound(false)
        return
      }

      setIsLoading(true)

      // setUsers({})
      // setNoResultsFound(true)
      const userResult = await searchUsers(searchTerm)
      console.log(userResult)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [searchTerm])

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={Colors.lightGray} />
        <TextInput
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {!isLoading && noResultsFound && (
        <View style={commonStyles.center}>
          <FontAwesome5
            name="question"
            size={55}
            color={Colors.lightGray}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>No users found!</Text>
        </View>
      )}

      {!isLoading && !users && (
        <View style={commonStyles.center}>
          <FontAwesome
            name="users"
            size={55}
            color={Colors.lightGray}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>
            Enter a name to search for a user!
          </Text>
        </View>
      )}
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.extraLightGray,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: "100%",
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: Colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
})

export default NewChatScreen
