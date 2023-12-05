import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import CustomHeaderButton from "../components/CustomHeaderButton"
import Colors from "../constants/Colors"
import PageContainer from "../tools/PageContainer"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import commonStyles from "../constants/commonStyles"
import { searchUsers } from "../utils/actions/userActions"
import { isIOS } from "../helpers/helpers"
import DataItem from "../components/DataItem"

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

      const userResult = await searchUsers(searchTerm)
      setUsers(userResult)

      if (Object.keys(userResult).length === 0) {
        setNoResultsFound(true)
      } else {
        setNoResultsFound(false)
      }
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [searchTerm])
  return (
    <PageContainer>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100} // pushed the view above the keyboard more
        style={styles.keyboardAvoidingView}
        behavior={isIOS ? "height" : undefined} // fixes hidden inputs for iOS
      >
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={15} color={Colors.lightGray} />
          <TextInput
            placeholder="Search"
            style={styles.searchBox}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

        {isLoading && (
          <View style={commonStyles.center}>
            <ActivityIndicator size={"large "} color={Colors.primary} />
          </View>
        )}

        {!isLoading && !noResultsFound && users && (
          <FlatList
            data={Object.keys(users)}
            renderItem={(itemData) => {
              const userId = itemData.item
              // use the array of IDs '('Object.keys(users)' to match IDs of objects 'users'
              const userData = users[userId]
              return <DataItem />
            }}
          />
        )}

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
            <View style={styles.border}>
              <View style={styles.alertContainer}>
                <FontAwesome
                  name="users"
                  size={55}
                  color={Colors.blue}
                  style={styles.noResultsIcon}
                />
                <Text style={styles.noResultsText}>
                  Enter a name to search for a user!
                </Text>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: Colors.extraLightGray,
    alignItems: "center",
    display: "flex",
    padding: 20,
    borderRadius: 10,
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.blue,
    padding: 10,
    borderRadius: 10,
    borderStyle: "dashed",
  },
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
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
})

export default NewChatScreen
