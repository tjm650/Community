import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
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
  
  //import { Globals } from "../..//DarkColor";
  import { LGlobals } from "@/constants/LightColor/LGlobals";
  
  //======================================================================================
  
  import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import Messages from "../EmailScreens/Messages";
import HomeEmailTopView from "../TopViews/HomeEmailTopView";
  

  const HomeEmail = () => {
    const navigation = useNavigation();
    const { theme } = useGlobal();
    let isLight = theme === "light";
  
    const [scrollPosition, setScrollPosition] = useState(0);
  
    const handleScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.x);
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => <HomeEmailTopView />,
      });
    }, []);
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollView
           // pagingEnabled={true}
            //onScroll={handleScroll}
            //scrollEventThrottle={1}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              id=""
              style={{
                width: Dimensions.get("window").width,
                paddingHorizontal: "1%",
              }}
              focusable={true}
            >
              <Messages />
            </View>
          </ScrollView>
        </View> 
      </SafeAreaView>
    );
  };
  
  export default HomeEmail;
  
  const styles = StyleSheet.create({});
  