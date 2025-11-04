import React, { useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import AppNotifView from "./AppNotifView";
import OfficialNotifAppHeader from "./Headers/OfficialNotifAppHeader";

//======================================================================================

const OfficialAppNotif = () => {
  const navigation = useNavigation();
  const [isRead, setIsRead] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);

  const appNotifList = useGlobal((state) => state.appNotifList);
  const appNotifNext = useGlobal((state) => state.appNotifNext);
  const appNotif = useGlobal((state) => state.appNotif);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <OfficialNotifAppHeader />,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View>
        <FlatList
          contentContainerStyle={{}}
          data={appNotifList}
          renderItem={({ item }) => (
            <AppNotifView navigation={navigation} item={item} />
          )}
          onEndReached={() => {
            if (appNotifNext) {
              appNotif(appNotifNext);
              setloading(true);
            }
          }}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size={"small"}
                color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              />
            )
          }
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default OfficialAppNotif;

const styles = StyleSheet.create({});
