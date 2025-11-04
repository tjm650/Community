import {
  AntDesign
} from "@expo/vector-icons";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import CheckClientType from "../GlobalScreens/CheckClientType";
import EmptyScreen from "../GlobalScreens/EmptyScreen";

//////////////////////// Functions /////////////////////////////////

const SearchButton = ({ user }) => {
  const requestConnect = useGlobal((state) => state.requestConnect);
  const { theme } = useGlobal();
  let isLight = theme === "light";
  // add a tick if user already connected
  if (user.status === "connected") {
    return (
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-user-check"
          size={25}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
        />
      </View>
    );
  }

  const data = {};

  switch (user.status) {
    case "not-connected":
      data.text = "connect";
      data.disabled = false;
      data.onPress = () => requestConnect(user.username);
      break;
    case "pending_them":
      data.text = "Pending";
      data.disabled = true;
      data.onPress = () => requestConnect(user.username);
      break;
    case "pending_me":
      data.text = "Accept";
      data.disabled = false;
      data.onPress = () => requestConnect(user.username);
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.disabled
          ? "transparent"
          : isLight
          ? DGlobals.lighttext
          : LGlobals.lighttext,
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        // height: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        minWidth: 70,
      }}
      disabled={data.disabled}
      onPress={data.onPress}
    >
      <Text
        style={{
          color: data.disabled
            ? isLight
              ? LGlobals.lighttext
              : DGlobals.lighttext
            : isLight
            ? LGlobals.text
            : DGlobals.text,
          // fontWeight: 600,
          textAlign: "center",
        }}
      >
        {data.text}
      </Text>
    </TouchableOpacity>
  );
};

const SearchRow = ({ user }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        borderBottomColor: "#d0d0d0",
        height: "auto",
        paddingVertical: "4%",
        borderRadius: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "75%",
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 35,
            height: 35,
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
          <View>
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
        </View>

        <View
          style={{
            marginLeft: "7%",
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
                {user.username}
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
      </View>

      <SearchButton user={user} />
    </View>
  );
};

const SearchConnects = () => {
  const [query, setQuery] = useState("");
  const searchlist = useGlobal((state) => state.searchlist);
  const searchUsers = useGlobal((state) => state.searchUsers);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const textInputRef1 = useRef(null);
    
  const focusTextInput = () => {
    textInputRef1.current?.focus();
  };

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  function IconError() {
    return (
      <View
        style={{
          height: "100%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmptyScreen
          text={'No users found for "' + query + '"'}
          icon={<AntDesign name="home" size={70} color="#0D99FF" />}
        />
      </View>
    );
  }

  function IconSearch() {
    return (
      <View
        style={{
          height: "100%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          btn={true}
          marginBottom={50}
          OnPressText={"Search"}
          onPress={focusTextInput}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          text={"Search for connects"}
        />
      </View>
    );
  }

  function OnClear() {
    const SearchQuery = query;
    if (SearchQuery.length === 0) return;
    setQuery("");
  }

  function SearchBar() {


    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "#43515346",
            borderRadius: 25,
            alignSelf: "center",
            flexDirection: "row",
            paddingVertical: "0%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: "5%",
          }}
        >
          <TextInput
          ref={textInputRef1}
            style={{
              width: "90%",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
            placeholderTextColor={isLight ? LGlobals.text : DGlobals.text}
            placeholder="Search Connects"
            value={query}
            onChangeText={setQuery}
          />
          {query && (
            <Pressable onPress={OnClear}>
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size={20}
                color="#d0d0d0"
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: "5%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <SearchBar />
      {searchlist === null ? (
        IconSearch()
      ) : searchlist.length === 0 ? (
        IconError()
      ) : (
        <FlatList
          data={searchlist}
          renderItem={({ item }) => <SearchRow user={item} />}
          keyExtractor={(item) => item.username}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchConnects;

const styles = StyleSheet.create({});
