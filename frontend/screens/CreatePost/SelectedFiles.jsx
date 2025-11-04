import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================
import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const SelectedFiles = ({ image }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [longPressing, setLongPressing] = useState(false);

  function HandleRemoveImage(params) {
    setLongPressing((value) => (value = true));
  }

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={pickImage}
        onLongPress={HandleRemoveImage}
        style={{
          width: "25%",
          height: "auto",
          overflow: "hidden",
          backgroundColor: "black",
          borderWidth: 1,
          borderColor: "#d0d0d0",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          justifyContent: "center",
          backgroundColor:"red"
        }}
      >
        <Image
          style={{
            resizeMode: "cover",
            aspectRatio: 1, // imageSize.height
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#5b5b5b86",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {longPressing ? (
            <FontAwesomeIcon icon="remove" size={15} color="#fff" />
          ) : (
            <FontAwesomeIcon icon="pencil" size={15} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedFiles;

const styles = StyleSheet.create({});
