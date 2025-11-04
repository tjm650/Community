import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import MainHeader from "@/GlobalScreens/MainHeader";

//======================================================================================

function LessonsHeader(params) {
  const [OpenSearch, setOpenSearch] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <MainHeader
      header={
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {OpenSearch ? (
            <View
              id="Searchbar"
              style={{
                paddingVertical: "1%",
                paddingHorizontal: "5%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#3838389a",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
              }}
            >
              <TextInput
                placeholder="Search lessons..."
                placeholderTextColor={"#a5a5a5"}
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  width: "80%",
                }}
              />
              <TouchableOpacity activeOpacity={0.8}>
                <FontAwesomeIcon
                  icon="fa-solid fa-search"
                  size={15}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={{
                fontWeight: "500",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              Lessons
            </Text>
          )}
        </View>
      }
      getView={
        OpenSearch ? (
          ""
        ) : (
          <FontAwesomeIcon
            icon={"fa-solid fa-person-chalkboard"}
            size={20}
            color={isLight ? LGlobals.text : DGlobals.icon}
          />
        )
      }
    />
  );
}

export default LessonsHeader;

const styles = StyleSheet.create({});
