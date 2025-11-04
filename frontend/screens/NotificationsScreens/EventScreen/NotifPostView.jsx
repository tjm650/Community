import React, { useState } from "react";
import {
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
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import DirectoryDetails from "./DirectoryDetails";
import InforView from "./InforView";

//======================================================================================

function NotifPostView({
  duration,
  image,
  description,
  time,
  profileimg,
  name,
  directoryStatus,
  UpdateType,
  item,
  sender,
}) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [isOpenDescription, setIsOpenDescrition] = useState(false, item);

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen", item);
  }


  return (
    <View
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        marginBottom: 5,
        position: "relative",
        marginHorizontal: "1%",
        paddingBottom: 7,
        borderBottomWidth: 0.3,
        borderColor: isLight
          ? LNotifs.events.notifPostView.borderColor
          : DNotifs.events.notifPostView.borderColor,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
      }}
    >
      <View
        style={{
          paddingBottom: "2%",
        }}
      >
        <DirectoryDetails
          profileimg={profileimg}
          name={name}
          directoryStatus={directoryStatus}
          UpdateType={UpdateType}
          item={item}
          time={time}
        />

        <View
          id="Desc-View"
          style={{
            paddingHorizontal: "0%",
          }}
        >
          {image && (
            <TouchableOpacity
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
            onPress={() => setIsOpenDescrition((value) => !value)}
            activeOpacity={0.6}
            style={{
              marginTop: 5,
              paddingHorizontal: "1%",
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
              numberOfLines={isOpenDescription ? 99 : 5}
            >
              {description}
            </Text>

            {isOpenDescription && (
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
                  onPress={OpenProfile}
                  style={{
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                    fontWeight: "600",
                  }}
                >
                  {sender}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <InforView item={item} time={time} />
    </View>
  );
}

export default NotifPostView;

const styles = StyleSheet.create({});
