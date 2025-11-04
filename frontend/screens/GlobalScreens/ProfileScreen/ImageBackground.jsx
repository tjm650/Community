import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import utils from "../../../assets/core/utils";

const ImageBackground = ({ coverImage, email }) => {
  return (
    <View>
      {coverImage && (
        <Image
          style={{
            position: "absolute",
            width: "100%",
            height: Dimensions.get("window").width * 0.4,
            //backgroundColor: "#76767648",
            zIndex: 0,
            resizeMode: "cover",
          }}
          source={utils.GetImage(coverImage)}
        />
      )}

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: Dimensions.get("window").width * 0.4,   
          zIndex: 1,
          backgroundColor: coverImage ? "#" : "transparent",
        }}
      />
    </View>
  );
};

export default ImageBackground;

const styles = StyleSheet.create({});
