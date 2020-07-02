import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addPhoto } from "../redux/actions";

function UserProfile({ navigation, users, addPhoto }) {
  function storeSelectedPhoto(photo) {
    addPhoto(photo);
  }

  function renderProfileImage(users) {
    if (users && users.profile_image) {
      return (
        <Image
          source={{
            uri: users.profile_image.small
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8
          }}
        />
      );
    } else {
      return <View />;
    }
  }

  function renderProfileName(users) {
    if (users && users.name) {
      return <Text style={styles.userNameText}>{users.name}</Text>;
    } else {
      return <Text>User has not entered a name</Text>;
    }
  }

  function renderProfileBio(users) {
    if (users && users.name) {
      return <Text style={styles.userBioText}>{users.bio}</Text>;
    } else {
      return <Text>Bio empty</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      {renderProfileImage(users)}
      <View style={styles.spacer} />

      {renderProfileName(users)}
      <View style={styles.spacer} />

      {renderProfileBio(users)}
      {users.photos && users.photos.length > 0 && (
        <FlatList
          style={styles.photos}
          data={Object.values(users.photos)}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.userItemDisplay}
                onPress={() => {
                  storeSelectedPhoto(item.urls.regular);
                  navigation.navigate("ImageViewScreen");
                }}
              >
                <Image
                  source={{
                    uri: item.urls.small
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const mapStateToProps = state => {
  const { users } = state;
  return { users };
};

const UserProfileScreen = connect(
  mapStateToProps,
  { addPhoto }
)(UserProfile);

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  userItemDisplay: {
    width: 200,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  photos: {
    flex: 1
  },
  spacer: {
    width: "100%",
    flex: 0.02
  },
  userNameText: {
    fontWeight: "600",
    width: "90%",
    textAlign: "center"
  },
  userBioText: {
    fontWeight: "400",
    width: "90%",
    textAlign: "center"
  }
});
