  import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


function CommunityInforView({ time }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        paddingHorizontal: "1%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1%",
        gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              fontWeight: "600",
              width: "60%",
            }}
          >
            @sportsandentertaint
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 0,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                235
              </Text>
              <Pressable>
                <EvilIcons
                  name="heart"
                  size={25}
                  color={isLight ? LGlobals.text : DGlobals.text}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: "1%",
          marginHorizontal: "2%",
          borderRadius: 7,
          gap: 2,
        }}
      >
        <View style={{}}>
          <FontAwesomeIcon
            icon="fa-solid fa-user-shield"
            size={15}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </View>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
}

export default CommunityInforView;

const styles = StyleSheet.create({});
