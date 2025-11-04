import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";

const TrendingItemData = ({ data }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        // maxWidth: Dimensions.get("window").width * 0.4,
        // minWidth: Dimensions.get("window").width * 0.45,
        backgroundColor: isLight ? "#00000020" : "#05778b2d",
        borderRadius: 10,
        marginVertical:"1%",
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 5,
        // marginRight: 15,
        // borderWidth: 0.3,
        borderColor: "#d0d0d0",
        overflow: "hidden",
        justifyContent: "space-between",
        height: data.image && Dimensions.get("window").height * 0.2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 35,
            borderWidth: 0.5,
            borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 35,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,

              borderWidth: 0,
              borderColor: isLight
                ? LGlobals.borderColor
                : DGlobals.borderColor,
              resizeMode: "contain",
            }}
            source={data.Profileimg}
          />
        </View> */}
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "800",
            flexWrap: "wrap",
            width: Dimensions.get("window").width * 0.4,
            fontSize: 18,
          }}
        >
          {data.locationName}
        </Text>
      </View>

      {data.image && (
        <TouchableOpacity
          //   onPress={() => HandleShowImage(item)}
          style={{
            width: "auto",
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.45,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              //   aspectRatio: 2, // imageSize.height
              overflow: "hidden",
              borderWidth: 0.3,
              //   borderRadius: 7,
              borderColor: "#646464",
              backgroundColor: isLight
                ? LGlobals.ImageBackground
                : DGlobals.ImageBackground,
            }}
            // source={utils.GetImage(data.image)}
            source={data.image}
          />
        </TouchableOpacity>
      )}

      <View
        style={{
          zIndex: 1,
          alignSelf: "flex-end",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingItemData;

const styles = StyleSheet.create({});
