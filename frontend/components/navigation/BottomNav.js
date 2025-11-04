import { AntDesign } from "@expo/vector-icons";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "../../constants/DarkColor/DGlobals";
import { DNavScreens } from "../../constants/DarkColor/DNavScreens";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "../../constants/LightColor/LGlobals";
import { LNavScreens } from "../../constants/LightColor/LNavScreens";

//======================================================================================

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import useGlobal from "@/assets/core/useGlobal";

//////////////////// Home-Screens //////////////////
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";
import Home from "../../screens/HomeScreen/Home";
import HomeNotifications from "../../screens/HomeScreen/HomeNotifications";
import HomeSearch from "../../screens/HomeScreen/HomeSearch";
// import HomeMonetization from "../../screens/HomeScreen/HomeMonetization";
////////////////////////////////// Functions ////////////////////////////////////////////
function FocusedIconView({ icon }) {
  return (
    <View
      style={{
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#057d8c",
        height: 40,
        borderWidth: 1,
        borderColor: "#d0d0d0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>{icon}</View>
    </View>
  );
}

const BottomNav = ({
  transform,
  borderTopColor = "#333",
  borderTopWidth = 0,
}) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const [focused, setFocused] = useState(false);

  const { theme } = useGlobal();
  const socketConnect = useGlobal((state) => state.socketConnect);
  const socketClose = useGlobal((state) => state.socketClose);
  let isLight = theme === "light";

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);

  return (
    <Tab.Navigator
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.navigate(route.name);
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 15 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          }}
          style={{
            backgroundColor: isLight
              ? LNavScreens.Drawer.DrawerbackgroundColor
              : DNavScreens.Drawer.DrawerbackgroundColor,

            //   isLight
            //   ? LGlobals.BottomTab.backgroundColor
            //   : DGlobals.BottomTab.backgroundColor,
            height: 70,
            position: "absolute",
            overflow: "hidden", // Important for border radius to work
            // elevation: 4, // Android shadow
            // shadowColor: "#000", // iOS shadow
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,

            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            // borderBottomRightRadius: 0,
            // borderBottomLeftRadius: 0,
          }}
          activeIndicatorStyle={{
            backgroundColor: isLight
              ? LGlobals.BottomTab.active
              : DGlobals.BottomTab.active,
          }}
          activeColor={
            isLight
              ? LGlobals.BottomTab.iconOnFocus
              : DGlobals.BottomTab.iconOnFocus
          }
          inactiveColor={
            isLight
              ? LGlobals.BottomTab.iconDefault
              : DGlobals.BottomTab.iconDefault
          }
        />
      )}
      screenOptions={{
        tabBarActiveBackgroundColor: isLight
          ? LGlobals.BottomTab.backgroundColor
          : DGlobals.BottomTab.backgroundColor,
        tabBarInactiveBackgroundColor: isLight
          ? LGlobals.BottomTab.backgroundColor
          : DGlobals.BottomTab.backgroundColor,
        tabBarHideOnKeyboard: true,
        tabBarStyle: transform,
        tabBarActiveTintColor: "transparent",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            borderColor: "#333",
            borderTopWidth: 0,
          },

          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TouchableOpacity>
                <AntDesign
                  name="home"
                  size={25}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconOnFocus
                      : DGlobals.BottomTab.iconOnFocus
                  }
                />
              </TouchableOpacity>
            ) : (
              <AntDesign
                name="home"
                size={25}
                color={
                  isLight
                    ? LGlobals.BottomTab.iconDefault
                    : DGlobals.BottomTab.iconDefault
                }
              />
            ),
        }}
      />

      {/** Monetization tab removed as requested */}

      <Tab.Screen
        name="Notifications"
        component={HomeNotifications}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            width: Dimensions.get("window").width,
            borderTopColor: borderTopColor,
            borderTopWidth: borderTopWidth,
          },
          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-bell"
                  size={20}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconOnFocus
                      : DGlobals.BottomTab.iconOnFocus
                  }
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-regular fa-bell"
                  size={20}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconDefault
                      : DGlobals.BottomTab.iconDefault
                  }
                />
              </TouchableOpacity>
            ),
        }}
      />

      {/* <Tab.Screen
        name="Community"
        component={HomeCommunity}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            borderColor: "#333",
            borderTopWidth: 0,
          },

          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  size={20}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconOnFocus
                      : DGlobals.BottomTab.iconOnFocus
                  }
                />
              </TouchableOpacity>
            ) : (
              <FontAwesomeIcon
                icon="fa-regular fa-user"
                size={20}
                color={
                  isLight
                    ? LGlobals.BottomTab.iconDefault
                    : DGlobals.BottomTab.iconDefault
                }
              />
            ),
        }}
      /> */}

      <Tab.Screen
        name="Search"
        component={HomeSearch}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            width: Dimensions.get("window").width,
            borderTopColor: borderTopColor,
            borderTopWidth: borderTopWidth,
          },
          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-solid fa-magnifying-glass-chart"
                  size={20}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconOnFocus
                      : DGlobals.BottomTab.iconOnFocus
                  }
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={"fa-solid fa-search"}
                  size={20}
                  color={
                    isLight
                      ? LGlobals.BottomTab.iconDefault
                      : DGlobals.BottomTab.iconDefault
                  }
                />
              </TouchableOpacity>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
