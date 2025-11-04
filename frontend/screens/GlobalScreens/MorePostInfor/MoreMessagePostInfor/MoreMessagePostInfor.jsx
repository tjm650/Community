import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Report from "../../../ApplicationServices/Report/Report";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

const MoreMessagePostInfor = ({ post }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  const user = useGlobal((state) => state.user);
  const searchUsers = useGlobal((state) => state.searchUsers);
  const requestConnect = useGlobal((state) => state.requestConnect);

  const sendername = post.sender;
  useEffect(() => {
    searchUsers(sendername);
  }, [sendername]);

  function OpenProfile1(params) {
    navigation.navigate("ProfileScreen1", post);
  }

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen", post);
  }

  
  async function OpenUserInbox(params) {
    try {
      await requestConnect(sendername);
    } catch (e) {}

    const tag = {
      text: post.title || post.subject || "Message",
      serviceId: post.id || post._id || null,
      serviceRaw: post,
    };

    const connect = typeof sendername === "string" ? sendername : sendername;
    navigation.navigate("MesssageInbox", { connect: connect, tagedMessage: tag });
  }

  const Option = ({ icon, desc, onPress, iconSize }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: "2%",
          //   backgroundColor: isLight ? "#b5b5b53e" : "#d0d0d011",
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          marginTop: 5,
          //marginBottom: 2,
          height: 35,
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          size={20}
          color={isLight ? LGlobals.icon : DGlobals.icon}
          size={iconSize}
        />

        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            textAlignVertical: "center",
            // fontWeight: 600,
          }}
        >
          {desc}
        </Text>
      </TouchableOpacity>
    );
  };

  const AppView = ({ desc, onPress, icon }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
          width: 80,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          style={{
            padding: "3%",
            // aspectRatio: 1,
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 50,
            borderWidth: 0.5,
            backgroundColor: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            borderWidth: 0,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          }}
        >
          {icon}
        </TouchableOpacity>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              padding: 5,
              maxWidth: "99%",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {desc}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: "column",
        gap: 5,
        paddingVertical: "1%",
        paddingHorizontal: "1%",
      }}
    >
      <ScrollView
        horizontal
        style={{
          // flexDirection: "row",
          paddingTop: "3%",
          gap: 5,
        }}
      >
        <AppView
          onPress={OpenProfile1}
          desc={`${post.sender.first_name}`}
          icon={
            post.sender.profile_image ? (
              <Image
                source={utils.GetImage(post.sender.profile_image)}
                style={{
                  resizeMode: "cover",
                  aspectRatio: 1,
                  height: 65,
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={"fa-solid fa-user"}
                color={isLight ? LGlobals.text : DGlobals.text}
                size={25}
              />
            )
          }
        />

        {post.sender.market_agreement && (
          <AppView
            desc={`Market`}
            icon={
              <FontAwesomeIcon
                icon={"fa-solid fa-store"}
                color={isLight ? LGlobals.text : DGlobals.text}
                size={25}
              />
            }
          />
        )}

      </ScrollView>


      <Option
        desc={`Save this post`}
        icon={"fa-regular fa-bookmark"}
        iconSize={20}
      />

      <Option
        desc={`Unrecommend this post`}
        icon={"fa-solid fa-ban"}
        iconSize={20}
      />

      <Report />
    </View>
  );
};

export default MoreMessagePostInfor;

const styles = StyleSheet.create({});
