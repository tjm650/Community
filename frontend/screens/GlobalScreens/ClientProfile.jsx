import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const ClientProfile = ({ profileImage, clientName, width, height }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <TouchableOpacity
        style={{
          minHeight: 20,
          minWidth: 20,
          width: width,
          height: height,
          overlayColor: "#d0d0d0",
          borderRadius: 50,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          justifyContent: "center",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        {profileImage ? (
          <View>
            <Image
              style={{
                resizeMode: "cover",
                minHeight: 20,
                minWidth: 20,
                width: width,
                height: height,
              }}
              source={utils.GetImage(profileImage)}
              // source={user.image}
            />
          </View>
        ) : (
          <View>
            {/* <FontAwesomeIcon
              icon="fa-solid fa-circle-user"
              size={height || 20}
              color="#d0d0d0"
            /> */}

             <Ionicons name="person"
             size={height || 20}
              color="#d0d0d0"
             />
                                  
          </View>
        )}
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {clientName}
        </Text>
      </View>
    </View>
  );
};

export default ClientProfile;

const styles = StyleSheet.create({});
