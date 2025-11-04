import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import {
  Entypo,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import EmptyScreen from "../../GlobalScreens/EmptyScreen";
import MainHeader from "../../GlobalScreens/MainHeader";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
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

///////////////////////////////////////////////////////////// Functions /////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Inclasses = () => {
  const [isOpenOngoing, setIsOpenOngoing] = useState(true);
  const [isOpenOnSet, setIsOpenOnSet] = useState(true);
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();
  const [moreFilters, setMoreFilters] = useState(false);

  //////////////////////////////// Functions ///////////////////////////////////////////////////////
  function InclassTopView(params) {
    const { theme } = useGlobal();
    let isLight = theme === "light";
    const [OpenSearch, setOpenSearch] = useState(false);

    return (
      <MainHeader
        header={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            {OpenSearch ? (
              <View
                id="Searchbar"
                style={{
                  paddingVertical: "1%",
                  paddingHorizontal: "5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#3838389a",
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                }}
              >
                <TextInput
                  placeholder="Search InClasses..."
                  placeholderTextColor={"#a5a5a5"}
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,
                    width: "80%",
                  }}
                />
                <TouchableOpacity activeOpacity={0.8}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-search"
                    size={15}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                style={{
                  fontWeight: "500",
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                InClasses
              </Text>
            )}

            <Pressable
              onPress={() =>
                setMoreFilters((val) => !val) & setOpenSearch((value) => !value)
              }
            >
              {OpenSearch ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-sliders"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              )}
            </Pressable>
          </View>
        }
        getView={
          OpenSearch ? (
            ""
          ) : (
            <FontAwesomeIcon
              icon="fa-regular fa-file-lines"
              size={20}
              color={isLight ? LGlobals.text : DGlobals.icon}
            />
          )
        }
      />
    );
  }

  function OptionsView(params) {
    const { theme } = useGlobal();
    let isLight = theme === "light";
    useState(false);

    return moreFilters ? (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          marginTop: "3%",
          paddingHorizontal:"5%"
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
    ) : (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: "2%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
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
                theme === "light"
                  ? Colors.light.liveScreen.LessonsScreen.Ongoing.icon
                  : Colors.light.liveScreen.LessonsScreen.Ongoing.icon
              }
            />
          </View>
        </View>
      </View>
    );
  }

  function InclassLiveView({
    dptName,
    dptCode,
    lesson,
    lessonCode,
    lecturer,
    venue,
    description,
    period,
    live,
    date,
    created,
  }) {
    return (
      <View activeOpacity={0.7}>
        {isOpenOngoing && (
          <View
            id="Department"
            style={{
              paddingVertical: "1%",
              marginBottom: "0%",
              borderBottomWidth: 0.3,
              borderColor: "#d0d0d0",
              paddingHorizontal: "2%",
              borderRadius: 1,
            }}
            activeOpacity={0.9}
            onPress={() => setIsOpenFloatView((value) => !value)}
          >
            <View
              id="TopView"
              style={{
                flexDirection: "row",
                backgroundColor: isLight ? "#00000020" : "#ffffff1b",
                alignItems: "flex-start",
                width: "100%",
                padding: "2%",
                justifyContent: "space-between",
                borderRadius: 5,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  maxWidth: "70%",
                }}
              >
                {dptName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: isLight ? "#806403" : "#FCC500",
                  justifyContent: "flex-end",
                  maxWidth: "25%",
                }}
              >
                {dptCode}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                borderWidth: 0.3,
                /*borderColor: "#808080",*/
                marginVertical: "2%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                paddingHorizontal: "5%",
                backgroundColor: isLight
                  ? LNotifs.events.notifPostView.AccountBackgroundColor
                  : DNotifs.events.notifPostView.AccountBackgroundColor,
                borderColor: isLight
                  ? LNotifs.events.notifPostView.borderColor
                  : DNotifs.events.notifPostView.borderColor,
              }}
            >
              <View
                id="Lesson Details"
                style={{
                  marginTop: "1%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,

                    fontWeight: "500",
                    maxWidth: "70%",
                  }}
                >
                  {lesson}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,

                    fontWeight: "500",
                    maxWidth: "25%",
                  }}
                >
                  {lessonCode}
                </Text>
              </View>

              <View
                id="Lesson Content"
                style={{
                  marginTop: "1%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,

                    width: "55%",
                  }}
                >
                  {lecturer}
                </Text>
                <Pressable
                  id="Venue"
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    maxWidth: "45%",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                  >
                    {venue}
                  </Text>
                </Pressable>
              </View>

              <View
                id="Descriptions"
                style={{
                  marginTop: "1%",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingVertical: "1%",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,
                  }}
                >
                  {description}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              id="Lesson Date"
              style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "1%",
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                    }}
                  >
                    {period}
                  </Text>
                  <FontAwesome5
                    name="chevron-circle-up"
                    size={20}
                    color={"#ff3636"}
                  />
                </View>
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#ff3636",
                    fontWeight: "600",
                  }}
                >
                  {date}
                </Text>

                <Pressable>
                  <FontAwesomeIcon
                    icon={"fa-solid fa-circle-info"}
                    size={15}
                    color={isLight ? "#806403" : "#806403"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  function InclassPendingView({
    dptName,
    dptCode,
    lesson,
    lessonCode,
    lecturer,
    venue,
    description,
    period,
    live,
    date,
    created,
  }) {
    return (
      <View>
        {isOpenOnSet && (
          <TouchableOpacity
            id="Department"
            style={Post.liveScreenPost.InClassesScreen.OnSet.Department}
            activeOpacity={0.9}
            onPress={() => setIsOpenFloatView((value) => !value)}
          >
            <View
              id="TopView"
              style={Post.liveScreenPost.InClassesScreen.OnSet.TopView}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.InClassesScreen.OnSet.DptText}
              >
                {dptName}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.InClassesScreen.OnSet.DptCode}
              >
                {dptCode}
              </Text>
            </View>
            <View
              id="InClass Details"
              style={Post.liveScreenPost.InClassesScreen.OnSet.Lesson}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.InClassesScreen.OnSet.CourseText}
              >
                {lesson}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.InClassesScreen.OnSet.CourseCode}
              >
                {lessonCode}
              </Text>
            </View>
            <View
              id="InClass Content"
              style={Post.liveScreenPost.InClassesScreen.OnSet.CourseContent}
            >
              <Text
                numberOfLines={1}
                style={
                  Post.liveScreenPost.InClassesScreen.OnSet.CourseContentText
                }
              >
                {lecturer}
              </Text>
              <Pressable
                id="Venue"
                style={Post.liveScreenPost.InClassesScreen.OnSet.CourseVenue}
              >
                <Text
                  numberOfLines={1}
                  style={
                    Post.liveScreenPost.InClassesScreen.OnSet.CourseVenueText
                  }
                >
                  {venue}
                </Text>
              </Pressable>
            </View>

            <View
              id="Descriptions"
              style={
                Post.liveScreenPost.InClassesScreen.OnSet.CourseDescriptions
              }
            >
              <Text
                numberOfLines={3}
                style={
                  Post.liveScreenPost.InClassesScreen.OnSet
                    .CourseDescriptionsText
                }
              >
                {description}
              </Text>
            </View>

            <View
              id="InClass Date"
              style={Post.liveScreenPost.InClassesScreen.OnSet.CourseDate}
            >
              <Pressable
                style={Post.liveScreenPost.InClassesScreen.OnSet.CourseDateBtn}
              >
                <Text
                  style={
                    Post.liveScreenPost.InClassesScreen.OnSet.CourseDuration
                  }
                >
                  {period}
                </Text>
                <Entypo
                  name="stopwatch"
                  size={20}
                  color={
                    Colors.light.liveScreen.InClassesScreen.OnSet.lightText
                  }
                />
              </Pressable>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.InClassesScreen.OnSet.CourseDateText}
              >
                {date}
              </Text>
              <Pressable>
                <Text numberOfLines={1}>
                  created •{" "}
                  <Text
                    style={
                      Post.liveScreenPost.InClassesScreen.OnSet
                        .CourseCreatedText
                    }
                  >
                    {created}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function InclassView({ item }) {
    return item.live == "ON" ? (
      <AcademicView
        isLessons={false}
        isIncasses={true}
        isOpenOngoing={true}
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
        isLessons={false}
        isIncasses={true}
        isOpenOngoing={false}
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
  /////////////////////////////////////////////////////////////////////////////////////////////////
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <InclassTopView />,
    });
  }, []);

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
          <EmptyScreen text={"No Inclasses"} />
        ) : (
          // Show requests list
          <View>
            <FlatList
              contentContainerStyle={{
                paddingBottom: "1%",
              }}
              data={lessonsList}
              renderItem={({ item }) => <InclassView item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Inclasses;

const styles = StyleSheet.create({});
