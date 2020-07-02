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

function UserProfile({ navigation, currentUser, addPhoto }) {
  function storeSelectedPhoto(photo) {
    addPhoto(photo);
  }

  function renderProfileImage(currentUser) {
    if (currentUser && currentUser.profile_image) {
      return (
        <Image
          source={{
            uri: currentUser.profile_image.small
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

  function renderProfileName(currentUser) {
    if (currentUser && currentUser.name) {
      return <Text style={styles.userNameText}>{currentUser.name}</Text>;
    } else {
      return <Text>User has not entered a name</Text>;
    }
  }

  function renderProfileBio(currentUser) {
    if (currentUser && currentUser.name) {
      return <Text style={styles.userBioText}>{currentUser.bio}</Text>;
    } else {
      return <Text>Bio empty</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      {renderProfileImage(currentUser)}
      <View style={styles.spacer} />

      {renderProfileName(currentUser)}
      <View style={styles.spacer} />

      {renderProfileBio(currentUser)}
      {currentUser.photos && currentUser.photos.length > 0 && (
        <FlatList
          style={styles.photos}
          data={Object.values(currentUser.photos)}
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
  const { currentUser } = state;
  return { currentUser };
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
