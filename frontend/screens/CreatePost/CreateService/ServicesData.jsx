import React from "react";
import { StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import CreatePostRBSheet from "../PostMethods/CreatePostRBSheet";
import ServiceView from "./ServiceView";


const ServicesData = ({ handleSelectService, SelectedServices }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const directoryList = useGlobal((state) => state.directoryList);
  const user = useGlobal((state) => state.user);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <CreatePostRBSheet
          SheetName={"Services"}
          Data={directoryList}
          renderItem={({ item }) =>
            item.directory_status1 !== "Bloger" &&
            item.creator.username === user.username ? (
              <ServiceView
                item={item}
                handleSelect={(item) => handleSelectService(item)}
                SelectedServices={SelectedServices}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default ServicesData;

const styles = StyleSheet.create({});
