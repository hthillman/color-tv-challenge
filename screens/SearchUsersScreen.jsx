import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Keyboard,
  Dimensions
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addUser } from "../redux/actions";
import { client_id } from "../env";

function SearchUsers({ navigation, users, addUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [userResults, setUserResults] = useState([]);

  async function searchUsers(searchText) {
    let ROOT = `https://api.unsplash.com/search/users/`;
    let KEY = `?client_id=${client_id}`;
    let PERPAGE = `&per_page=20`;

    const url = `${ROOT}${KEY}${PERPAGE}&page=1&query=${searchText}`;
    let users = await axios.get(url);

    setUserResults(users.data.results);
  }

  function storeSelectedUser(user) {
    addUser(user);
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchTextInput}
          onChangeText={input => setSearchTerm(input)}
          placeholder="Search Name"
          placeholderTextColor="#77787b"
        />
        <View style={{ width: 10 }} />
        <TouchableOpacity
          style={styles.searchSubmit}
          onPress={() => {
            Keyboard.dismiss();
            searchUsers(searchTerm);
          }}
        >
          <Text style={styles.searchSubmitText}>Search</Text>
        </TouchableOpacity>
      </View>
      {userResults.length > 0 && (
        <FlatList
          style={styles.searchResults}
          data={userResults}
          numColumns={2}
          keyboardShouldPersistTaps="never"
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.userItemDisplay}
                onPress={() => {
                  storeSelectedUser(item);
                  navigation.navigate("UserProfileScreen");
                }}
              >
                <Image
                  source={{
                    uri: item.profile_image.small
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8
                  }}
                />
                <Text style={styles.resultNames}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {/* {users &&
        Object.values(users).map(user => {
          return <Text style={styles.title}>{user}</Text>;
        })} */}
    </View>
  );
}

const mapStateToProps = state => {
  const { users } = state;
  return { users };
};

const SearchUsersScreen = connect(
  mapStateToProps,
  { addUser }
)(SearchUsers);
export default SearchUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  searchBar: {
    flex: 0.1,
    width: "90%",
    height: 120,
    flexDirection: "row"
  },
  searchTextInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 20
  },
  searchSubmit: {
    flex: 1,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center"
  },
  searchSubmitText: {
    color: "blue",
    paddingLeft: 10,
    paddingRight: 10
  },
  searchResults: {
    flex: 1,
    width: "100%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  spacer: {
    flex: 0.02,
    width: "100%"
  },
  userItemDisplay: {
    width: Dimensions.get("window").width / 2,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  resultNames: {
    fontWeight: "600"
  }
});
