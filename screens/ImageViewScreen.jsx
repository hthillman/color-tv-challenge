import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";

function ImageView({ photos }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: photos.payload
        }}
        style={styles.fullScreenImage}
      />
    </View>
  );
}

const mapStateToProps = state => {
  const { photos } = state;
  return { photos };
};

const ImageViewScreen = connect(mapStateToProps)(ImageView);

export default ImageViewScreen;

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
  fullScreenImage: {
    flex: 1,
    width: "100%",
    height: "100%",

    resizeMode: "contain"
  }
});
