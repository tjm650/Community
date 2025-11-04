import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import MessageReactions from "./MessageReactions";

////////////////////////////////////// Functions ////////////////////////////////////////////////////////
////////////////// MessageTypingAnimation //////////////////
function MessageTypingAnimation({ offset }) {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const total = 1000;
    const bump = 200;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(bump * offset),
        Animated.timing(y, {
          toValue: 1,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(total - bump * 2 - bump * offset),
      ])
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  const translateY = y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 1.5,
        borderRadius: 4,
        backgroundColor: "#606060",
        transform: [{ translateY }],
      }}
    ></Animated.View>
  );
}

const MessageView = ({
  receiver = true,
  text,
  time,
  item,
  onLongPress,
  image,
  reactions = [],
  showReactions = false,
  onReaction,
  onReply,
}) => {
  const [isOpenReadMore, setIsOpenReadMore] = useState(false, text);
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={onLongPress}
      style={{
        flex: 1,
      }}
    >
      {/* ///////////////////////// If Im the Receiver  ////////////////////////////////////////////////////////////
      
      */}

      {receiver == true ? (
        // If I'm the Receiver
        <View>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              justifyContent: "center",
              marginHorizontal: "5%",
              paddingVertical: "2%",
              marginBottom: "2%",
            }}
          >
            {image && (
              <TouchableOpacity
                onPress={() => HandleShowImage(item)}
                style={{
                  borderBottomStartRadius: 30,
                  borderTopStartRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    // aspectRatio: 2, // imageSize.height
                    height: Dimensions.get("window").height * 0.2,
                    width: Dimensions.get("window").width * 0.3,
                    overflow: "hidden",
                    borderWidth: 0,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderColor: isLight
                      ? LCommunity.GInbox.imageBackground
                      : DCommunity.GInbox.imageBackground,
                    backgroundColor: isLight
                      ? LCommunity.GInbox.imageBackground
                      : DCommunity.GInbox.imageBackground,
                  }}
                  source={utils.GetImage(item.image)}
                />
              </TouchableOpacity>
            )}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              {text.length > 1 && (
                <View
                  style={{
                    backgroundColor: isLight
                      ? LCommunity.GInbox.messageViewBackgroundR
                      : DCommunity.GInbox.messageViewBackgroundR,
                    height: "auto",
                    minHeight: 35,
                    minWidth: "35%",
                    maxWidth: "65%",
                    borderBottomStartRadius: 20,
                    borderTopStartRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: "center",
                  }}
                >
                  <View
                    id="Description"
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: "5%",
                        paddingVertical: "2%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          color: isLight ? LGlobals.text : DGlobals.text,
                        }}
                      >
                        {text == "." && image == true ? "" : text}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <View
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: isLight
                      ? LCommunity.GInbox.timeBackground
                      : DCommunity.GInbox.timeBackground,
                    paddingVertical: "2%",
                    marginBottom: "10%",
                    paddingHorizontal: "5%",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: isLight ? LGlobals.icon : DGlobals.icon,
                    }}
                  >
                    {time}
                  </Text>
                </View>
              </View>
              
                             {/* Reactions Display */}
               <MessageReactions
                 reactions={reactions}
                 onReaction={onReaction}
                 messageId={item?.id}
                 position="left"
               />
            </View>
          </View>
        </View>
      ) : (
        ///////////////////////// If Im the Sender  ////////////////////////////////////////////////////////////
        <View style={{ marginBottom: "5%", flexDirection: "row" }}>
          <View style={{ flex: 1 }} />

          <View
            style={{
              flexDirection: "column",
              gap: 10,
              justifyContent: "center",
              marginHorizontal: "5%",
              alignItems: "flex-end",
            }}
          >
            {image && (
              <TouchableOpacity
                onPress={() => HandleShowImage(item)}
                style={{
                  borderBottomStartRadius: 30,
                  borderTopStartRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  marginHorizontal: "3%",
                }}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    // aspectRatio: 2, // imageSize.height
                    height: Dimensions.get("window").height * 0.2,
                    width: Dimensions.get("window").width * 0.3,
                    overflow: "hidden",
                    borderWidth: 0,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderColor: isLight
                      ? LCommunity.GInbox.imageBackground
                      : DCommunity.GInbox.imageBackground,
                    backgroundColor: isLight
                      ? LCommunity.GInbox.imageBackground
                      : DCommunity.GInbox.imageBackground,
                  }}
                  source={utils.GetImage(image)}
                />
              </TouchableOpacity>
            )}

            <View
              style={{
                flexDirection: "row-reverse",
                gap: 10,
              }}
            >
              {text.length >= 1 && text != "." && image != true  && (
                <View
                  style={{
                    backgroundColor: isLight
                      ? LCommunity.GInbox.messageViewBackgroundS
                      : DCommunity.GInbox.messageViewBackgroundS,
                    height: "auto",
                    minHeight: 35,
                    minWidth: "35%",
                    maxWidth: "65%",
                    borderBottomStartRadius: 20,
                    borderTopStartRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 0,
                    justifyContent: "center",
                    // paddingHorizontal: "3%",
                    marginHorizontal: "3%",
                  }}
                >
                  <View
                    id="Description"
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: "5%",
                        paddingVertical: "2%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          color: LGlobals.text,
                        }}
                      >
                        {text}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <View
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: isLight
                      ? LCommunity.GInbox.timeBackground
                      : DCommunity.GInbox.timeBackground,
                    paddingVertical: "2%",
                    marginBottom: "10%",
                    paddingHorizontal: "5%",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: isLight ? LGlobals.icon : DGlobals.icon,
                    }}
                  >
                    {time}
                  </Text>
                </View>
              </View>
              
                             {/* Reactions Display for Sender */}
               <MessageReactions
                 reactions={reactions}
                 onReaction={onReaction}
                 messageId={item?.id}
                 position="right"
               />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MessageView;

const styles = StyleSheet.create({});
