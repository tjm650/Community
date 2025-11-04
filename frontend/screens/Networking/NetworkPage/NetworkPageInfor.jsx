import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
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
import NetworkPageRating from "./NetworkPageRating";
//======================================================================================

function Stars(params) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity activeOpacity={0}>
      <FontAwesomeIcon
        icon="fa-regular fa-star"
        size={20}
        color={isLight ? LGlobals.text : DGlobals.lighttext}
      />
    </TouchableOpacity>
  );
}

const NetworkPageInfor = ({ name, stats, height }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showRating, setShowRating] = useState(false);

  return (
    <View style={{}}>
      <Text
        style={{
          fontWeight: 600,
          marginBottom: "1%",
          color: isLight ? LGlobals.text : DGlobals.lighttext,
        }}
      >
        Shared by
      </Text>

      <View
        style={{
          backgroundColor: "#6d6d6d25",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          paddingHorizontal: "1%",
          paddingVertical: "1%",
        }}
      >
        <View
          id="Top View"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              width: "80%",
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                alignItems: "center",
                overflow: "hidden",
                backgroundColor: isLight ? "gray" : "#586d71d8",
                borderWidth: 1,
                borderColor: isLight ? "gray" : "#586d71d8",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                size={12}
                color="#d0d0d0"
              />
            </View>

            <Text
              numberOfLines={1}
              id="CommunityName"
              style={{
                width: "90%",
                fontWeight: 600,
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowRating((value) => (value = true))}
            activeOpacity={0.6}
            style={{
              borderTopRightRadius: 7,
              borderTopLeftRadius: 7,
              borderBottomRightRadius: 7,
              borderBottomLeftRadius: 7,
              backgroundColor: "#6d6d6d46",
              paddingHorizontal: "2%",
              paddingVertical: "1%",
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 12,
                fontWeight: 500,
                color: "goldenrod",
              }}
            >
              Rate Here
            </Text>
          </TouchableOpacity>
        </View>

        {showRating && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: "5%",
              marginVertical: "2%",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                fontWeight: 700,
              }}
            >
              Rate
            </Text>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Stars />
              <Stars />
              <Stars />
              <Stars />
              <Stars />
            </View>
          </View>
        )}
      </View>
      <NetworkPageRating stats={stats} height={height} />
    </View>
  );
};

export default NetworkPageInfor;

const styles = StyleSheet.create({});
