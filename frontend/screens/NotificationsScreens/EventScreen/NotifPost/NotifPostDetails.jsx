import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

const NotifPostDetails = ({
  item,
  image,
  description,
  sender,
  isInbox = false,
}) => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const notifCommentInteraction = useGlobal(
    (state) => state.notifCommentInteraction
  );
  const notifPostInteraction = useGlobal((state) => state.notifPostInteraction);

  const fetchNotifPostComments = useGlobal(
    (state) => state.fetchNotifPostComments
  );

  const userId = user.id;
  const postId = item.id;

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  const OpenNotifPostInbox = (data) => {
    navigation.navigate("NotifPostInbox", { data: data });
    fetchNotifPostComments(postId);

    if (item.comments) {
      notifPostInteraction(postId, userId, "interaction");
    } else {
      notifCommentInteraction(postId, userId, "interaction");
    }
  };

  function OpenProfile1(data) {
    navigation.navigate("ProfileScreen1", data);
  }

  return (
    <View
      id="Desc-View"
      style={{
        paddingHorizontal: "0%",
      }}
    >
      {image && (
        <TouchableOpacity
          onPress={() => HandleShowImage(item)}
          activeOpacity={0.5}
          style={{
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",
            backgroundColor: isLight
              ? LNotifs.events.notifPostView.imageBackgroundColor
              : DNotifs.events.notifPostView.imageBackgroundColor,
            borderRadius: 5,
            borderWidth: 0.3,
            borderColor: isLight
              ? LNotifs.events.notifPostView.imageBorderColor
              : DNotifs.events.notifPostView.imageBorderColor,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              resizeMode: "cover",
              aspectRatio: 2,
            }}
            //source={image}
            source={utils.GetImage(image)}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => OpenNotifPostInbox(item)}
        activeOpacity={isInbox ? 1 : 0.6}
        style={{
          marginTop: 5,
          paddingHorizontal: "1%",
        }}
      >
        <Text
          numberOfLines={isInbox ? null : 3}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {description}
        </Text>

        {/* {item.service && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user-shield"
              size={14}
              color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
            <Text
              onPress={OpenProfile1}
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                fontWeight: "600",
              }}
            >
              {sender}
            </Text>
          </TouchableOpacity>
        )} */}
      </TouchableOpacity>
    </View>
  );
};

export default NotifPostDetails;

const styles = StyleSheet.create({});
