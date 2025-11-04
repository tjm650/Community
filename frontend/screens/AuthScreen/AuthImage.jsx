import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const AuthImage = ({
  space = true,
  register = true,
  isMeteor = false,
  size,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  
  // Calculate responsive logo size
  const logoSize = Math.min(screenWidth * 0.4, screenHeight * 0.15);
  
  return isMeteor ? (
    <View 
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "auto",
        marginBottom: space ? 0 : "20%",
        position: "absolute",
        top: "5%",
      }}
    >
      <Image
        source={require("../../assets/images/community-logo.png")}
        style={{
          width: logoSize,
          height: logoSize,
          resizeMode: "contain",
        }}
      />
    </View>
  ) : (
    <FontAwesomeIcon
      icon="fa-solid fa-meteor"
      size={size}
      color={"white"}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: register ? "5%" : "40%",
        width: "100%",
        height: "auto",
        marginBottom: space ? 0 : "10%",
      }}
    />
  );
};

export default AuthImage;

const styles = StyleSheet.create({});
