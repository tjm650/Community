import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { InternshipChannel } from "@/DammyData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";
import InternshipsNotifView from "./InternshipsNotifView";

const InternshipsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);

  function InternshipNotif({ item, user }) {
    function OpenMessage() {
      navigation.navigate("NetworkPage", item);
    }
    return (
      <InternshipsNotifView
        onPress={OpenMessage}
        name={item.name}
        description={item.description}
        website={item.website}
        location={item.location}
        locationDetails={item.locationDetails}
        time={item.time}
        Address={item.Address}
        emailAdress={item.emailAdress}
        CompanyName={item.CompanyName}
      />
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
                Internships
              </Text>
            }
            getView={
              <FontAwesomeIcon
                icon="earth"
                size={25}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
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
      <FlatList
        data={InternshipChannel}
        renderItem={({ item }) => <InternshipNotif user={user} item={item} />}
              keyExtractor={(item) => item.id}
        style={{}}
      />
    </SafeAreaView>
  );
};

export default InternshipsScreen;

const styles = StyleSheet.create({});
