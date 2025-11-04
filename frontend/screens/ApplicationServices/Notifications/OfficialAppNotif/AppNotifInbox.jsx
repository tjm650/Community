import React, { useLayoutEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
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
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { useNavigation } from "@react-navigation/native";
import OfficialNotifAppInboxHeader from "./Headers/OfficialNotifAppInboxHeader";

//======================================================================================

const AppNotifInbox = ({ route }) => {
  const navigation = useNavigation();
  // const data = props.route.params.data;

  const data = route.params;

  // const subject = route.params.subject;
  // const desc = route.params.description;
  // const time = route.params.created;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <OfficialNotifAppInboxHeader subject={data.subject} />,
    });
  }, []);

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  return (
    <SafeAreaView
      focusable
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "3%",
      }}
    >
      <ScrollView
        style={{
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          flex: 1,
        }}
      >
        {data.image ? (
          <TouchableOpacity
            onPress={() => HandleShowImage(data)}
            style={{
              width: "auto",
              height: "auto",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                aspectRatio: 2, // imageSize.height
                overflow: "hidden",
                borderWidth: 0,
                borderRadius: 7,
                borderColor: "#646464",
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,
              }}
              source={utils.GetImage(data.image)}
            />
          </TouchableOpacity>
        ) : null}

        <Text
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            marginBottom: "2%",
            textAlign: "left",
            marginTop: "2%",
            fontWeight: "600",
          }}
        >
          {data.subject}
        </Text>

        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,

            marginBottom: "5%",
            textAlign: "left",
            marginTop: "2%",
          }}
        >
          {data.description}
        </Text>

        <View
          id="BottomView"
          style={{
            justifyContent: "space-between",
            paddingVertical: "1%",
            paddingHorizontal: "2%",
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            backgroundColor: isLight ? "#00000020" : "#ffffff1b",
            shadowColor: isLight ? "#00000020" : "#ffffff1b",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              // fontWeight: "600",
            }}
          >
            {utils.CalendarTime(data.created)} | 12 February | 2024
            {/* {new Date(item.created).toLocaleString()} */}
          </Text>

          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              // fontWeight: "600",
            }}
          >
            Community © | 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppNotifInbox;

const styles = StyleSheet.create({});
