import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================
import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import MoreInfoSheet from "../../GlobalScreens/RBSheets/MoreInfoSheet";

function RatingView({ item }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: "2%",
      }}
    >
      <View
        key={(item) => item.id}
        style={{
          width: "100%",
          height: 10,
          backgroundColor: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          width: Dimensions.get("window").width * 0.8,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <View
          style={{
            width: item.rating * Dimensions.get("window").width * 0.8,
            height: 10,
            backgroundColor: "goldenrod",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
          }}
        ></View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            textAlignVertical: "center",
            fontWeight: 600,
          }}
          key={(item) => item.id}
        >
          {item.year}
        </Text>
      </View>
    </View>
  );
}

function Stars({ rateCount }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity activeOpacity={1}>
      <FontAwesomeIcon
        icon={`fa-${rateCount} fa-star`}
        size={20}
        color={
          rateCount === "solid"
            ? "goldenrod"
            : isLight
            ? LGlobals.text
            : DGlobals.lighttext
        }
      />
    </TouchableOpacity>
  );
}

const NetworkPageRating = ({ height, stats }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View>
      <View>
        <Text
          style={{
            fontWeight: 600,
            marginBottom: "1%",
            color: isLight ? LGlobals.text : DGlobals.lighttext,
          }}
        >
          Review for the past 5 years
        </Text>

        {stats.slice(-6, -1).map((item) => (
          <RatingView item={item} />
        ))}
      </View>

      <View>
        <Text
          style={{
            fontWeight: 600,
            marginBottom: "1%",
            color: isLight ? LGlobals.text : DGlobals.lighttext,
          }}
        >
          Overall
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Stars rateCount={"solid"} />
            <Stars rateCount={"solid"} />
            <Stars rateCount={"solid"} />
            <Stars rateCount={"regular"} />
            <Stars rateCount={"regular"} />
          </View>

          <TouchableOpacity
            style={{
              marginRight: "5%",
            }}
          >
            <MoreInfoSheet
              GetIcon={
                <FontAwesomeIcon
                  icon="fa-solid fa-info"
                  size={12}
                  color="red"
                />
              }
              GetView={
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: "2%",
                      paddingVertical: "1%",
                      color: isLight ? LGlobals.greyText : DGlobals.greyText,
                    }}
                  >
                    Reviews show an account's yearly rating on sharing
                    internships.
                  </Text>
                </View>
              }
              height={height}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NetworkPageRating;

const styles = StyleSheet.create({});
