import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import BadgeButtonNotifsCount from "../../BadgeButtonNotifsCount";
import CheckClientType from "../../CheckClientType";

//======================================================================================

const MoreBlogInfor = ({ post, tagesOpens, setTagesOpen }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  const user = useGlobal((state) => state.user);
  const searchUsers = useGlobal((state) => state.searchUsers);
  const requestConnect = useGlobal((state) => state.requestConnect);
  // const [tagesOpen, setTagesOpen] = useState(false);

  const tagesOpen = false;

  const sendername = post.sender;
  // useEffect(() => {
  //   searchUsers(sendername);
  // }, [sendername]);

  function OpenProfile1(params) {
    navigation.navigate("ProfileScreen1", post);
  }

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen", post);
  }

  // function OpenUserInbox(params) {
  //   let connect = sendername;
  //   navigation.navigate("MesssageInbox", connect);
  // }

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
            textTransform: "capitalize",
            // fontWeight: 600,
          }}
        >
          {desc}
        </Text>
      </TouchableOpacity>
    );
  };

  const AppView = ({ desc, onPress, icon, gap = true }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
          width: gap && 80,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
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

  const TagAccount = ({ item }) => {
    return (
      <View
        style={{
          width: 50,
        }}
      >
        <AppView
          // onPress={setTagesOpen((value) => !value)}
          gap={false}
          desc={item && "tags"}
          icon={
            item.profile_image ? (
              <Image
                source={utils.GetImage(item.profile_image)}
                style={{
                  resizeMode: "cover",
                  aspectRatio: 1,
                  height: 65,
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={"fa-solid fa-user-group"}
                color={isLight ? LGlobals.text : DGlobals.text}
                size={25}
              />
            )
          }
        />
      </View>
    );
  };

  // const TagsView = () => {
  //   return (

  //   );
  // };

  const TagAccountView = ({ item }) => {
    return (
      <TouchableOpacity
        disabled
        // onPress={OpenProfile1}
        activeOpacity={0.6}
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: "1%",
          paddingVertical: "3%",
          marginHorizontal: "1%",
        }}
      >
        <View
          id="LeftHorizontalView"
          style={{
            width: "10%",
            marginLeft: "2%",
            marginRight: "4%",
            alignItems: "center",
            //backgroundColor:"red",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "#5a5a5b",
              height: 35,
              width: 35,
              borderRadius: 45,
              borderColor: "#D0D0D0",
              borderWidth: 0,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {item.profile_image ? (
              <Image
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                }}
                source={utils.GetImage(item.profile_image)}
              />
            ) : (
              // <Text
              //       style={{
              //         fontWeight: "600",
              //         fontSize: 20,
              //         textAlign: "center",
              //         color: "#d0d0d0",
              //       }}
              //     >
              //       {item.connect.name.charAt(0)}
              // </Text>

              <FontAwesomeIcon
                icon=" fa-solid fa-user"
                size={17}
                color={DGlobals.icon}
              />
            )}
          </View>
        </View>

        <View
          id="RightHorizontalView"
          style={{
            width: "80%",
          }}
        >
          <View
            id="TopView"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <CheckClientType
              DirectoryView={
                <Text
                  numberOfLines={1}
                  id="CommunityName"
                  style={{
                    fontSize: 15,
                    // width: "75%",
                    color: isLight ? LGlobals.text : DGlobals.text,
                  }}
                >
                  {item.name}
                </Text>
              }
              directoryStatus={item.directory_status1}
              verified={item.verified}
            />
          </View>
        </View>
      </TouchableOpacity>
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
      {tagesOpen && (
        <View
          style={{
            paddingHorizontal: "2%",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "900",
              fontSize: 19,
            }}
          >
            Taged users
          </Text>

          <FlatList
            data={post.tags}
            renderItem={({ item }) => <TagAccountView item={item} />}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}

      <ScrollView
        horizontal
        scrollEnabled
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

        <AppView
          onPress={OpenProfile}
          desc={`${post.service.username}`}
          icon={
            post.service.profile_image ? (
              <Image
                source={utils.GetImage(post.service.profile_image)}
                style={{
                  resizeMode: "cover",
                  aspectRatio: 1,
                  height: 65,
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={"fa-solid fa-industry"}
                color={isLight ? LGlobals.text : DGlobals.text}
                size={25}
              />
            )
          }
        />

        {post.tags.length >= 1 && (
          // <RBOptionsSheet
          //   GetIcon={

          //   }
          // />

          <View>
            <BadgeButtonNotifsCount
              top={-5}
              right={-10}
              notifCounts={post.tags_count}
              color={isLight ? LGlobals.text : DGlobals.text}
              backgroundColor={
                isLight ? LGlobals.background : DGlobals.background
              }
              borderRadius={20}
              borderColor={
                isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon
              }
            />
            {/* <TagsView /> */}
            <Pressable
              // onPress={setTagesOpen((value) => !value)}
              style={{
                flexDirection: "row",
                position: "relative",
                gap: 15,
                marginLeft: 15,
              }}
            >
              {/* {post.tags[0]((item) => (
                <TagAccount key={item.id} item={item} />
              ))} */}
              <TagAccount item={post.tags[0]} />
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Option
        desc={`Save this bloger`}
        icon={"fa-regular fa-bookmark"}
        iconSize={20}
      />

      <Option
        desc={`Unrecommend this bloger`}
        icon={"fa-solid fa-ban"}
        iconSize={20}
      />

      <Report />
    </View>
  );
};

export default MoreBlogInfor;

const styles = StyleSheet.create({});
