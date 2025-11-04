import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";

const BackgroundImages = ({ image, image2, onPressImage, onPressImage2 }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.2,
        // width:"100%",
        // backgroundColor: "red",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      {image ? (
        <TouchableOpacity
          onPress={onPressImage}
          activeOpacity={0.8}
          style={{
            height: Dimensions.get("window").height * 0.2,
            backgroundColor: "#76767648",
            aspectRatio: 1,
            overflow: "hidden",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: Dimensions.get("window").height * 0.2,
              backgroundColor: "#76767648",
              resizeMode: "cover",
              aspectRatio: 1,
            }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPressImage}
          activeOpacity={0.8}
          style={{
            height: Dimensions.get("window").height * 0.2,
            backgroundColor: "#76767648",
            aspectRatio: 1,
            overflow: "hidden",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon="mountain-sun"
            size={30}
            color={isLight ? LGlobals.text : DGlobals.text}
          />
        </TouchableOpacity>
      )}

      <View
        style={{
          position: "absolute",
          backgroundColor: isLight ? LGlobals.text : DGlobals.text,
          borderWidth: 0.5,
          borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
          borderRadius: 100,
          overflow: "hidden",
          height: Dimensions.get("window").height * 0.05,
          aspectRatio: 1,
          zIndex: 1,
          //   backgroundColor: "red",
          bottom: 20,
          right: -10,
        }}
      >
        {image2 ? (
          <TouchableOpacity
            onPress={onPressImage2}
            activeOpacity={0.8}
            style={{
              aspectRatio: 1,
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                height: Dimensions.get("window").height * 0.05,
                //backgroundColor: "#76767648",
                aspectRatio: 1,
                zIndex: 10,
                resizeMode: "cover",
              }}
              source={{ uri: image2 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPressImage2}
            activeOpacity={0.8}
            style={{
              aspectRatio: 1,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon="mountain-sun"
              size={20}
              color={isLight ? DGlobals.text : LGlobals.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BackgroundImages;

const styles = StyleSheet.create({});
