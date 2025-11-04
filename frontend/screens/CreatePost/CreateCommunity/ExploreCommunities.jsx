import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { communities } from "@/DammyData";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicate from "../../GlobalScreens/ActivityIndicate";
import MainHeader from "../../GlobalScreens/MainHeader";
import ExploreCommunityView from "./ExploreCommunityView";

const ExploreCommunities = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(true);

  const directoryList = useGlobal((state) => state.directoryList);

  useEffect(() => {
    directoryList;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Explore Communities
            </Text>
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "1%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {communities === null ? (
        <ActivityIndicate size={60} color={"#0D99FF"} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={communities}
          renderItem={({ item }) => <ExploreCommunityView item={item} />}
          onRefresh={() => LoadEvents()}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          style={{}}
        />
      )}
    </SafeAreaView>
  );
};

export default ExploreCommunities;

const styles = StyleSheet.create({});
