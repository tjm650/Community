import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "../GlobalScreens/MainHeader";
import MoreInfoSheet from "../GlobalScreens/RBSheets/MoreInfoSheet";

function ExploreCommunitiesView({ data }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        maxWidth: Dimensions.get("window").width * 0.9,
        minWidth: Dimensions.get("window").width * 0.6,
        backgroundColor: isLight ? "#00000020" : "#05778b2d",
        borderRadius: 15,
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginRight: 15,
        // borderWidth: 0.3,
        borderColor: "#d0d0d0",
        overflow: "hidden",
        // height: 200,
      }}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 35,
            backgroundColor: "black",
            borderWidth: 0.5,
            borderColor: "#d0d0d0",
            resizeMode: "contain",
          }}
          source={data.Profileimg}
        />
        <Text
          numberOfLines={1}
          style={{
            color: "#fff",
            fontWeight: "800",
            flexWrap: "wrap",
            width: Dimensions.get("window").width * 0.4,
          }}
        >
          {data.name}
        </Text>
      </View>
      <View style={{}}>
        <Text
          numberOfLines={1}
          style={{
            color: "#fff",
          }}
        >
          • {data.description}
        </Text>
      </View>
    </View>
  );
}

const ChannelPage = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  function ChannelView({
    CreateViewName,
    Description,
    onPress,
    getItems,
    data,
    dataDescription,
  }) {
    const { theme } = useGlobal();
    let isLight = theme === "light";

    return (
      <View
        style={{
          borderBottomWidth: 0,
          borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          // paddingTop: 5,
          paddingHorizontal: "2%",
          // marginVertical: 5,
          borderRadius: 7,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          style={{
            borderBottomWidth: 0,
            borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            // marginBottom: "2%",
          }}
        >
          {/* <CheckClientType
          DirectoryView={ */}
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "700",
              textTransform: "capitalize",
              fontSize: 18,
            }}
          >
            {CreateViewName}
          </Text>
          {/* }
          directoryStatus={CreateViewName}
        /> */}

          <MoreInfoSheet
            activeOpacity={0.6}
            GetIcon={
              <Text
                numberOfLines={2}
                style={{
                  color: isLight ? LGlobals.fadetext : DGlobals.lighttext,
                  paddingVertical: "2%",
                }}
              >
                {Description}
              </Text>
            }
            GetView={
              <View
                style={{
                  paddingHorizontal: "3%",
                  paddingVertical: "3%",
                }}
              >
                <Text
                  style={{
                    lineHeight: 20,
                    color: isLight ? LGlobals.greyText : DGlobals.greyText,
                    fontWeight: "500",
                    // fontSize:17
                  }}
                >
                  {Description}
                </Text>
              </View>
            }
            height={"auto"}
          />
        </TouchableOpacity>

        {data != 0 && (
          <Text
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              fontWeight: "700",
              marginBottom: "1%",
            }}
          >
            {dataDescription}
          </Text>
        )}

        {getItems}
      </View>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          header={
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 20,
                fontWeight: "700",
                marginBottom: "1%",
              }}
            >
              Networking
            </Text>
          }
          // getView={
          //   <FontAwesomeIcon
          //     icon="earth"
          //     size={25}
          //     color={isLight ? LGlobals.text : DGlobals.text}
          //   />
          // }
        />
      ),
    });
  });

  return (
    <ScrollView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "2%",
      }}
    >
      <ChannelView
        CreateViewName={"Accommodation"}
        Description={"Available accommodation on campus for students  "}
      />

      <ChannelView
        CreateViewName={"Marketing"}
        Description={"Buy items on campus, from students into business"}
        // onPress={() => navigation.navigate("InternshipsScreen")}
      />

      <ChannelView
        CreateViewName={"Internships"}
        Description={"Find internships"}
        // onPress={() => navigation.navigate("InternshipsScreen")}
        // data={InternshipChannel}
        // dataDescription={"Latest from Internships"}
        // getItems={
        //   <ScrollView
        //     horizontal
        //     showsHorizontalScrollIndicator={false}
        //     scrollEnabled={true}
        //     style={{ paddingHorizontal: "2%" }}
        //   >
        //     {InternshipChannel != 0 &&
        //       InternshipChannel.slice(0, 4).map((item, index) => (
        //         <LatestInternship key={index} data={item} />
        //       ))}
        //   </ScrollView>
        // }
      />

      <ChannelView
        CreateViewName={"Scholarships"}
        Description={"Find scholarships"}
        // onPress={() => navigation.navigate("InternshipsScreen")}
      />
    </ScrollView>
  );
};

export default ChannelPage;

const styles = StyleSheet.create({});
