import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

function DetailsView({ itemDesc, Desc, image }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return image ? (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: isLight
          ? LNotifs.events.notifLiveView.InforBackgroundColor
          : DNotifs.events.notifLiveView.InforBackgroundColor,
        paddingHorizontal: "3%",
        paddingVertical: "1%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: "hidden",
        borderColor: isLight
          ? LNotifs.events.notifLiveView.InforBorderColor
          : DNotifs.events.notifLiveView.InforBorderColor,
        borderWidth: 0.3,
        paddingHorizontal: "3%",
        marginVertical: "5%",
      }}
    >
      <View
        style={{
          width: "auto",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: 600,
          }}
        >
          {itemDesc}{" "}
          <Text
            style={{
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            |
          </Text>{" "}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: "1%",
          width: "auto",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
          numberOfLines={1}
        >
          {Desc}
        </Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: isLight
          ? LNotifs.events.notifLiveView.InforBackgroundColor
          : DNotifs.events.notifLiveView.InforBackgroundColor,
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
        overflow: "hidden",
        borderColor: isLight
          ? LNotifs.events.notifLiveView.InforBorderColor
          : DNotifs.events.notifLiveView.InforBorderColor,
        borderWidth: 0,
        paddingVertical: "1%",
        paddingHorizontal: "2%",
        marginHorizontal: "3%",
        marginVertical: "2%",
        gap: 20,
      }}
    >
      <View
        style={{
          width: "auto",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: 600,
          }}
        >
          {itemDesc}:
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: "1%",
          width: "auto",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
          numberOfLines={1}
        >
          {Desc}
        </Text>
      </View>

            
    </View>
  );
}

export default DetailsView;

const styles = StyleSheet.create({});
