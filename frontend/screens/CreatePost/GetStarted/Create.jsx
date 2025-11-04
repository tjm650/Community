import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';

import MainHeader from "../../GlobalScreens/MainHeader";

import { community_gifs } from "@/assets/assets";
import useGlobal from "@/assets/common/core/useGlobal";
import CheckClientType from "../../GlobalScreens/CheckClientType";
import MoreInfoSheet from "../../GlobalScreens/RBSheets/MoreInfoSheet";

//======================================================================================

function CreateView({ CreateViewName, Description, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        borderBottomWidth: 0,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: "2%",
        marginVertical: 5,
        borderRadius: 7,
      }}
    >
      <CheckClientType
        DirectoryView={
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "700",
              textTransform: "capitalize",
              fontSize: 17,
            }}
          >
            {CreateViewName}
          </Text>
        }
        directoryStatus={CreateViewName}
      />

      <MoreInfoSheet
        activeOpacity={0.6}
        GetIcon={
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.fadetext : DGlobals.lighttext,
              fontSize: 13,
              marginTop: 5,
              // fontWeight: "500",
              lineHeight: 18,
            }}
          >
            {Description}
          </Text>
        }
        GetView={
          <View
            style={{
              paddingHorizontal: "2%",
              paddingVertical: "3%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                borderWidth: 0.3,
                borderColor: isLight
                  ? LGlobals.borderColor
                  : DGlobals.borderColor,
                aspectRatio: 1,
                borderRadius: 20,
                width: 100,
                marginBottom: "10%",
              }}
            >
              <Video
                source={community_gifs.bellNotif} // Can be a URL or local file
                style={{ width: 100, aspectRatio: 1, animationDuration:10 }}
                // viewType={}
                // controls={true} // Show playback controls
                resizeMode="contain" // How to resize the video
                onError={(error) => console.error(error)} // Error callback
              />

              {/* {community_gifs.bellNotif} */}
            </View>
            {/* <Text
              style={{
                lineHeight: 20,
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "500",
                fontSize: 15,
                marginBottom: "1%",
              }}
            >
              Description
            </Text> */}
            <Text
              style={{
                lineHeight: 20,
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                textAlign: "center",
                // fontWeight: "500",
              }}
            >
              {Description}
            </Text>
          </View>
        }
        height={"auto"}
      />
    </TouchableOpacity>
  );
}

const Create = () => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
                marginBottom: "1%",
              }}
            >
              Create
            </Text>
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingHorizontal: "1%",
      }}
    >
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <CreateView
          CreateViewName={"Community"}
          Description={
            `Share content or information with a community, allow your viewers to interact with your content for perfomance overview. ` +
            `allow your viewers to share their views or opinions while sharing news and updates.`
          }
          onPress={() => navigation.navigate("CreateCommunityPages")}
        />
        <CreateView
          CreateViewName={"Bloger"}
          Description={
            "Share announcements, achievements and experiences and your business or marketing announcements with a bloger"
          }
          onPress={() => navigation.navigate("CreateBloger")}
        />
        <CreateView
          CreateViewName={"Service"}
          Description={
            "Share updates and notices on Academic Departments with a service"
          }
          onPress={() => navigation.navigate("CreateServicePages")}
        />
        <CreateView
          CreateViewName={"Organization"}
          Description={"Create an Organization."}
          onPress={() => navigation.navigate("CreateOrganizationPages")}
        />
       
       
        <CreateView
          CreateViewName={"Join Community app"}
          Description={"Request to join community app developers."}
          // onPress={() => navigation.navigate("CreateOrganizationPages")}
        />

        {/* {!isLight && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: "20%",
            }}
          >
            <Image
              style={{
                aspectRatio: 1,
              }}
              source={require("../../../assets/images/adaptive-icon.png")}
            />
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default Create;

const styles = StyleSheet.create({});
