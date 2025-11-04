import { Feather } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
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

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

//////////////////////// Local Imports ////////////////////////
import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";

//////////////////////// Import Screens ///////////////////////
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ActivityIndicate from "../GlobalScreens/ActivityIndicate";
import BadgeNotif from "../GlobalScreens/BadgeNotif";
import EmptyScreen from "../GlobalScreens/EmptyScreen";

const Requests = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const logout = useGlobal((state) => state.logout);
  const user = useGlobal((state) => state.user);
  const Cuser = useGlobal((state) => state.user);
  const requestsList = useGlobal((state) => state.requestsList);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  function NoRequests() {
    return (
      <View
        style={{
          height: "100%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-user-tag"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          btn={true}
          marginBottom={50}
          OnPressText={"Find Connects"}
          onPress={() => navigation.navigate("SearchConnects")}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          text={"You don't have any connect requests"}
        />
      </View>
    );
  }
  function RequestAccept({ item }) {
    const requestAccept = useGlobal((state) => state.requestAccept);

    return (
      <TouchableOpacity
        style={{
          borderColor: isLight ? LGlobals.text : DGlobals.text,
          borderWidth: 1,
          paddingHorizontal: "10%",
          height: "auto",
          paddingVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 18,
          minWidth: 70,
        }}
        onPress={() => requestAccept(item.sender.username)}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Accept
        </Text>
      </TouchableOpacity>
    );
  }
  function RequestReject({ item }) {
    const requestDelete = useGlobal((state) => state.requestDelete);

    return (
      <TouchableOpacity
        onPress={() => requestDelete(item.sender.username)}
        style={{
          borderColor: isLight ? LGlobals.text : DGlobals.text,
          borderWidth: 1,
          paddingHorizontal: "12%",
          height: "auto",
          paddingVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 18,
          minWidth: 70,
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Reject
        </Text>
      </TouchableOpacity>
    );
  }

  function RequestsRow({ item }) {
    const message = "Requested to connect";
    //const time = '2 min ago'

    function OpenProfile(params) {
      navigation.navigate("ProfileScreen1", item);
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: "1%",
          borderBottomWidth: 0,
          borderBottomColor: "#d0d0d0",
          paddingVertical: "1%",
          marginBottom: "3%",
          // backgroundColor: isLight ? "#00000020" : "#05778b11",
        }}
      >
        <View
          style={{
            width: "15%",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={OpenProfile}
            style={{
              height: 35,
              width: 35,
              borderRadius: 45,
              borderColor: "#d0d0d0",
              // borderWidth: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5a5a5b",
              // overflow: "hidden",
            }}
          >
            <BadgeNotif
              backgroundColor={"red"}
              height={10}
              width={10}
              borderRadius={10}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-user-lock"
              size={25}
              color="#d0d0d0"
              // color={DGlobals.icon}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "85%",
            // backgroundColor:"red"
          }}
        >
          <View
            style={{
              overflow: "hidden",
              gap: 10,
              marginLeft: "5%",
              paddingHorizontal: "1%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: "500",
                    marginVertical: "2%",
                    color: isLight ? LGlobals.text : DGlobals.text,
                  }}
                >
                  {item.sender.name}
                </Text>

                <Text
                  numberOfLines={3}
                  style={{
                    fontWeight: "500",
                    fontSize: 12,
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                  >
                    {message}
                  </Text>

                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                  >
                    {" • "}
                    {utils.formatTime(item.created)}
                  </Text>
                </Text>
              </View>

              {/* <View>
                <BadgeNotif
                  backgroundColor={"red"}
                  height={10}
                  width={10}
                  borderRadius={10}
                />
                <FontAwesomeIcon
                  icon="fa-regular fa-bell"
                  size={20}
                  color={isLight ? LGlobals.fadeIcon : DGlobals.fadeIcon}
                />
              </View> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: "2%",
              gap: 35,
              marginVertical: "2%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <RequestAccept item={item} />
            <RequestReject item={item} />
          </View>
        </View>
      </View>
    );
  }

  function RequestTopNav() {
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
          Requests
        </Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Feather
            name="settings"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <RequestTopNav />
      {requestsList === null ? (
        // Show loading Indicator
        <View
          style={{
            paddingVertical: "5%",
          }}
        >
          <ActivityIndicate flex={false} size={30} color={"#0D99FF"} />
        </View>
      ) : requestsList.length === 0 ? (
        // Show Empty if no requests
        <NoRequests />
      ) : (
        // Show requests list
        <FlatList
          data={requestsList}
          renderItem={({ item }) => <RequestsRow item={item} />}
          keyExtractor={(item) => item.sender.username}
        />
      )}
    </SafeAreaView>
  );
};

export default Requests;

const styles = StyleSheet.create({});
