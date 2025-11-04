import {
  FlatList,
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

import useGlobal from "@/assets/core/useGlobal";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";


const community = [];

//////////////////////////////// Functions /////////////////////////////////////////////////////
function CommunityView({ item, isLight }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flex: 1,
        flexDirection: "row",
        height: 70,
        marginBottom: "1%",
      }}
      onPress={() => navigation.navigate("CommunityInbox", item)}
    >
      <View
        id="LeftHorizontalView"
        style={{
          width: "10%",
          marginLeft: "2%",
          marginRight: "4%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#5a5a5b",
            height: 40,
            width: 40,
            borderRadius: 45,
            borderColor: "#D0D0D0",
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {item.Profileimg ? (
            <Image
              style={{
                width: 45,
                height: 45,
                resizeMode: "center",
              }}
              source={item.profileimg}
            />
          ) : (
            <Ionicons name="person" size={25} color="#fbfbfb98" />
          )}
        </View>
      </View>
      <View
        id="RightHorizontalView"
        style={{
          width: "80%",
        }}
      >
        <View>
          <View
            id="TopView"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <Text
              numberOfLines={1}
              id="CommunityName"
              style={{
                fontSize: 15,
                fontWeight: "500",
                width: "85%",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {item.community}
            </Text>
            <View
              id="time"
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                {item.time}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                width: "90%",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {item.description}
            </Text>
            <View
              style={{
                height: 20,
                paddingHorizontal: "2%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#115368",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: 900, color: "#fff" }}
                numberOfLines={1}
              >
                {item.newmessages}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Communities = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const OpenCommunityInbox = (data) => {
    navigation.navigate("CommunityInbox", { data: data });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingTop: "2%",
      }}
    >
      {community.length === 0 ? (
        <View>
          <EmptyScreen
            marginBottom={20}
            OnPressText={"Request Community"}
            color={"#057d8c"}
            text={"You are not Connected to any community"}
            icon={<FontAwesomeIcon icon="school" size={90} color="#d0d0d0" />}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={community}
            renderItem={({ item }) => (
              <CommunityView item={item} isLight={isLight} />
            )}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}
      <View
        style={{
          borderColor: "#d0d0d0",
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          marginVertical: 5,
          paddingVertical:10
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "800",
            fontSize: 17,
            paddingVertical:10
          }}
        >
          Communities you might know
        </Text>
      </View>
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({});
