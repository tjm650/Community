import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
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
import FeedSkeleton from "@/components/skeletons/FeedSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyScreen from "../GlobalScreens/EmptyScreen";
import CommunityView from "./CommunityScreen/CommunityView";
//=========================================== Functions ===========================================

const Community = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(true);
  const directoryList = useGlobal((state) => state.directoryList);

  const LoadEvents = () => {
    directoryList
  };

  useEffect(() => {
    LoadEvents();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: "2%" }}>
      {directoryList === null ? (
        <FeedSkeleton rows={4} compact />
      ) : directoryList.length === 0 ? (
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="bell"
              size={50}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          }
          text={"No Communities"}
          OnPressText={"Explore open Communities"}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          borderWidth={0.5}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={directoryList}
            renderItem={({ item }) => <CommunityView item={item} />}
            onRefresh={() => LoadEvents()}
            refreshing={loading}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({});
