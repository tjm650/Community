import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

// ===================================================================//
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import CheckClientType from "@/screens/GlobalScreens/CheckClientType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import LiveForumCountDown from "./LiveForumCountDown";

function Session({ timer }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: "2%",
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "800",
        }}
      >
        Session
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            width: "auto",
          }}
        >
          {timer}
        </Text>
        <FontAwesomeIcon
          icon="fa-regular fa-clock"
          size={15}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
      </View>
    </View>
  );
}

function Hoster({ name, profileimg, directoryStatus, verified, OpenProfile }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        gap: "5%",
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "800",
          marginVertical: "2%",
        }}
      >
        Host
      </Text>

      <CheckClientType
        DirectoryView={
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={OpenProfile}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "rgba(170, 178, 209, 0.2)",
              paddingHorizontal: "4%",
              paddingVertical: "2%",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              maxWidth: "90%",
            }}
          >
            <View style={{}}>
              <Text
                numberOfLines={1}
                style={{
                  textTransform: "capitalize",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  // width:"0%",
                  maxWidth: "90%",
                  // fontWeight: "500",
                }}
              >
                {name}
              </Text>
            </View>

            {profileimg ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: isLight
                    ? LNotifs.events.notifLiveView.profileImgbackgroundColor
                    : DNotifs.events.notifLiveView.profileImgbackgroundColor,
                  borderRadius: 30,
                  overflow: "hidden",
                  borderWidth: 0.3,
                }}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 20,
                    height: 20,
                  }}
                  source={utils.GetImage(profileimg)}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: isLight
                    ? LNotifs.events.notifLiveView.profileImgbackgroundColor
                    : DNotifs.events.notifLiveView.profileImgbackgroundColor,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-group"
                  size={15}
                  color="#d0d0d0"
                />
              </View>
            )}
          </TouchableOpacity>
        }
        directoryStatus={directoryStatus}
        verified={verified}
      />
    </View>
  );
}

function Subject({ subject }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        marginBottom: "3%",
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "800",
        }}
      >
        Subject
      </Text>

      <Text
        style={{
          color: isLight ? LGlobals.greyText : DGlobals.greyText,

          lineHeight: 22,
          // textTransform: "uppercase",
        }}
      >
        {subject}
      </Text>
    </View>
  );
}

function Description({ description, image, item }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        paddingVertical: "1%",
        color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        marginTop: "1%",
        marginBottom: "1%",
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          // marginBottom: "2%",
        }}
      >
        {description}
      </Text>
    </View>
  );
}

const HosterDetails = ({
  sender_name,
  count_down2,
  sender_username,
  description,
  subject,
  image,
  item,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const OpenProfile = () => {
    if (item.service) {
      navigation.navigate("ProfileScreen", item);
    } else {
      navigation.navigate("ProfileScreen1", item);
    }
  };

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  return (
    <View style={{}}>
      {count_down2 != 0 && <Session timer={count_down2} />}
      <LiveForumCountDown
        startDate={utils.GetTime(item.extra_data.start_date)}
        endDate={utils.GetTime(item.extra_data.end_date)}
        endTime={utils.GetEndDateTime(item.extra_data.end_date)}
      />
      <Subject subject={subject} />
      <Description description={description} image={image} item={item} />

      {image && (
        <TouchableOpacity
          onPress={() => HandleShowImage(item)}
          activeOpacity={0.5}
          style={{
            justifyContent: "center",
            alignSelf: "center",
            width: "100%",
            marginVertical: "2%",
            backgroundColor: isLight
              ? LNotifs.events.notifPostView.imageBackgroundColor
              : DNotifs.events.notifPostView.imageBackgroundColor,
            borderRadius: 5,
            borderWidth: 0,
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
      <Hoster
        sender_name={sender_name}
        name={item.service.username}
        profileimg={item.service.profile_image}
        directoryStatus={item.service.directory_status1}
        verified={item.service.verified}
        OpenProfile={OpenProfile}
      />
    </View>
  );
};

export default HosterDetails;

const styles = StyleSheet.create({});
