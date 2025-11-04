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
import MainHeader from "../../GlobalScreens/MainHeader";

//======================================================================================

const ExamsList = [
  {
    facultyName: "ENGINEERING",
    dptName: "CHEMICAL ENGINEERING",
    dptCode: "ECE",
    lesson: "Professional Skills",
    lessonCode: "1101",
    lecturer: "Dr. O. Kuipa",
    venue: "FD4",
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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
    sub: "Students Taking SMA2116",
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

const Exams = () => {
  const [isOpenOngoing, setIsOpenOngoing] = useState(true);
  const [isOpenOnSet, setIsOpenOnSet] = useState(true);
  const navigation = useNavigation();
  const [moreFilters, setMoreFilters] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  //////////////////////////////// Functions ///////////////////////////////////////////////////////
  function ExamsTopView(params) {
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
                  placeholder="Search Examinations..."
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
                Examinations
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
          paddingHorizontal: "5%",

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
                theme === "light"
                  ? Colors.light.liveScreen.LessonsScreen.Ongoing.icon
                  : Colors.light.liveScreen.LessonsScreen.Ongoing.icon
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
  
  function ExamLiveView({
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
    sub,
  }) {
    return (
      <View>
        {isOpenOngoing && (
          <TouchableOpacity
            id="Department"
            style={Post.liveScreenPost.ExamsScreen.OnGoing.Department}
            activeOpacity={0.9}
            onPress={() => setIsOpenFloatView((value) => !value)}
          >
            <View
              id="TopView"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.TopView}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.DptText}
              >
                {dptName}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.DptCode}
              >
                {dptCode}
              </Text>
            </View>
            <View
              id="Exam Details"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.Exam}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamText}
              >
                {lesson}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.CourseCode}
              >
                {lessonCode}
              </Text>
            </View>
            <View
              id="Exam Content"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamContent}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamContentText}
              >
                {lecturer}
              </Text>
              <Pressable
                id="Venue"
                style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamVenue}
              >
                <Text
                  numberOfLines={1}
                  style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamVenueText}
                >
                  {venue}
                </Text>
              </Pressable>
            </View>
            <View
              id="Exam SubJect Content"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamSubjectContent}
            >
              <Text
                numberOfLines={1}
                style={
                  Post.liveScreenPost.ExamsScreen.OnGoing.ExamSubjectContentText
                }
              >
                Sub: {sub}
              </Text>
            </View>

            <View
              id="Descriptions"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamDescriptions}
            >
              <Text
                numberOfLines={3}
                style={
                  Post.liveScreenPost.ExamsScreen.OnGoing.ExamDescriptionsText
                }
              >
                {description}
              </Text>
            </View>

            <View
              id="Exam Date"
              style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamDate}
            >
              <Pressable
                style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamDateBtn}
              >
                <Text
                  style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamDuration}
                >
                  {period}
                </Text>
                <FontAwesome5
                  name="chevron-circle-up"
                  size={20}
                  color={Colors.light.liveScreen.ExamsScreen.Ongoing.textRed}
                />
                <Text
                  style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamOnText}
                >
                  {live}
                </Text>
              </Pressable>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnGoing.ExamDateText}
              >
                {date}
              </Text>
              <Pressable>
                <Text numberOfLines={1}>
                  created •{" "}
                  <Text
                    style={
                      Post.liveScreenPost.ExamsScreen.OnGoing.CourseCreatedText
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

  function ExamPendingView({
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
            style={Post.liveScreenPost.ExamsScreen.OnSet.Department}
            activeOpacity={0.9}
            onPress={() => setIsOpenFloatView((value) => !value)}
          >
            <View
              id="TopView"
              style={Post.liveScreenPost.ExamsScreen.OnSet.TopView}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.DptText}
              >
                {dptName}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.DptCode}
              >
                {dptCode}
              </Text>
            </View>
            <View
              id="Exam Details"
              style={Post.liveScreenPost.ExamsScreen.OnSet.Exam}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamText}
              >
                {lesson}
              </Text>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.CourseCode}
              >
                {lessonCode}
              </Text>
            </View>
            <View
              id="Exam Content"
              style={Post.liveScreenPost.ExamsScreen.OnSet.ExamContent}
            >
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamContentText}
              >
                {lecturer}
              </Text>
              <Pressable
                id="Venue"
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamVenue}
              >
                <Text
                  numberOfLines={1}
                  style={Post.liveScreenPost.ExamsScreen.OnSet.ExamVenueText}
                >
                  {venue}
                </Text>
              </Pressable>
            </View>
            <View
              id="Exam Subject Content"
              style={Post.liveScreenPost.ExamsScreen.OnSet.ExamSubjectContent}
            >
              <Text
                numberOfLines={1}
                style={
                  Post.liveScreenPost.ExamsScreen.OnSet.ExamSubjectContentText
                }
              >
                Sub: Students Taking SMA2116
              </Text>
              <Pressable
                id="Venue"
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamVenue}
              ></Pressable>
            </View>
            <View
              id="Descriptions"
              style={Post.liveScreenPost.ExamsScreen.OnSet.ExamDescriptions}
            >
              <Text
                numberOfLines={3}
                style={
                  Post.liveScreenPost.ExamsScreen.OnSet.ExamDescriptionsText
                }
              >
                {description}
              </Text>
            </View>

            <View
              id="Exam Date"
              style={Post.liveScreenPost.ExamsScreen.OnSet.ExamDate}
            >
              <Pressable
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamDateBtn}
              >
                <Text
                  style={Post.liveScreenPost.ExamsScreen.OnSet.ExamDuration}
                >
                  {period}
                </Text>
                <Entypo
                  name="stopwatch"
                  size={20}
                  color={Colors.light.liveScreen.ExamsScreen.Ongoing.lightText}
                />
              </Pressable>
              <Text
                numberOfLines={1}
                style={Post.liveScreenPost.ExamsScreen.OnSet.ExamDateText}
              >
                {date}
              </Text>
              <Pressable>
                <Text numberOfLines={1}>
                  created •{" "}
                  <Text
                    style={
                      Post.liveScreenPost.ExamsScreen.OnSet.CourseCreatedText
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

  function ExamView({ item }) {
    return item.live == "ON" ? (
      <AcademicView
        isLessons={false}
        isIncasses={false}
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
        sub={item.sub}
      />
    ) : (
      <AcademicView
        isLessons={false}
        isIncasses={false}
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
        sub={item.sub}
      />
    );
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ExamsTopView />,
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
        {ExamsList.length === 0 ? (
          // Show Empty if no requests
          <EmptyScreen text={"No Inclasses"} />
        ) : (
          // Show requests list
          <View>
            <FlatList
              contentContainerStyle={{
                paddingBottom: "1%",
              }}
              data={ExamsList}
              renderItem={({ item }) => (
                <ExamView navigation={navigation} item={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Exams;

const styles = StyleSheet.create({});
