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

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import LinkView from "../NetworkPage/LinkView";

const LatestInternship = ({ data }) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenMessage() {
    navigation.navigate("NetworkPage", data);
  }

  return (
    <TouchableOpacity
      onPress={OpenMessage}
      activeOpacity={0.7}
      style={{
        maxWidth: Dimensions.get("window").width * 0.9,
        minWidth: Dimensions.get("window").width * 0.6,
        backgroundColor: isLight ? "#00000020" : "#05778b2d",
        borderRadius: 15,
        gap: 5,
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginRight: 15,
        // borderWidth: 0.3,
        borderColor: "#d0d0d0",
        overflow: "hidden",
        // height: 200,
      }}
    >
      <View style={{}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          {data.CompanyName}
        </Text>
      </View>
      <View style={{}}>
        {data.emailAdress && (
          <LinkView
            icon={"fa-solid fa-water"}
            Infor={data.emailAdress}
            isLight={isLight}
          />
        )}
      </View>
      <View style={{}}>
        <Text
          numberOfLines={1}
          style={{
            color: "#fff",
          }}
        >
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LatestInternship;

const styles = StyleSheet.create({});
