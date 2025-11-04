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

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const PostDetailsView = ({ item, openPost, InboxDesc = false }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";



  const handleInteract = () => {
    openPost(item)

  };

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  {
    /*<Text
            style={{
              color: isLight ? LGlobals.fadetext : DGlobals.fadetext,
              fontWeight: "500",
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.fadetext : DGlobals.fadetext,
              }}
            >
              |{" "}
            </Text>
            {item.year}
          </Text>*/
  }



  return (
    <View
      id="Mid View"
      style={{
        height: "auto",
        paddingHorizontal: "1%",
        marginTop: "1%",
      }}
    >
      {item.image ? (
        <TouchableOpacity
          onPress={() => HandleShowImage(item)}
          style={{
            width: "auto",
            height: "auto",
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              aspectRatio: 2, // imageSize.height
              overflow: "hidden",
              borderWidth: 0.3,
              borderRadius: 7,
              borderColor: "#646464",
              backgroundColor: isLight
                ? LGlobals.ImageBackground
                : DGlobals.ImageBackground,
            }}
            source={utils.GetImage(item.image)}
          />
        </TouchableOpacity>
      ) : null}

      <View style={{ justifyContent: "space-between" }}>
        <Text
          key={item.key}
          onPress={handleInteract}
          numberOfLines={InboxDesc ? 99 : 3}
          style={{
            width: "100%",
            overflow: "hidden",
            paddingHorizontal: "2%",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {item.description}
        </Text>

        {/* <Text
          onPress={() => openPost(item)}
          key={item.key}
          style={{
            paddingHorizontal: "2%",
            marginBottom: "2%",
            color: isLight ? LGlobals.bluetext : DGlobals.lighttext,
            //fontWeight: "500",
            fontSize: 13,
          }}
        >
          {item.sender.username}
        </Text> */}
      </View>
    </View>
  );
};

export default PostDetailsView;

const styles = StyleSheet.create({});
