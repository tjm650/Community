import {
  Ionicons
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";

const selectedItems = [
  {
    id: 1,
    dpt: "Engineering",
  },
  {
    id: 2,
    dpt: "Applied Science",
  },
  {
    id: 3,
    dpt: "Commerce",
  },
  {
    id: 4,
    dpt: "Journalism",
  },
];

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import AcademicView from "../../GlobalScreens/AcademicView";

//======================================================================================

const lessonsList = [
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    description:
      " Its hard for you to sleep when you really know you need Win to be successful. Its hard for you to sleep when you really know you need Win to be successful. Its hard for you to sleep when you really know you need Win to be successful",
    period: "0900 - 1430",
    date: "19/08/24",
    live: "ON",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "ON",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    description:
      " Its hard for you to sleep when you really know you need Win to be successful",
    period: "0900 - 1430",
    date: "19/08/24",
    live: "ON",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "ON",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    description:
      " Its hard for you to sleep when you really know you need Win to be successful",
    period: "0900 - 1430",
    date: "19/08/24",
    live: "TBD",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "ON",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    description:
      " Its hard for you to sleep when you really know you need Win to be successful",
    period: "0900 - 1430",
    date: "19/08/24",
    live: "TBD",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "ON",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "TBD",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    description:
      " Its hard for you to sleep when you really know you need Win to be successful",
    period: "0900 - 1430",
    date: "19/08/24",
    live: "TBD",
    created: "18/08/24",
  },
  {
    facultyName: "ENGINEERING",
    dptName: "INDUSTRIAL ENGINEERING",
    dptCode: "EIE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. K. Mandifungirei",
    venue: "FD34",
    description:
      "Its hard for you to sleep when you really know you need Win to be successful",
    period: "1000 - 1700",
    date: "21/08/24",
    live: "TBD",
    created: "18/08/24",
  },
];

///////////////////////////////////////////////////////// Functions /////////////////////////////////////////////////////////


function MoreOptions({ text, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: isLight ? "#394f5230" : "#172021",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderColor: "#606060",
        borderWidth: 0.3,
        paddingVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "10%",
        gap: 5,
      }}
    >
      <Text
        style={{
          fontWeight: "500",
          color: isLight ? LGlobals.text : DGlobals.text,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Lessons = () => {
  const navigation = useNavigation();
  const [isOpenOngoing, setIsOpenOngoing] = useState(true);
  const [isOpenOnSet, setIsOpenOnSet] = useState(true);
  const [isOpenFloatView, setIsOpenFloatView] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  ////////////////////////////////// Functions /////////////////////////////////////////////////////////////////////////////
  const showLessons = (data) => {
    navigation.navigate("ShowInfor", { data: data });
  };

  function OptionsView(data) {
    const { theme } = useGlobal();
    let isLight = theme === "light";

    const [moreFilters, setMoreFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return moreFilters ? (
      <View>
        {showSearch ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: "1%",
              borderBottomWidth: 0.3,
              borderColor: "#fff",
            }}
          >
            <TextInput
              placeholder="Search lessons..."
              placeholderTextColor={"#a5a5a5"}
              style={{
                width: "80%",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowSearch((value) => (value = false))}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-circle-xmark"
                size={20}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: "2%",
              paddingVertical: "2%",
              gap: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TextInput
                onPressIn={() => setShowSearch((value) => (value = true))}
                placeholder="Search lessons..."
                placeholderTextColor={"#a5a5a5"}
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  backgroundColor: "#3838389a",
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  width: "85%",
                  marginLeft: "5%",
                  paddingVertical: "1%",
                  paddingHorizontal: "5%",
                }}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={() => setMoreFilters((value) => (value = false))}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
          paddingHorizontal:"1%"

              }}
            >
              {selectedItems.map((item) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: isLight ? "#394f5230" : "#172021",
                    paddingHorizontal: "5%",
                    paddingHorizontal: "3%",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    marginBottom: "1%",
                    width: "auto",
                    borderWidth: 0.5,
                    borderColor: "#6e9aa05a",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    key={(item) => item.id}
                    numberOfLines={1}
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontWeight: "600",
                      width: "100%",
                      marginVertical: "5%",
                      textAlign: "center",
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                  >
                    {item.dpt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    ) : (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: "2%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MoreOptions
              text={"Now On"}
              onPress={() => setIsOpenOngoing((value) => !value)}
            />
            <Ionicons
              name={isOpenOngoing ? "chevron-down" : "chevron-forward-outline"}
              size={20}
              color={
                isLight ? LGlobals.icon : DGlobals.icon
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MoreOptions
              text={"Clock"}
              onPress={() => setIsOpenOnSet((value) => !value)}
            />
            <Ionicons
              name={isOpenOnSet ? "chevron-down" : "chevron-forward-outline"}
              size={20}
              color={
                isLight ? LGlobals.icon : DGlobals.icon
              }
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMoreFilters((value) => (value = true))}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-sliders"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function LessonsView({ item }) {
    return item.live == "ON" ? (
      <AcademicView
        isOpenOngoing={true}
        isLessons={true}
        dptName={item.dptName}
        dptCode={item.dptCode}
        lesson={item.lesson}
        lecturer={item.lecturer}
        venue={item.venue}
        description={item.description}
        period={item.period}
        live={item.live}
        date={item.date}
        created={item.created}
      />
    ) : (
      <AcademicView
        isOpenOngoing={false}
        isLessons={true}
        dptName={item.dptName}
        dptCode={item.dptCode}
        lesson={item.lesson}
        lecturer={item.lecturer}
        venue={item.venue}
        description={item.description}
        period={item.period}
        created={item.created}
        date={item.date}
      />
    );
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <OptionsView />
      <View
        style={{
          flex: 1,
        }}
      >
        {lessonsList.length === 0 ? (
          // Show Empty if no requests
          <EmptyScreen text={"No Lessons"} />
        ) : (
          // Show requests list
          <View>
            <FlatList
              automaticallyAdjustKeyboardInsets={true}
              contentContainerStyle={{
                paddingBottom: "1%",
              }}
              data={lessonsList}
              renderItem={({ item }) => (
                <LessonsView navigation={navigation} item={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Lessons;

const styles = StyleSheet.create({});
