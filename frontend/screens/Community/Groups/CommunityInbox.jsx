import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";
import MainHeader from "../../GlobalScreens/MainHeader";

const commData = [];

///////////////////////////////////////////////// Functions ////////////////////////////////////////////
function CommunityInboxHeader({ data, item, dataProfile }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <Pressable
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingHorizontal: "2%",
      }}
    >
      <MainHeader
        borderRadius={13}
        backgroundColor={isLight ? "#00000020" : "#202020"}
        getView={
          <View
            style={{
              height: 30,
              width: 30,
              alignItems: "center",
            }}
          >
            {dataProfile ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  overflow: "hidden",
                  backgroundColor: isLight
                    ? LNotifs.events.notifPostView.profileImgbackgroundColor
                    : DNotifs.events.notifPostView.profileImgbackgroundColor,
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
                  source={dataProfile}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  backgroundColor: isLight
                    ? LNotifs.events.notifPostView.profileImgbackgroundColor
                    : DNotifs.events.notifPostView.profileImgbackgroundColor,
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
            )}
          </View>
        }
        header={
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textTransform: "capitalize",
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "500",
              }}
            >
              {data}
            </Text>
            <View
              style={{
                marginRight: "2%",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-wand-magic-sparkles"
                size={20}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
            </View>
          </View>
        }
      />
    </Pressable>
  );
}

function CommunityInboxView({ route }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View>
      <FontAwesomeIcon
        icon="bell"
        size={30}
        color={isLight ? LGlobals.icon : DGlobals.icon}
      />
    </View>
  );
}

const CommunityInbox = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params.name;
  const dataProfile = route.params.profileimg;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  ///////////////////////////////////////////////// Functions ////////////////////////////////////////////
  useLayoutEffect(() => {
    const data = route.params.name;
    const dataProfile = route.params.profileimg;
    navigation.setOptions({
      header: () => (
        <CommunityInboxHeader data={data} dataProfile={dataProfile} />
      ),
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isLight
        ? LGlobals.background
        : LGlobals.background
      }}
    >
      {commData.length === 0 ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <EmptyScreen
            icon={<FontAwesomeIcon icon="message" size={70} color="#d0d0d0" />}
            text={"Communities not available"}
            btn={true}
            color={
              isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
            }
            onPress={() => navigation.navigate("Drawer")}
            OnPressText={"Home"}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
           
          }}
        >
          <FlatList
            contentContainerStyle={{
              paddingBottom: "5%",
            }}
            inverted={true}
            data={commData}
            renderItem={({ item }) => <CommunityInboxView item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      <View
        style={{
          backgroundColor: isLight
            ? LNotifs.events.notifPostView.profileImgbackgroundColor
            : DNotifs.events.notifPostView.profileImgbackgroundColor,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Community
        </Text>
      </View>
    </View>
  );
};

export default CommunityInbox;

const styles = StyleSheet.create({});
