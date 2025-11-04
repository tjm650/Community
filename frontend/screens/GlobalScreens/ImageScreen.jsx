import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import MainHeader from "./MainHeader";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LNotifs } from "@/constants/LightColor/LNotifs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

////////////////////////////////// Functions /////////////////////////////////////
function GetImage({ onPress, data, isOpenDescription }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        height: Dimensions.get("window").height * 1,
        alignSelf: "center",
        justifyContent: "center",
        //zIndex: 99,
      }}
    >
      <Image
        style={{
          resizeMode: "center",
          aspectRatio: 1, // imageSize.height
          borderRadius: 7,
          backgroundColor: "black",// DGlobals.background,
          height: "auto",
          width: "100%",
        }}
        source={utils.GetImage(data.image)}
      />
    </Pressable>
  );
}

const ImageScreen = ({ route }) => {
  const data = route.params.data;
  const navigation = useNavigation();
  const [isOpenDescription, setIsOpenDescrition] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  // if (Platform.OS === 'android') {
  //   NativeModules.PreventScreenshotModule.secure();
  //   // To remove:
  //   // NativeModules.PreventScreenshotModule.unsecure();
  // }

  return (
    <View
      scrollEnabled={true}
      onscroll={() => navigation.goBack()}
      style={{
        backgroundColor: "black",
        height: Dimensions.get("window").height * 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 99,
        }}
      >
        <MainHeader
        imagescreen={true}
        position={"false"}
          getView={
            <View
              style={{
                height: 30,
                width: 30,
                alignItems: "center",
                backgroundColor: "black"
              }}
            >
              {data.sender && data.profile_image ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor:
                     "black",
                    borderRadius: 7,
                    overflow: "hidden",
                    borderWidth: 0.3,
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      justifyContent: "center",
                      alignSelf: "center",
                      width: 30,
                      height: 30,
                    }}
                    source={utils.GetImage(data.profile_image)}
                  />
                </View>
              ) : data.profile_image ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: isLight
                      ? LNotifs.events.notifPostView.profileImgbackgroundColor
                      : DNotifs.events.notifPostView.profileImgbackgroundColor,
                    borderRadius: 7,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      justifyContent: "center",
                      alignSelf: "center",
                      width: 30,
                      height: 30,
                    }}
                    source={utils.GetImage(data.image)}
                  />
                </View>
              ) : data.sender && !data.profile_image ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor:
                      DNotifs.events.notifPostView.profileImgbackgroundColor,
                    borderRadius: 7,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    size={15}
                    color={DGlobals.icon}
                  />
                </View>
              ) : !data.sender && !data.profile_image ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor:
                      DNotifs.events.notifPostView.profileImgbackgroundColor,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-user-group"
                    size={15}
                    color={DGlobals.icon}
                  />
                </View>
              ) : (
                data.connect &&
                !data.profile_image && (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor:
                        DNotifs.events.notifPostView.profileImgbackgroundColor,
                      borderRadius: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-user-group"
                      size={15}
                      color={DGlobals.icon}
                    />
                  </View>
                )
              )}
            </View>
          }
          header={
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "500",
                  justifyContent: "center",
                  color: DGlobals.text,
                }}
              >
                {data.sender
                  ? data.sender.name
                  : data.service
                  ? data.service.username
                  : data.connect
                  ? data.connect.name
                  : data.name}
              </Text>
            </View>
          }
        />

        {/* <View
          style={{
            height: Dimensions.get("window").height * 0.9,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: "2%",
              marginTop: "1%",
              backgroundColor: isOpenDescription ? "#1c1c1cb7" : "transparent",
              paddingVertical: isOpenDescription ? "2%" : 0,
              paddingHorizontal: "2%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderWidth: 0,
              borderColor: isOpenDescription ? "#ffffff57" : "transparent",
            }}
            activeOpacity={0.9}
            onPress={() => setIsOpenDescrition((val) => !val)}
          >
            <Text
              selectable={false}
              numberOfLines={isOpenDescription ? 20 : 3}
              style={{
                color: DGlobals.text,
                textAlign: "left",
              }}
            >
              {data.description}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <GetImage
        isOpenDescription={isOpenDescription}
        data={data}
        onPress={() => setIsOpenDescrition((value) => !value)}
      />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({});
