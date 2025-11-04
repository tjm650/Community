import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

//======================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { newCommunities } from "@/DammyData";


/////////////////////////////// Functions ///////////////////////////////////
function ExploreCommunitiesView({ data }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.6,
        backgroundColor: "#c7d8de30",
        borderRadius: 15,
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginRight: 15,
        borderWidth: 1,
        borderColor: "#d0d0d0",
        height: 200,

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
          style={{
            color: "#fff",
          }}
        >
          • {data.description}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "#fff",
          }}
        >
          {data.MutualConnects}
        </Text>
      </View>
    </View>
  );
}

const ExploreCommunities = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <FlatList
      horizontal
      scrollEnabled={true}
      data={newCommunities}
      renderItem={({ item }) => <ExploreCommunitiesView data={item} />}
      keyExtractor={(data) => data.id}
      style={{ paddingHorizontal: "2%" }}
    />
  );
};

export default ExploreCommunities;

const styles = StyleSheet.create({});
