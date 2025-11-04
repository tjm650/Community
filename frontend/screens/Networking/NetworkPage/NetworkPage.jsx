import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { stats } from "@/DammyData";
import { SafeAreaView } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";
import NetworkPageDetails from "./NetworkPageDetails";
import NetworkPageInfor from "./NetworkPageInfor";
import NetworkPageTopView from "./NetworkPageTopView";

const NetworkPage = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const name = route.params.name;
  const Address = route.params.Address;
  const emailAdress = route.params.emailAdress;
  const website = route.params.website;
  const description = route.params.description;
  const location = route.params.location;
  const locationDetails = route.params.locationDetails;
  const CompanyName = route.params.CompanyName;
  const time = route.params.time;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 20,
                fontWeight: "700",
                marginBottom: "1%",
              }}
            >
              {CompanyName}
            </Text>
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "2%",
      }}
    >
      <ScrollView>
        <NetworkPageTopView description={description} />
        <NetworkPageDetails
          description={description}
          emailAdress={emailAdress}
          location={location}
          locationDetails={locationDetails}
          website={website}
          Address={Address}
        />
        <NetworkPageInfor name={name} stats={stats} height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NetworkPage;

const styles = StyleSheet.create({});
