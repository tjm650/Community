import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNavScreens } from "@/constants/DarkColor/DNavScreens";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNavScreens } from "@/constants/LightColor/LNavScreens";

//======================================================================================

//////////////////// Imports //////////////////
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";

//////////////////// Local Imports //////////////////
import useGlobal from "@/assets/common/core/useGlobal";
import BottomNav from "./BottomNav";

////////////////// Screens//////////////////
import DrawerOptions from "@/screens/DrawerScreens/DrawerOptions";
import DrawerProfileRB from "@/screens/DrawerScreens/DrawerProfileRB";
import DrawerSubOptions from "@/screens/DrawerScreens/DrawerSubOptions";
import AppDescription from "@/screens/DrawerScreens/TermsAndConditions/AppDescription";
import TermsAndConditions from "@/screens/DrawerScreens/TermsAndConditions/TermsAndconditions";
import TopDetails from "@/screens/DrawerScreens/TopDetails";

export default function Drawer() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  ////////////////// Local States //////////////////
  const user = useGlobal((state) => state.user);
  // const socketConnect = useGlobal((state) => state.socketConnect);
  const { theme, AppTheme, setTheme } = useGlobal();
  let isLight = theme === "light";

  ////////////////// Functions //////////////////
  useEffect(() => {
    user;
  });

  /////////////////////////////////////////////////////////////////////////////////
  return (
    <Drawer.Navigator
    
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <TopDetails user={user} />

            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: "5%",
                marginTop: "5%",
                paddingBottom: "5%",
                gap: 20,
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,
                height: "100%",
              }}
            >
              <Text
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  fontWeight: "700",
                  fontSize: 17,
                  color: isLight ? LGlobals.icon : DGlobals.icon,
                  paddingHorizontal: "5%",
                  height: 30,
                }}
              >
                Account
              </Text>
              <DrawerOptions />
              <DrawerSubOptions />
              <TermsAndConditions />
              <AppDescription />
            </ScrollView>

            <View style={{ height: 50 }} />

            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          height: 10, // Set header height
        },
        drawerType:"front",
        drawerPosition:"left",
        drawerStyle: {
          width: "90%",
          height: "100%",
          backgroundColor: isLight
            ? LNavScreens.Drawer.DrawerbackgroundColor
            : DNavScreens.Drawer.DrawerbackgroundColor,
        },
      }}
    >
      <Drawer.Screen
        options={{
          headerShadowVisible: false,
          headerShown: false,
          drawerLabelStyle: {
            color: isLight ? LGlobals.text : DGlobals.text,
            marginLeft: "0",
            textTransform: "capitalize",
          },

          drawerActiveBackgroundColor: isLight
            ? LNavScreens.Drawer.DrawerbackgroundColor
            : DNavScreens.Drawer.DrawerbackgroundColor,
          drawerItemStyle: {
            position: "absolute",
            bottom: 0,
            width: "90%",
            height: 50,
            marginBottom: "2%",
          },
          drawerIcon: () => <DrawerProfileRB />,
        }}
        name={`${user.name}`}
        component={BottomNav}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
