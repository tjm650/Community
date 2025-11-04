import useGlobal from "@/assets/core/useGlobal";
import {
  Entypo,
  FontAwesome5
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

const AcademicView = ({
  isOpenOngoing = true,
  isOpenOnSet = false,
  isLessons = true,
  isIncasses = false,
  dptName,
  lessonCode,
  dptCode,
  sub,
  lesson,
  inclass,
  exam,
  lecturer,
  venue,
  description,
  period,
  live,
  date,
  created,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  // const [isOpenOngoing, setIsOpenOngoing] = useState(true);
  // const [isOpenOnSet, setIsOpenOnSet] = useState(true);

  return isOpenOngoing ? (
    isLessons ? (
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
              color: isLight ? LGlobals.text : DGlobals.text,
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
                color={"#00c410"}
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
                color: "#00c410",
                fontWeight: "500",
              }}
            >
              {date}
            </Text>

            <Pressable>
              <FontAwesomeIcon
                icon={"fa-solid fa-circle-info"}
                size={15}
                color={isLight ? LGlobals.text : DGlobals.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    ) : isIncasses ? (
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          paddingHorizontal: "2%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
    ) : (
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
            id="Exam SubJect Content"
            style={{
              marginBottom: "3%",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              Sub: {sub}
            </Text>
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
                fontWeight: "500",
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
    )
  ) : isLessons ? (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
            borderBottomColor: "#5a5a5b",
            borderRadius: 5,
            borderColor: "#808080",
            borderBottomWidth: 0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              justifyContent: "flex-end",
              maxWidth: "25%",
            }}
          >
            {dptCode}
          </Text>
        </View>

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
              color: "#5a5a5b",
              fontWeight: "500",
              maxWidth: "70%",
            }}
          >
            {lesson}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              fontWeight: "700",
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
                color: "#5a5a5b",
                fontWeight: "500",
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
              color: "#5a5a5b",
            }}
          >
            {description}
          </Text>
        </View>

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
                  color: "#5a5a5b",
                  fontWeight: "600",
                }}
              >
                {period}
              </Text>
              <Entypo name="stopwatch" size={20} color={"#5a5a5b"} />
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
                color: isLight ? LGlobals.text : DGlobals.icon,
                fontWeight: "600",
              }}
            >
              {date}
            </Text>

            <Pressable>
              <FontAwesomeIcon
                icon={"fa-solid fa-circle-info"}
                size={15}
                color={isLight ? LGlobals.text : DGlobals.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : isIncasses ? (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
            borderBottomColor: "#5a5a5b",
            borderRadius: 5,
            borderColor: "#808080",
            borderBottomWidth: 0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              justifyContent: "flex-end",
              maxWidth: "25%",
            }}
          >
            {dptCode}
          </Text>
        </View>

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
              color: "#5a5a5b",
              fontWeight: "500",
              maxWidth: "70%",
            }}
          >
            {lesson}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              fontWeight: "700",
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
                color: "#5a5a5b",
                fontWeight: "500",
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
              color: "#5a5a5b",
            }}
          >
            {description}
          </Text>
        </View>

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
                  color: "#5a5a5b",
                  fontWeight: "600",
                }}
              >
                {period}
              </Text>
              <Entypo name="stopwatch" size={20} color={"#5a5a5b"} />
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
                color: isLight ? LGlobals.text : DGlobals.icon,
                fontWeight: "600",
              }}
            >
              {date}
            </Text>

            <Pressable>
              <FontAwesomeIcon
                icon={"fa-solid fa-circle-info"}
                size={15}
                color={isLight ? "#5a5a5b" : DGlobals.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        id="Department"
        style={{
          paddingVertical: "1%",
          marginBottom: "0%",
          borderColor: isLight ? "#00000020" : "#ffffff1b",
          borderBottomWidth: 0.3,
          paddingHorizontal: "2%",
          borderRadius: 7,
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
            borderBottomColor: "#5a5a5b",
            borderRadius: 5,
            borderColor: "#808080",
            borderBottomWidth: 0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              justifyContent: "flex-end",
              maxWidth: "25%",
            }}
          >
            {dptCode}
          </Text>
        </View>

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
              color: "#5a5a5b",
              fontWeight: "500",
              maxWidth: "70%",
            }}
          >
            {lesson}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#5a5a5b",
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
              color: "#5a5a5b",
              fontWeight: "700",
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
                color: "#5a5a5b",
                fontWeight: "500",
              }}
            >
              {venue}
            </Text>
          </Pressable>
        </View>

        <View
          id="Exam SubJect Content"
          style={{
            marginBottom: "3%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            Sub: {sub}
          </Text>
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
              color: "#5a5a5b",
            }}
          >
            {description}
          </Text>
        </View>

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
                  color: "#5a5a5b",
                  fontWeight: "600",
                }}
              >
                {period}
              </Text>
              <Entypo name="stopwatch" size={20} color={"#5a5a5b"} />
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
                color: isLight ? LGlobals.text : DGlobals.icon,
                fontWeight: "600",
              }}
            >
              {date}
            </Text>

            <Pressable>
              <FontAwesomeIcon
                icon={"fa-solid fa-circle-info"}
                size={15}
                color={isLight ? "#5a5a5b" : DGlobals.icon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AcademicView;

const styles = StyleSheet.create({});
