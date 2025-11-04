import {
  Image,
  Pressable,
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

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import ShareContent from "../../../ApplicationServices/Sharing/ShareContent";
import CheckClientType from "../../../GlobalScreens/CheckClientType";
import StatsCount from "../../../GlobalScreens/Interactions/StatsCount";
import MoreBlogInfor from "../../../GlobalScreens/MorePostInfor/MoreBlogInfor/MoreBlogInfor";
import RBOptionsSheet from "../../../GlobalScreens/RBSheets/RBOptionsSheet";





const BlogBottomView = ({ item }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const navigation = useNavigation();
  const sharing = useRef([]);
  const moreInfo = useRef([]);
  const showTags = useRef([]);

  const blogLink = `ablog/Blog/${item.id}`;

  const [isOpenDescription, setIsOpenDescrition] = useState(false, item);
  const [openTags, setOpenTags] = useState(false, item);

  const user = useGlobal((state) => state.user);
  const blogInteraction = useGlobal((state) => state.blogInteraction);
  const blogShared = useGlobal((state) => state.blogShared);
  const [tagesOpen, setTagesOpen] = useState(false);

  const userId = user.id;
  const blogId = item.id;

  function OpenProfile1(params) {
    navigation.navigate("ProfileScreen1", item);
  }

  const handleInteract = () => {
    setIsOpenDescrition((value) => !value);
    blogInteraction(blogId, userId, "interaction");
  };

  const handleShared = () => {
    blogShared(blogId, userId, "shared");
    sharing.current.open();
  };

  const handleShowOptions = () => {
    moreInfo.current.open();
  };



  const handleShowTags = async () => {
    setOpenTags(true)
    await showTags.current.open();
    //  showTags.current.open();
    await moreInfo.current.close();      
  };




  const TagAccountView = ({ item }) => {
    return (
        <TouchableOpacity
          onPress={OpenProfile1}
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
    <View>
      <Pressable
        onPress={() => handleInteract()}
        style={{
          width: "100%",
          overflow: "hidden",
          paddingHorizontal: "1%",
          marginTop: "1%",
        }}
      >
        <Text
          selectionColor={
            isLight ? LGlobals.textSelectionColor : DGlobals.textSelectionColor
          }
          numberOfLines={isOpenDescription ? 999 : 1}
          style={{
            fontSize: 14,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            ~
          </Text>
          {"  "}
          {item.description}
        </Text>
      </Pressable>

      <View
        style={{
          paddingHorizontal: "2%",
          justifyContent: "space-between",
          marginTop: "1%",
          flexDirection: "row",
        }}
      >
        <CheckClientType
          DirectoryView={
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                onPress={OpenProfile1}
                style={{
                  fontSize: 14,
                  fontWeight: "900",
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                {item.sender.username}
              </Text>
            </View>
          }
          // directoryStatus={item.sender.directory_status1}
          // verified={item.sender.verified}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 0,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              width: 50,
              justifyContent: "center",
              // backgroundColor: isLight ? "#43515321" : "#303030",
              paddingVertical: 2,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <FontAwesome5
              name="user-graduate"
              size={14}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
            <StatsCount count={item.total_interactions_count} />
          </TouchableOpacity>

          <ShareContent
            refRBSheet={sharing}
            GetIcon={
              <TouchableOpacity
                onPress={() => handleShared()}
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: isLight ? "#43515321" : "#303030",
                  paddingVertical: 2,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <FontAwesomeIcon
                  icon="share-from-square"
                  size={16}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
                <StatsCount count={item.shared_count} />
              </TouchableOpacity>
            }
            postLink={blogLink}
          />

          <RBOptionsSheet
            GetIcon={
              <TouchableOpacity
                onPress={() => handleShowOptions()}
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: isLight ? "#43515321" : "#303030",
                  paddingVertical: 2,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-paper-plane"
                  size={14}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
            }
            CommmentSheet={moreInfo}
            height={"auto"}
            GetView={
              <MoreBlogInfor
                post={item}
                // tagesOpen={tagesOpen}
                // setTagesOpen={setTagesOpen}
              />
            }
          />

          
        </View>
      </View>
    </View>
  );
};

export default BlogBottomView;

const styles = StyleSheet.create({});
