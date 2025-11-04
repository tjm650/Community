import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import ProfileImage from "../GlobalScreens/ProfileImage";

//======================================================================================

const HomeSearchTopView = ({ message, setMessage }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        paddingHorizontal: "3%",
        paddingTop: "3%",
        paddingBottom: "2%",
        alignItems: "center",
        flexDirection: "row",
        gap: 25,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View>
        <ProfileImage />
      </View>

      <View
        style={{
          flex: 1,
          width: "65%",
          height: 35,
          backgroundColor: "#43515346",
          borderRadius: 25,
          paddingHorizontal: "7%",
          marginRight: "10%",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <TextInput
          // ref={textInputRef}
          style={{
            height: "100%",
            width: "100%",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
          placeholder="Community"
          placeholderTextColor={
            isLight ? LGlobals.lighttext : LGlobals.lighttext
          }
          value={message}
          onChangeText={setMessage}
        />
        <Pressable>
          <FontAwesome
            name="search"
            size={15}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeSearchTopView;

const styles = StyleSheet.create({});
