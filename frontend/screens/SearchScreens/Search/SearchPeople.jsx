import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import FeedSkeleton from "@/components/FeedSkeleton";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import CheckClientType from "@/screens/GlobalScreens/CheckClientType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import Animated from "react-native-reanimated";

const SearchConnect = ({ user, navigation }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen1" ,user);
  }

  return (
    <TouchableOpacity
      onPress={OpenProfile}
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        // maxWidth: "75%",
        overflow: "hidden",
        justifyContent: "space-between",
        paddingHorizontal: "2%",
        paddingVertical: "4%",
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          borderColor: "#d0d0d0",
          borderWidth: 0,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#d0d0d0",
          backgroundColor: "#5a5a5b",
          overflow: "hidden",
        }}
      >
        {user.profile_image ? (
          <Image
            style={{
              height: 35,
              width: 35,
              resizeMode: "cover",
            }}
            source={utils.GetImage(user.profile_image)}
          />
        ) : (
          <FontAwesomeIcon
            icon=" fa-solid fa-user"
            size={17}
            color={DGlobals.icon}
          />
          // <Text
          //   style={{
          //     fontWeight: "700",
          //     fontSize: 16,
          //     textAlign: "center",
          //     color: "grey",
          //     textTransform: "uppercase",
          //   }}
          // >
          //   {user.username.charAt(0)}
          // </Text>
        )}
      </View>

      <View
        style={{
          marginLeft: "3%",
          width: "100%",
        }}
      >
        <CheckClientType
          DirectoryView={
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "700",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {user.name}
              <Text
                numberOfLines={1}
                style={{
                  fontWeight:"normal",
                  color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                }}
              >
                {" "}
                • {user.username}
              </Text>
            </Text>
          }
          directoryStatus={user.directory_status1}
          verified={user.verified}
        />

        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            maxWidth: "99%",
            textAlign: "left",
          }}
        >
          {user.directory_status1 && (
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              }}
            >
              {user.directory_status1}
            </Text>
          )}

          {user.profession && (
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              {" "}
              | {user.profession}
            </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchPeople = ({ appSearchUserList, isLoading }) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  console.log("Searched data:-->", appSearchUserList);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {appSearchUserList === null && isLoading && (
        <FeedSkeleton rows={5} compact />
      )}

      <Animated.FlatList
        contentContainerStyle={{
          marginTop: "5%",
          paddingBottom: "30%",
        }}
        showsVerticalScrollIndicator={false}
        data={appSearchUserList}
        renderItem={({ item }) => (
          <SearchConnect navigation={navigation} user={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !isLoading && (
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              No results for connects found
            </Text>
          )
        }
      />

      {/* {appSearchList.map((item, index) => (
        <RenderItemPost key={index} item={item} />
      ))} */}
    </View>
  );
};

export default SearchPeople;

const styles = StyleSheet.create({});
