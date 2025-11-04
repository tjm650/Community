import React, { useState } from "react";
import {
  Alert,
  Clipboard,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DRBSheet } from "@/constants/DarkColor/DRBSheet";
import { LRBSheet } from "@/constants/LightColor/LRBSheet";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { Community_assets } from "@/assets/assets";
import useGlobal from "@/assets/core/useGlobal";
import { ADDRESS } from "@/assets/core/api";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

const ShareContent = ({ GetIcon, refRBSheet, postLink }) => {
  //   const refRBSheet = useRef();
  const [linkCopied, setLinkCopied] = useState(false);
  const [copied, setCopied] = useState("");

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showShareView, setShowShareView] = useState(false);

  const [shareLink, setShareLink] = useState(`${ADDRESS}/${postLink}`);

  // http://192.168.137.1:8000/ablog/Blog/7/

  const copyToClipboard = async () => {
    setCopied("Copied!, Link copied to clipboard");
    await Clipboard.setStringAsync(shareLink);
    Alert.alert("Copied!", "Link copied to clipboard");

    await refRBSheet.current.close();
  };

  const ShareLink = async () => {
    setShowShareView((val) => !val);
    await Clipboard.setStringAsync(shareLink);
    Alert.alert("Copied!", "Link copied to clipboard");
  };

  const AppView = ({ link, onPress, icon }) => {
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
              maxWidth: "95%",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {link}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity>{GetIcon}</TouchableOpacity>

      <RBSheet
        closeOnPressMask={true}
        ref={refRBSheet}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height: "100%",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            height: "auto",
            paddingHorizontal: "2%",
            paddingVertical: "1%",
            width: "100%",
            alignSelf: "center",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            borderWidth: 0.3,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
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
            link={"Whatsapp"}
            icon={
              <Image
                source={Community_assets.whatsappIcon}
                style={{
                  resizeMode: "cover",
                  overflow: "hidden",
                  aspectRatio: 1,
                  height: 50,
                }}
              />
            }
          />

          <AppView
            link={"X"}
            icon={
              <Image
                source={Community_assets.xTwitter}
                style={{
                  resizeMode: "cover",
                  aspectRatio: 1,
                  height: 65,
                }}
              />
            }
          />

          <AppView
            link={"Share"}
            icon={
              <FontAwesomeIcon
                icon={"fa-solid fa-share"}
                size={20}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
            }
            onPress={copyToClipboard}
          />
          <AppView
            link={"Link"}
            icon={
              <FontAwesomeIcon
                icon={"fa-solid fa-link"}
                size={20}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
            }
            onPress={copyToClipboard}
          />
        </ScrollView>

        {showShareView && (
          <View
            style={{
              marginTop: 5,
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                onPress={copyToClipboard}
                numberOfLines={1}
                style={{
                  color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                  padding: 5,
                  borderRadius: 20,
                  maxWidth: "95%",
                  fontWeight: "500",
                  // backgroundColor: "rgba(0, 225, 255, 0.275)",
                  textAlign: "center",
                }}
              >
                {shareLink}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
          }}
          onPress={ShareLink}
        >
          <Text
            style={{
              alignSelf: "center",
              borderColor: isLight
                ? LRBSheet.createPost.deskTextBackgroundColor
                : DRBSheet.createPost.deskTextBackgroundColor,
              borderWidth: 1,
              paddingVertical: 5,
              marginTop: 2,
              borderRadius: 15,
              width: "80%",
              textAlign: "center",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            Share this Post
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default ShareContent;
