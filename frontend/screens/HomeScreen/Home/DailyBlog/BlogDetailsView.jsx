import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const BlogDetailsView = ({ item }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  return (
    <View>
      {item.image ? (
        <TouchableOpacity
          id="ImageView"
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "1%",
            backgroundColor: isLight
              ? LGlobals.ImageBackground
              : DGlobals.ImageBackground,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
          onPress={() => HandleShowImage(item)}
        >
          <Image
            style={{
              resizeMode: "cover",
             // aspectRatio: 2, // imageSize.height
              width: Dimensions.get("window").width, //imageWidth,
              height: 300,
              height:
                imageHeight >= 800
                  ? imageHeight / 6
                  : imageHeight >= 600
                  ? imageHeight / 4
                  : imageHeight >= 500
                  ? imageHeight / 2
                  : imageHeight / 2,

              overflow: "hidden",
            }}
            source={utils.GetImage(item.image)}
            onLoad={(event) => {
              setImageWidth(event.nativeEvent.source.width);
              setImageHeight(event.nativeEvent.source.height);
            }}
            lazy={true}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default BlogDetailsView;

const styles = StyleSheet.create({});
