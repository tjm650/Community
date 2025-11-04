import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
  
  // ========================== Colors ==========================================//
  // ============= Dark ============================//
  
  //import { Globals } from "../..//Light";
  import { DGlobals } from "@/constants/DarkColor/DGlobals";
  
  // ============= Light ============================//
  
  //import { Globals } from "../..//Light";
  import { LGlobals } from "@/constants/LightColor/LGlobals";
  
  //======================================================================================
  
  import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import ConnectsScreenTopView from "../TopViews/ConnectsScreenTopView";
import Connects from "./Connects";
import Requests from "./Requests";
  
  const ConnectsScreen = () => {
    const navigation = useNavigation();
    const [openSearch, setOpenSearch] = useState(false);
    const [leftScroll, setLeftScroll] = useState(false);
  
    const { theme } = useGlobal();
    let isLight = theme === "light";
  
    function TopNav() {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}
          style={{
            width: Dimensions.get("window").width,
            backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          }}
        >
          <View
            style={{
              alignItems: "center",
              width: Dimensions.get("window").width,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              Requests
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
            }}
          >
            {openSearch === false ? (
              <View
                style={{
                  width: "90%",
                  height: "auto",
                  borderRadius: 25,
                  backgroundColor: "#d0d0d0",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  paddingHorizontal: "5%",
                }}
              >
                <TextInput
                  style={{
                    paddingVertical: "2%",
                    marginHorizontal: "5%",
                  }}
                  placeholder="Search Connects"
                  value={query}
                  onChangeText={setQuery}
                />
                <Text
                  onPress={() => setOpenSearch((value) => !value)}
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  Exit
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "flex-start",
                  width: Dimensions.get("window").width,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: "3%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Connects
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setOpenSearch((value) => !value)}
                >
                  <FontAwesome name="search" size={19} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      );
    }
  
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => <ConnectsScreenTopView />,
      });
    }, []);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        }}
      >
        <ScrollView
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          indicatorStyle="#687390"
          scrollIndicatorInsets={20}
          horizontal={true}
        >
          <View
            id=""
            style={{
              width: Dimensions.get("window").width,
              paddingHorizontal: "1%",
            }}
            focusable={true}
            onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
          >
            <Requests />
          </View>
          <View
            id=""
            style={{
              width: Dimensions.get("window").width,
              paddingHorizontal: "1%",
            }}
          >
            <Connects />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ConnectsScreen;
  
  const styles = StyleSheet.create({});
  