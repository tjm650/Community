import { AntDesign } from "@expo/vector-icons";

import {
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
import React from "react";
import CheckClientType from "../GlobalScreens/CheckClientType";
import EmptyScreen from "../GlobalScreens/EmptyScreen";

///////////////////////////// Functions ////////////////////////////////////////////
function NoMessages() {
  const ICT = "Send query to";
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
        color={"#057c8c98"}
        OnPressText={"ICT"}
        marginBottom={"10%"}
        text={`Oops! No Messages. ${ICT}`}
        icon={<AntDesign name="home" size={70} color="#d0d0d0" />}
      />
    </View>
  );
}

function NewMessages() {
  const navigation = useNavigation();

  const GetStated = "conversation";
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
        color={"#057d8c"}
        OnPressText={"Star a conversation"}
        onPress={() => navigation.navigate("ConnectsScreen")}
        text={`You don't have any messages`}
        marginBottom={20}
        icon={<AntDesign name="home" size={90} color="#d0d0d0" />}
      />
    </View>
  );
}

const MessageView = ({ navigation, item }) => {
  const user = useGlobal((state) => state.user);
  const messageRed = useGlobal((state) => state.messageRed);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const isReceiver = true;

  const isReceiving = () => {
    if (item.is_sender !== user.id) {
      return isReceiver;
    }
  };

  function OpenMessage(params) {
    navigation.navigate("MesssageInbox", item);

    isReceiving() && messageRed(item.id);
  }

  return (
    <TouchableOpacity
      onPress={OpenMessage}
      activeOpacity={0.6}
      style={{
        flex: 1,
        flexDirection: "row",
        marginBottom: "1%",
        paddingVertical: "3%",
        marginHorizontal: "1%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: !isReceiving()
          ? isLight
            ? "#00000020"
            : "#5b5b5b1b"
          : isReceiving() && item.preview_red
          ? isLight
            ? "#00000020"
            : "#5b5b5b1b"
          : isReceiving() && !item.preview_red && isLight
          ? "#00000020"
          : "#05778b11",
      }}
    >
      <View
        id="LeftHorizontalView"
        style={{
          width: "10%",
          marginLeft: "2%",
          marginRight: "4%",
          alignItems: "center",
          //backgroundColor:"red",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#5a5a5b",
            height: 35,
            width: 35,
            borderRadius: 45,
            borderColor: "#D0D0D0",
            borderWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
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
            // <Text
            //       style={{
            //         fontWeight: "600",
            //         fontSize: 20,
            //         textAlign: "center",
            //         color: "#d0d0d0",
            //       }}
            //     >
            //       {item.connect.name.charAt(0)}
            // </Text>

            <FontAwesomeIcon
              icon=" fa-solid fa-user"
              size={30}
              color={DGlobals.icon}
              style={{
                marginTop: "25%",
              }}
            />
          )}
        </View>
      </View>
      <View
        id="RightHorizontalView"
        style={{
          width: "80%",
        }}
      >
        <View
          id="TopView"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "2%",
          }}
        >
          <CheckClientType
            DirectoryView={
              <Text
                numberOfLines={1}
                id="CommunityName"
                style={{
                  fontSize: 15,
                  fontWeight: isReceiving() && !item.preview_red && "700",
                  // width: "75%",
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                {item.connect && item.connect.name ? item.connect.name : ""}
              </Text>
            }
            directoryStatus={item.connect.directory_status1}
            verified={item.connect.verified}
          />

          <View
            id="time"
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontWeight:
                  isReceiving() && !item.preview_red ? "700" : "normal",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {utils.CalendarTime(item.updated)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: item.image && "center",
            }}
          >
            {item.image && (
              <FontAwesomeIcon
                icon="mountain-sun"
                size={14}
                color={
                  isReceiving() && !item.preview_red
                    ? isLight
                      ? LGlobals.text
                      : DGlobals.text
                    : isLight
                    ? LGlobals.icon
                    : DGlobals.icon
                }
              />
            )}
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                width: isReceiving() && !item.preview_red && "70%",
                fontWeight: isReceiving() && !item.preview_red && "bold",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {item.preview}
            </Text>
          </View>

          {isReceiving() && !item.preview_red && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  paddingHorizontal: "2%",
                  alignItems: "center",
                  justifyContent: "center",
                  /*backgroundColor: isLight
                                      ? LGlobals.blueIcon
                                      : DGlobals.blueIcon,*/
                  borderRadius: 20,
                  borderWidth: 0,
                  borderColor: isLight ? LGlobals.blueIcon : DGlobals.blueIcon,
                  borderRadius: 20,
                }}
              >
                <FontAwesomeIcon
                  icon="bell"
                  size={16}
                  color={
                    isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon
                  }
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Messages = () => {
  const navigation = useNavigation();
  const ConnectList = useGlobal((state) => state.ConnectList);
  const messagesList = useGlobal((state) => state.messagesList);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     ConnectList;
  //   }, 1 * 60 * 1000); // 1 minutes in milliseconds
  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [ConnectList]);

  const { theme } = useGlobal();
  let isLight = theme === "light";
  const ICT = "Send query to";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {ConnectList === null ? (
        <EmptyScreen
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          OnPressText={"Start Messaging"}
          onPress={() => navigation.navigate("ConnectsScreen")}
          text={`No Messages`}
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-comment-slash"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          borderWidth={0.5}
        />
      ) : ConnectList.length === 0 ? (
        // Show Empty if no requests
        <NewMessages />
      ) : (
        // Show requests list
        <View>
          <FlatList
            contentContainerStyle={{ marginTop: "2%" }}
            data={ConnectList}
            renderItem={({ item }) => (
              <MessageView navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({});
