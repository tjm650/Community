import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

const PostInboxHeader = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <MainHeader
      header={
        <View
          id="ContactPostScreenTopView"
          style={{
            paddingHorizontal: "5%",
            alignItem: "center",
            justifyContent: "center",
            flex:1
          }}
        >
          <View
            style={{
              alignSelf: "center",
            }} 
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "bold",
                fontStyle: "normal",
                textAlign: "center",
              }}
            >
              Post
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default PostInboxHeader;

const styles = StyleSheet.create({});
