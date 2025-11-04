import React from "react";
import { StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import LinkView from "./LinkView";



const NetworkPageDetails = ({
  description,
  emailAdress,
  Address,
  location,
  locationDetails,
  website,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      id="Top View"
      style={{
        paddingHorizontal: "1%",
        marginVertical: "3%",
          gap: 15,
      }}
    >

        {website && (
          <LinkView
            icon={"fa-solid fa-earth"}
            Infor={website}
            isLight={isLight}
          />
        )}

        {emailAdress && (
          <LinkView
            icon={"fa-solid fa-water"}
            Infor={emailAdress}
            isLight={isLight}
          />
        )}

        {location && (
          <LinkView
            icon={"fa-solid fa-location"}
            Infor={locationDetails}
            isLight={isLight}
          />
        )}

        {Address && (
          <LinkView
            icon={"fa-solid fa-location-dot"}
            Infor={Address}
            isLight={isLight}
          />
        )}
    </View>
  );
};

export default NetworkPageDetails;

const styles = StyleSheet.create({});
