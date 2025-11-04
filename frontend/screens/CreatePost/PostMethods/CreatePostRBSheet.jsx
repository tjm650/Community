import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

////////////////////////////////////// Functions /////////////////////////////////////////////////////////

const CreatePostRBSheet = ({
  Data,
  dataView,
  renderItem,
  Category,
  SheetName,
}) => {
  const refRBSheet = useRef([]);
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [OpenSearch, setOpenSearch] = useState(false);

  function OpenSheet(data) {
    refRBSheet.current.open();
  }

  function CloseSheet(data) {
    refRBSheet.current.close();
  }

  ////////////////////////////////////// Functions /////////////////////////////////////////////////////////

  return (
    <View>
      <TouchableOpacity
        onPress={OpenSheet}
        style={{
          backgroundColor: isLight ? "#172021" : "#7f7f7f50",
          paddingHorizontal: "5%",
          paddingVertical: "3%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          marginBottom: "1%",
          width: "auto",
          borderWidth: 1,
          borderColor: "#6e9aa05a",
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ paddingHorizontal: "3%" }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {SheetName}
          </Text>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragOnContent={true}
        draggable={true}
        customStyles={{
          container: {
            maxHeight: "80%",
            height: "auto",
            width: "100%",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
         //   borderTopWidth: 1,
          //  borderLeftWidth: 1,
            //borderRightWidth: 1,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },

          draggableIcon: {
            display: "none",
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}
      >
        <View
          style={{
            paddingHorizontal: "2%",
            marginTop: "2%",
          }}
        >
          <View
            id="TopView"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: OpenSearch ? "center" : "space-between",
              borderBottomWidth: 0.1,
              borderBottomColor: "rgba(248, 252, 254, 0.683)",
              paddingHorizontal: "2%",
              paddingBottom: "2%",
            }}
          >
            {OpenSearch ? (
              <View
                id="Searchbar"
                style={{
                  borderRadius: 25,
                  paddingHorizontal: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  backgroundColor: "#6d6d6d46",

                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{
                    color: isLight
                      ? LGlobals.rbSheets.text
                      : DGlobals.rbSheets.text,

                    width: "90%",
                  }}
                  placeholder="Search"
                  placeholderTextColor={
                    isLight ? LGlobals.lighttext : DGlobals.lighttext
                  }
                />
                <TouchableOpacity onPress={() => setOpenSearch(false)}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-xmark"
                    size={15}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 17,
                  color: isLight
                    ? LGlobals.rbSheets.text
                    : DGlobals.rbSheets.text,
                }}
              >
                {SheetName}
              </Text>
            )}
            <TouchableOpacity
              style={{ marginRight: "2%" }}
              onPress={() => setOpenSearch((value) => !value)}
            >
              {OpenSearch ? (
                ""
              ) : (
                <FontAwesome
                  name="search"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <FlatList
            scrollEnabled={true}
            s
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{
              paddingBottom: "10%",
            }}
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default CreatePostRBSheet;

const styles = StyleSheet.create({});
