import {
  FlatList,
  Image,
  InputAccessoryView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import utils from "@/app/core/utils";
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import InputMessage from "../GlobalScreens/InputMessage";
import MainHeader from "../GlobalScreens/MainHeader";
import MessageView from "../GlobalScreens/MessageView";

/////////////////////////////////////////////// Functions ///////////////////////////////////////////
////////////////// MessageBubble //////////////////
function MessageBubble({ message, connect, index }) {
  return message.is_me ? (
    <MessageView
      receiver={false}
      text={message.text}
      time={utils.formatTime(message.created)}
    />
  ) : (
    <MessageView
      receiver={true}
      is_group={false}
      text={message.text}
      time={utils.formatTime(message.created)}
    />
  );
}

////////////////// MessageInput /////////////////

const MesssageInbox = ({ route }) => {
  const navigation = useNavigation();
  const connect = route.params.connect;
  const connectionId = route.params.id;
  const updated = route.params.updated;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showTyping, setShowTyping] = useState(false);
  const [message, setMessage] = useState("");

  const messagesNext = useGlobal((state) => state.messagesNext);
  const messagesList = useGlobal((state) => state.messagesList);
  const messageSend = useGlobal((state) => state.messageSend);
  const messageList = useGlobal((state) => state.messageList);
  const messageType = useGlobal((state) => state.messageType);
  const MessagesTyping = useGlobal((state) => state.MessagesTyping);

  const [loading, setLoading] = useState(false);

  ///////////////////////////////////////////////// Functions ////////////////////////////////////////////
  ////////////////// onSend //////////////////

  function onSend() {
    // Trim the message text spaces
    const cleaned = message.replace(/\s+/g, " ").trim();
    console.log("onsend", cleaned);
    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage("");
  }

  ////////////////// onType //////////////////
  function onType(value) {
    setMessage(value);
    messageType(connect.username);
  }

  function IsTyping({ typing = false, h }) {
    return (
      <View>
        {h.is_me ? null : (
          <View>
            {typing ? (
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                {" "}
                Typing...
              </Text>
            ) : (
              <Text> not typing</Text>
            )}
          </View>
        )}
      </View>
    );
  }

  // Update the header
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <View
              style={{
                alignSelf: "center",
                backgroundColor: "#5a5a5b",
                height: 30,
                width: 30,
                borderRadius: 45,
                borderColor: "#d0d0d0",
                borderWidth: 0.3,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <View>
                {connect.image ? (
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      resizeMode: "contain",
                    }}
                    source={utils.GetImage(connect.image)}
                  />
                ) : (
                  <View>
                    {
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 20,
                          textAlign: "center",
                          color: "#d0d0d0",
                        }}
                      >
                        {connect.name.charAt(0)}
                      </Text>
                    }
                  </View>
                )}
              </View>
            </View>
          }
          /* header={
            <MessageHeader
              connect={connect}
              flatlist={
                <FlatList
                  data={[{ id: -1 }, ...messagesList]}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TypingView h={item} index={index} />
                  )}
                />
              }
            />
          }*/
        />
      ),
    });
  }, [MessagesTyping]);

  useEffect(() => {
    messageList(connectionId);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          flex: 1,
          marginBottom: Platform.OS === "ios" ? 60 : 0,
        }}
      >
        <FlatList
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{
            paddingTop: "3%",
            paddingBottom: loading ? "10" :  "5%",
            backgroundColor: isLight
              ? LGlobals.background
              : DGlobals.background,
          }}
          onEndReached={() => {
            console.log("onEndReached", messagesNext);
            if (messagesNext) {
              messageList(connectionId, messagesNext);
              setLoading(true);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size={14}
                style={{
                 // backgroundColor:"#44455b63",
                  position:"absolute",
                  top:0,
                  width:"100%",
                  marginBottom:5,
                  
                }}
                color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              />
            ) : null
          }
          data={messagesList}
          inverted={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MessageBubble message={item} connect={connect} />
          )}
        />
      </View>
      {Platform.OS === "ios" ? (
        <InputAccessoryView>
          <InputMessage message={message} setMessage={onType} onSend={onSend} />
        </InputAccessoryView>
      ) : (
        <InputMessage message={message} setMessage={onType} onSend={onSend} />
      )}
    </SafeAreaView>
  );
};

export default MesssageInbox;

const styles = StyleSheet.create({});
