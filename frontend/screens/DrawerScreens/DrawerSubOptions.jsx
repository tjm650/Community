import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import useGlobal from "@/assets/core/useGlobal";
import { Feather } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

function SubOptionView({ icon, option, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        gap: 15,
        alignItems: "center",
        marginBottom: 5,
      }}
    > 
      <View>{icon}</View>
      <View>
        <Text
          style={{
            fontWeight: "600",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function DrawerSubOptions({}) {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenFeedbackScreen(params) {
    navigation.navigate("Feedback");
  }

  return (
    <View>
      <SubOptionView
        icon={
          <Feather
            name="settings"
            size={15}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"Settings"}
      />
      <SubOptionView
        onPress={OpenFeedbackScreen}
        icon={
          <FontAwesomeIcon
            icon="fa-regular fa-comments"
            size={15}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"feedback"}
      />
    </View>
  );
}

export default DrawerSubOptions;

const styles = StyleSheet.create({});
