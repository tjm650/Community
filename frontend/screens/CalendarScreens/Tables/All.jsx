import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import ExamsHeader from "../../TopViews/NotifsHeaders/ExamsHeader";
import InclassesHeader from "../../TopViews/NotifsHeaders/InclassesHeader";
import LessonsHeader from "../../TopViews/NotifsHeaders/LessonsHeader";
import Exams from "./Exams";
import Inclasses from "./Inclasses";
import Lessons from "./Lessons";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

const All = () => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight? LGlobals.background : DGlobals.background,
      }}
    >
      <ScrollView
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        indicatorStyle="#687390"
        scrollIndicatorInsets={20}
        horizontal={true}
      >
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
          }}
        >
          <LessonsHeader />
          <Lessons />
        </View>
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
          }}
        >
          <InclassesHeader />
          <Inclasses />
        </View>
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
          }}
        >
          <ExamsHeader />
          <Exams />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default All;

const styles = StyleSheet.create({});
