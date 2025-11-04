import { MaterialIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicate from "../GlobalScreens/ActivityIndicate";
import EmptyScreen from "../GlobalScreens/EmptyScreen";
import CheckClientType from "../GlobalScreens/CheckClientType";

//////////////////////// Functions ////////////////////

function ConnectTopView() {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const translateX = new Animated.Value(100);
  const duration = 800;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: "5%",
        paddingVertical: "1%",
        marginBottom: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "700",
          color: isLight ? LGlobals.text : DGlobals.text,
        }}
      >
        Connects
      </Text>

      {visible ? (
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("SearchConnects")}
            style={{
              flexDirection: "row",
              color: isLight ? LGlobals.text : DGlobals.text,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
              paddingVertical: "1%",
              paddingHorizontal: "3%",
              borderRadius: 20,
              alignItems: "center",
              borderWidth: 0.3,
              borderColor: isLight
                ? LGlobals.borderColor
                : DGlobals.borderColor,
              gap: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: isLight ? DGlobals.text : DGlobals.text,
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,
                paddingVertical: "1%",
                paddingHorizontal: "3%",
                borderRadius: 20,
              }}
            >
              Search for connects
            </Text>
            <MaterialIcons
              name="person-search"
              size={25}
              color={isLight ? DGlobals.text : DGlobals.text}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("SearchConnects")}
          style={{
            flexDirection: "row",
            color: isLight ? LGlobals.text : DGlobals.text,
            paddingVertical: "1%",
            paddingHorizontal: "3%",
            borderRadius: 20,
            alignItems: "center",
            gap: 5,
          }}
        >
          <MaterialIcons
            name="person-search"
            size={25}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function NoConnects() {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        height: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "30%",
      }}
    >
      <EmptyScreen
        icon={
          <FontAwesomeIcon
            icon="fa-solid fa-address-book"
            size={50}
            color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
          />
        }
        btn={true}
        marginBottom={50}
        OnPressText={"Find Connects"}
        onPress={() => navigation.navigate("SearchConnects")}
        color={isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground}
        text={"You don't have any connects"}
      />
    </View>
  );
}

function Connecter({ isLight }) {
  return (
    <Text
      numberOfLines={1}
      style={{
        fontWeight: "500",
        color: isLight ? LGlobals.greyText : DGlobals.greyText,
      }}
    >
      |
    </Text>
  );
}

///////////// Show if Connected /////////////////////////////////
const Connected = ({ item }) => {
  const requestConnect = useGlobal((state) => state.requestConnect);
  const { theme } = useGlobal();
  let isLight = theme === "light";
  // add a tick if user already connected
  return (
    <View
      style={{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
      }}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-user-check"
        size={25}
        color={isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground}
      />
    </View>
  );
};

const GetStated = "Search for Connects";

const ConnectView = ({ item }) => {
  const navigation = useNavigation();
  const ConnectList = useGlobal((state) => state.ConnectList);
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MesssageInbox", item)}
      activeOpacity={0.5}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: "1%",
        borderBottomColor: "#d0d0d0",
        borderBottomWidth: 0,
        paddingVertical: "1%",
        marginBottom: "3%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden",
          width: "95%",
          maxWidth: "95%",
          // backgroundColor:"yellow"
        }}
      >
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 45,
            borderColor: "#d0d0d0",
            borderWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#d0d0d0",
            backgroundColor: "#5a5a5b",
            overflow: "hidden",
          }}
        >
          <View>
            {item.connect.profile_image ? (
              <Image
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                }}
                source={utils.GetImage(item.connect.profile_image)}
              />
            ) : (
              <FontAwesomeIcon
                icon=" fa-solid fa-user"
                size={30}
                color={DGlobals.icon}
                style={{
                  marginTop:"25%"
                }}
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginLeft: "5%",
            width: "90%",
          }}
        >
          <CheckClientType
            DirectoryView={
              <View
              // style={{
              //   marginLeft: "5%",
              //   width: "90%",
              // }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: "500",
                    color: isLight ? LGlobals.text : DGlobals.text,
                  }}
                >
                  {item.connect.name}
                </Text>
              </View>
            }
            directoryStatus={item.connect.directory_status1}
            verified={item.connect.verified}
          />

          <View
            style={{
              marginTop: "1%",
              flexDirection: "row",
              width: "90%",
              flexWrap: "wrap",
            }}
          >
            <Text
              numberOfLines={3}
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              }}
            >
              {item.connect.directory_status1}{" "}
              {item.connect.prof_initial && <Connecter isLight={isLight} />}{" "}
            </Text>

            {item.connect.prof_initial && (
              <Text
                numberOfLines={3}
                style={{
                  color: isLight ? LGlobals.icon : DGlobals.icon,
                }}
              >
                {item.connect.prof_initial + " •"}{" "}
                {item.connect.program === null && item.connect.program + "•"}
                {item.connect.profession}
              </Text>
            )}
          </View>
        </View>
      </View>
      {/* <Connected /> */}
    </TouchableOpacity>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Connects = () => {
  const navigation = useNavigation();
  const ConnectList = useGlobal((state) => state.ConnectList);
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <ConnectTopView />
      {ConnectList === null ? (
        // Show loading Indicator
        <View
          style={{
            paddingVertical: "5%",
          }}
        >
          <ActivityIndicate flex={false} size={30} color={"#0D99FF"} />
        </View>
      ) : ConnectList.length === 0 ? (
        // Show Empty if no requests
        <NoConnects />
      ) : (
        // Show requests list
        <View>
          <FlatList
            data={ConnectList}
            renderItem={({ item }) => (
              <ConnectView navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Connects;

const styles = StyleSheet.create({});
