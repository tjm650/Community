import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

//======================================================================================

const LiveForumDetails = ({ image, Topic, description, item }) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  }

  return (
    <View
      style={{
        paddingHorizontal: "1%",
      }}
    >
      <View
        id="Desc-View"
        style={
          {
            // flexDirection: "row",
            // alignItems: "center",
          }
        }
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

        <View
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          {Topic && (

          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              marginTop: "2%",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: 600,
                // fontSize:15
              }}
            >
              {Topic}
            </Text>
          </View>
          )}
        </View>

        <View style={{}}>
          <Text
            numberOfLines={3}
            style={{
              marginTop: "1%",
              color: isLight ? LGlobals.text : DGlobals.lighttext,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LiveForumDetails;

const styles = StyleSheet.create({});
