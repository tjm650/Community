import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DCommunity } from "@/constants/DarkColor/DCommunity";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LCommunity } from "@/constants/LightColor/LCommunity";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";
import InputMessage from "../../GlobalScreens/InputMessage";
import MessageView from "../../GlobalScreens/MessageView";

function GroupInboxHeader({ name, sender, ChatsMembers, Profileimg }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        borderBottomColor: "#D0D0D0",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingVertical: "1%",
        flexDirection: "row",
        marginLeft: "-10%",
        width: Dimensions.get("window").width * 0.85,
        justifyContent: "space-between",
      }}
    >
      <View
        id="LeftView"
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#5a5a5b",
            height: 35,
            width: 35,
            borderRadius: 45,
            borderColor: "#d0d0d0",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "5%",
          }}
        >
          {Profileimg ? (
            <Image
              style={{
                width: 35,
                height: 35,
                resizeMode: "center",
              }}
              source={utils.GetImage(Profileimg)}
            />
          ) : (
            <Ionicons name="person" size={25} color="#fbfbfb98" />
          )}
        </View>

        <View
          style={{
            width: "75%",
          }}
        >
          <Text
            numberOfLines={1}
            id="CommunityName"
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            {name}
          </Text>
          <View
            id="Members"
            style={{
              flexDirection: "row",
            }}
          >
            <FlatList
              contentContainerStyle={{ flexDirection: "row" }}
              style={{}}
              data={ChatsMembers}
              renderItem={({ item }) => (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                    numberOfLines={1}
                  >
                    {item.name},
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
      <View
        id="RightView"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pressable>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

function MessageBubble({ message, groupData, text }) {
  return message.is_me ? (
    <MessageView
      receiver={false}
      text={message.text}
      time={utils.CalendarTime(message.created)}
    />
  ) : (
    <MessageView
      receiver={true}
      is_group={true}
      profileimg={message.sender.image}
      name={message.sender.name}
      text={message.text}
      time={utils.CalendarTime(message.created)}
    />
  );
}

const GroupInbox = ({ route }) => {
  const navigation = useNavigation();
  // const grpconnect = route.params.grpconnect;
  const grpConnId = route.params.id;
  const name = route.params.name;
  const Profileimg = route.params.Profileimg;
  const sender = route.params.group_chats_sender.name;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [grpmessage, setGrpMessage] = useState("");

  const groupMessageSend = useGlobal((state) => state.groupMessageSend);
  const groupMessageType = useGlobal((state) => state.GroupMessageType);
  const chatsList = useGlobal((state) => state.chatsList);
  const ChatsMembers = useGlobal((state) => state.ChatsMembers);
  const GroupChatList = useGlobal((state) => state.GroupChatList);

  /////////////////////////////// Functions ////////////////////////////////////////
  function onSend() {
    // Trim the message text spaces
    const cleaned = grpmessage.replace(/\s+/g, " ").trim();
    console.log("onsend", cleaned);
    if (cleaned.length === 0) return;
    groupMessageSend(grpConnId, grpmessage);
    setGrpMessage("");
  }

  ////////////////// onType //////////////////
  function onType(value) {
    setGrpMessage(value);
    //groupMessageType(grpconnect.username);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <GroupInboxHeader 
          name={name}
          sender={sender}
          ChatsMembers={ChatsMembers}
          Profileimg={Profileimg}
        />
      ),
    });
  }, []);

  useEffect(() => {
    GroupChatList(grpConnId);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Image
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        source={
          isLight
            ? LCommunity.CInbox.backgroundImage.image1
            : DCommunity.CInbox.backgroundImage.image1
        }
      />
      {!chatsList ? (
        <View
          style={{
            flex: 1,
            paddingTop: "3%",
          }}
        >
          <EmptyScreen
            icon={<FontAwesomeIcon icon="message" size={70} color="#d0d0d0" />}
            text={"No New group messages"}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginBottom: Platform.OS === "ios" ? 60 : 0,
            backgroundColor: "transparent",
          }}
        >
          <FlatList
            contentContainerStyle={{
              paddingBottom: "5%",
            }}
            inverted={true}
            data={chatsList}
            renderItem={({ item }) => (
              <MessageBubble message={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {Platform.OS === "ios" ? (
        <InputAccessoryView>
          <InputMessage
            message={grpmessage}
            setMessage={onType}
            onSend={onSend}
          />
        </InputAccessoryView>
      ) : (
        <InputMessage
          message={grpmessage}
          setMessage={onType}
          onSend={onSend}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupInbox;

const styles = StyleSheet.create({});
