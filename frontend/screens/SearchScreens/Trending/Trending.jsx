import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import FeedSkeleton from "@/components/FeedSkeleton";
import RBOptionsSheet from "@/screens/GlobalScreens/RBSheets/RBOptionsSheet";
import Monetization from "@/screens/Monetization/Monetization";
import QuercusViewButton from "@/screens/QuercusAI/QuercusViewButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import IconSearch from "../Search/IconSearch";
import TrendingItem from "./TrendingItem";
import TrendingItemData from "./TrendingItemData";

// const trendingData = []

const TrendingView = ({ trendingData, trendingItemName }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [paged, setPaged] = useState(true);
  return (
    <View
      style={{
        borderBottomWidth: 0,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        // paddingTop: 5,
        // paddingHorizontal: "2%",
        marginVertical: 5,
        borderRadius: 7,
      }}
    >
      <TrendingItem trendingItemName={trendingItemName} />

      <ScrollView
        pagingEnabled
        // horizontal
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={{
        }}
      >
        {trendingData &&
          trendingData.length > 0 &&
          trendingData
            .slice(0, 1)
            .map((item, index) => (
              <TrendingItemData key={index} data={item} setPaged={setPaged} />
            ))}
      </ScrollView>
    </View>
  );
};

const Trending = ({ trendingData, focusTextInput, isLoading, setVal }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const moreInfo = useRef([]);

   const navigation = useNavigation();
 
  const appTrendingData = useGlobal((state) => state.appTrendingData) || [];

  const trimName = "Accommodation";

  const renderData = (trimName, data) => {
    let val = data.some(
      (name) =>
        name.trendingtype.replace(/\s+/g, " ").trim().toLowerCase() ===
        trimName.toLowerCase()
    );
    if (val) {
      return val;
    }
  };

  const RenderTerendingPost = ({ item }) => {
    return (
      <Pressable
        onPress={() => setVal(item.query)}
        style={{
          marginBottom: "5%",
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            // fontWeight: "500",
            textTransform: "capitalize",
            fontSize: 16,
          }}
        >
          {item.query}
        </Text>
      </Pressable>
    );
  };


  return trendingData && trendingData.length > 0 ? (
    <ScrollView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "1%",
        paddingBottom: "5%",
        marginBottom: Dimensions.get("window").height * 0.1,
      }}
    >
      <View
        style={{
          paddingVertical: "2%",
          paddingBottom:"5%"
        }}
      >
        <QuercusViewButton />
      </View>

      <RBOptionsSheet
        GetIcon={
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                //   fontWeight: "700",
                textTransform: "capitalize",
                fontSize: 18,
              }}
            >
              Latest from your location
            </Text>

            <FontAwesomeIcon
              icon="fa-solid fa-chart-line"
              size={15}
              color={isLight ? LGlobals.lighttext : DGlobals.icon}
            />
          </View>
        }
        GetView={
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
            }}
          >
            Latest and trending from your location for the past 24 hours
          </Text>
        }
        CommmentSheet={moreInfo}
      />

      <View
        style={{
          paddingVertical: "5%",
        }}
      >
        <Monetization />
      </View>

      {appTrendingData && appTrendingData.length > 0 && (
        <View>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: 17,
              marginBottom: "2%",
            }}
          >
            Trending Searches
          </Text>

          {appTrendingData === null && isLoading ? (
            <FeedSkeleton rows={3} compact />
          ) : (
            <FlatList
              data={appTrendingData || []}
              // renderItem={renderTrendingItem}
              renderItem={({ item }) => <RenderTerendingPost item={item} />}
              keyExtractor={(item) => item?.id || Math.random().toString()}
              ListEmptyComponent={
                !isLoading && (
                  <Text
                    style={{
                      color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                    }}
                  >
                    No Trending searches found
                  </Text>
                )
              }
            />
          )}
        </View>
      )}

      <TrendingView
        trendingItemName={"Accommodation"}
        trendingData={trendingData}
      />

      <TrendingView trendingItemName={"Events"} trendingData={trendingData} />
    </ScrollView>
  ) : (
    <IconSearch
      LGlobals={LGlobals}
      DGlobals={DGlobals}
      isLight={isLight}
      // focusTextInput={focusTextInput}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
