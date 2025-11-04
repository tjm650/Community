import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";

//////////////////////////////////////// Functions /////////////////////////////////////////////
function GroupView({ item, isLight }) {
  const navigation = useNavigation();
  const [isRead, setIsRead] = useState(false);

  function OpenGroup(data) {
    navigation.navigate("GroupInbox", data);
    setIsRead((val) => (val = true), data);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flex: 1,
        flexDirection: "row",
        height: 70,
        marginBottom: "1%",
      }}
      onPress={OpenGroup}
    >
      <View
        id="LeftHorizontalView"
        style={{
          width: "10%",
          marginLeft: "2%",
          marginRight: "4%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#5a5a5b",
            height: 40,
            width: 40,
            borderRadius: 45,
            borderColor: "#D0D0D0",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {item.Profileimg ? (
            <Image
              style={{
                width: 45,
                height: 45,
                resizeMode: "center",
              }}
              source={item.profileimg}
            />
          ) : (
            <Ionicons name="person" size={25} color="#fbfbfb98" />
          )}
        </View>
      </View>
      <View
        id="RightHorizontalView"
        style={{
          width: "80%",
        }}
      >
        <View>
          <View
            id="TopView"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <Text
              numberOfLines={1}
              id="GroupName"
              style={{
                fontSize: 15,
                fontWeight: isRead? "500":"800",
                width: "75%",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {item.name}
            </Text>
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
                  fontSize: 14,
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
            <Text
              numberOfLines={1}
              style={{
                width: isRead ? "100%" : "70%",
                fontWeight: isRead ? "" : "bold",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              <Text>{item.group_chats_sender.name}: </Text>
              {item.preview}
            </Text>

            <View>
              {isRead ? (
                ""
              ) : (
                <View>
                  {item.preview ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          color: isLight
                            ? LGlobals.bluetext
                            : DGlobals.bluetext,
                        }}
                        numberOfLines={1}
                      >
                        unread
                      </Text>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          paddingHorizontal: "2%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isLight
                            ? LGlobals.blueIcon
                            : DGlobals.blueIcon,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: isLight
                            ? LGlobals.blueIcon
                            : DGlobals.blueIcon,
                        }}
                      >
                        <FontAwesomeIcon
                          icon="bell"
                          size={12}
                          color={
                            isLight
                            ? LGlobals.bellNotifIcon
                            : DGlobals.bellNotifIcon
                          }
                        />
                      </View>
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Groups = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  //const sender = route.params.sender;

  const GroupConnectList = useGlobal((state) => state.GroupConnectList);

  const OpenCommunityInbox = (data) => {
    navigation.navigate("CommunityInbox", { data: data });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isLight
          ? LGlobals.backgroundColor
          : DGlobals.backgroundColor,
        paddingTop: "2%",
      }}
    >
      {GroupConnectList.length === 0 ? (
        <EmptyScreen
          marginBottom={20}
          OnPressText={"Start a group"}
          color={"#057d8c"}
          text={"No Messages from any group"}
          icon={<Feather name="users" size={90} color="#606060" />}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={GroupConnectList}
            renderItem={({ item }) => (
              <GroupView
                navigation={navigation}
                item={item}
                isLight={isLight}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}

    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({});
