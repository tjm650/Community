// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

//======================================================================================

import { Dimensions } from "react-native";
import { Colors } from "./Colors";

export const Post = {
  liveScreenPost: {
    LessonsScreen: {
      OnGoing: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.BackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.borderColor,
          marginTop: "2%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.ViewBackground,
          height: "auto",
          borderColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.borderColor,
          marginHorizontal: "1%",
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "1%",
          paddingVertical: "1%",
          alignItems: "center",
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "condensed",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "700",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.textgreen,
          fontWeight: "900",
        },
        CourseOnText: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.textgreen,
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.iconRed,
        },
        iconOnColor: {
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.iconRed,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.LessonsScreen.Ongoing.text,
        },
      },
      OnSet: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.OnSet.BackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: Colors.light.liveScreen.LessonsScreen.OnSet.borderColor,
          marginTop: "5%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        Department: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.OnSet.ViewBackground,
          height: "auto",
          borderColor: Colors.light.liveScreen.LessonsScreen.OnSet.borderColor,
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        OnSetOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.OnSet.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.text,
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseOnText: {
          color: "#04a811",
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.LessonsScreen.OnSet.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.OnSet.lightText,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.LessonsScreen.OnSet.iconGray,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      FloatView: {
        FloatView: {
          maxHeight: "75%",
          width: "95%",
          position: "absolute",
          zIndex: 999,
          backgroundColor: "#bababa",
          top: Dimensions.get("window").height * 0.05,
          borderBottomStartRadius: 20,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          borderColor:
            Colors.light.liveScreen.LessonsScreen.FloatView.background,
          alignSelf: "center",
          overflow: "hidden",
          paddingHorizontal: "2%",
          paddingTop: "1%",
        },
        FloatScrollview: {},
        TopView: {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.LessonsScreen.FloatView.borderColor,
          borderRadius: 30,
        },
        FloatTopViewName: {
          color:
            Colors.light.liveScreen.LessonsScreen.FloatView.FloatTopViewName,
          fontWeight: "500",
          maxWidth: "90%",
        },
        TopView1: {
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "90%",
        },
        FloatTopViewEmail: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.textEmail,
          fontWeight: "800",
          maxWidth: "90%",
          fontSize: 13,
          marginBottom: "5%",
        },
        FloatTopViewIcon: {
          color:
            Colors.light.liveScreen.LessonsScreen.FloatView.FloatTopViewIcon,
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.FloatView.background,
          height: "auto",
          borderWidth: 1,
          borderColor:
            Colors.light.liveScreen.LessonsScreen.FloatView.borderColor,
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          marginTop: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "condensed",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "500",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseDateText: {
          fontWeight: "900",
          color: Colors.light.liveScreen.LessonsScreen.FloatView.lightText,
        },
        CourseOnText: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.lightText,
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.FloatView.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.LessonsScreen.FloatView.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.iconRed,
        },
        iconOnColor: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.iconRed,
        },
      },
    },
    InClassesScreen: {
      OnGoing: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.BackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.borderColor,
          marginTop: "2%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.ViewBackground,
          height: "auto",
          borderColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.borderColor,
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.lightText,
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "condensed",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.textRed,
          fontWeight: "900",
        },
        CourseOnText: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.textRed,
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.iconRed,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.InClassesScreen.Ongoing.text,
        },
      },
      OnSet: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.OnSet.BackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor:
            Colors.light.liveScreen.InClassesScreen.OnSet.borderColor,
          marginTop: "5%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        Department: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.OnSet.ViewBackground,
          height: "auto",
          borderColor:
            Colors.light.liveScreen.InClassesScreen.OnSet.borderColor,
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        OnSetOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.text,
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.InClassesScreen.OnSet.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.OnSet.lightText,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.InClassesScreen.OnSet.iconGray,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.InClassesScreen.OnSet.Fadetext,
        },
      },
      FloatView: {
        FloatView: {
          maxHeight: "75%",
          width: "95%",
          position: "absolute",
          zIndex: 999,
          backgroundColor: "#bababa",
          top: Dimensions.get("window").height * 0.05,
          borderBottomStartRadius: 20,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          borderColor:
            Colors.light.liveScreen.InClassesScreen.FloatView.background,
          alignSelf: "center",
          overflow: "hidden",
          paddingHorizontal: "2%",
          paddingTop: "1%",
        },
        FloatScrollview: {},
        TopView: {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.InClassesScreen.FloatView.borderColor,
          borderRadius: 30,
        },
        FloatTopViewName: {
          color:
            Colors.light.liveScreen.InClassesScreen.FloatView.FloatTopViewName,
          fontWeight: "500",
          maxWidth: "90%",
        },
        TopView1: {
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "90%",
        },
        FloatTopViewEmail: {
          color: Colors.light.liveScreen.LessonsScreen.FloatView.textEmail,
          fontWeight: "800",
          maxWidth: "90%",
          fontSize: 13,
          marginBottom: "5%",
        },
        FloatTopViewIcon: {
          color:
            Colors.light.liveScreen.LessonsScreen.FloatView.FloatTopViewIcon,
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.InClassesScreen.FloatView.background,
          height: "auto",
          borderWidth: 1,
          borderColor:
            Colors.light.liveScreen.InClassesScreen.FloatView.borderColor,
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          marginTop: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "condensed",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "500",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.lightText,
          fontWeight: "900",
        },
        CourseOnText: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.lightText,
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.FloatView.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.InClassesScreen.FloatView.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.InClassesScreen.FloatView.iconRed,
        },
      },
    },
    EventsScreen: {
      OnGoing: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.LessonsScreen.Ongoing.BackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: Colors.light.liveScreen.EventsScreen.Ongoing.borderColor,
          marginTop: "2%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        Department: {
          backgroundColor: Colors.light.liveScreen.EventsScreen.FloatView.LiveScreenPostBackground,
          height: "auto",
          borderWidth: 1,
          borderColor: Colors.light.liveScreen.EventsScreen.Ongoing.borderColor,
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          marginTop: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptionsText: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "condensed",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.EventsScreen.Ongoing.text,
          fontWeight: "900",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
        },
        FloatView: {
          maxHeight: "75%",
          width: "95%",
          position: "absolute",
          zIndex: 999,
          backgroundColor: "#bababa",
          top: Dimensions.get("window").height * 0.05,
          borderBottomStartRadius: 20,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          alignSelf: "center",
          overflow: "hidden",
          paddingHorizontal: "2%",
          paddingTop: "1%",
        },
        FloatScrollview: {},
        FloatTopView: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: "1%",
          marginBottom: "2%",
        },
        FloatTopViewName: {
          color: "#fff",
          fontWeight: "500",
          maxWidth: "90%",
        },
        FloatTopViewEmail: {
          color: "#0D99FF",
          fontWeight: "800",
          maxWidth: "90%",
          fontSize: 13,
        },
      },
      OnSet: {
        SectionList: {
          backgroundColor: Colors.light.liveScreen.EventsScreen.FloatView.LiveScreenPostBackgroundSection,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: Colors.light.liveScreen.EventsScreen.OnSet.borderColor,
          marginTop: "5%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        Department: {
          backgroundColor: Colors.light.liveScreen.EventsScreen.FloatView.LiveScreenPostBackground,
          height: "auto",
          borderWidth: 1,
          borderColor: Colors.light.liveScreen.EventsScreen.OnSet.borderColor,
          borderBottomStartRadius: 10,
          borderTopStartRadius: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          marginTop: "1%",
          paddingVertical: "2%",
        },
        Lesson: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseDescriptionsText: {
          color: "black",
        },
        CourseContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseText: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "25%",
        },
        CourseVenueText: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        CourseContentText: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
          width: "55%",
        },
        CourseDuration: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseDateText: {
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        CourseDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        CourseDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: Colors.light.liveScreen.EventsScreen.OnSet.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.EventsScreen.OnSet.lightText,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.EventsScreen.OnSet.textFadeYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.EventsScreen.OnSet.Fadetext,
        },
      },
      FloatView: {
        FloatView: {
          maxHeight: "75%",
          width: "95%",
          position: "absolute",
          zIndex: 999,
          backgroundColor: "#bababa",
          top: Dimensions.get("window").height * 0.05,
          borderBottomStartRadius: 20,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          borderColor: Colors.dark.GlobalColors.background,
          alignSelf: "center",
          overflow: "hidden",
          paddingHorizontal: "2%",
          paddingTop: "1%",
        },
        FloatScrollview: {},
        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: Colors.light.liveScreen.EventsScreen.FloatView.borderColor,
          borderRadius: 30,
        },
        FloatTopViewName: {
          color: Colors.light.liveScreen.EventsScreen.FloatView.FloatTopViewName,
          fontWeight: "500",
          maxWidth: "90%",
        },
        TopView1: {
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "90%",
        },
        FloatTopViewEmail: {
          color: Colors.light.liveScreen.EventsScreen.FloatView.textEmail,
          fontWeight: "800",
          maxWidth: "90%",
          fontSize: 13,
        },
        FloatTopViewIcon: {
          color: "#0D99FF",
        },
      },
    },
    ExamsScreen: {
      OnGoing: {
        SectionList: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.background,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: Colors.light.liveScreen.ExamsScreen.Ongoing.borderColor,
          marginTop: "2%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.background,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.ViewBackground,
          height: "auto",
          borderColor: Colors.light.liveScreen.ExamsScreen.Ongoing.borderColor,
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        Exam: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.lightText,
        },
        ExamDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamDescriptionsText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "condensed",
        },
        ExamContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamSubjectContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        ExamContentText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          width: "55%",
        },
        ExamSubjectContentText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "700",
          width: "95%",
        },
        ExamDuration: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
        },
        ExamVenueText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
        },
        ExamVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        ExamDateText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.textRed,
          fontWeight: "900",
        },
        ExamOnText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.textRed,
          fontWeight: "900",
        },
        ExamDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        ExamDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.iconRed,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
        },
      },
      OnSet: {
        SectionList: {
          backgroundColor: Colors.light.liveScreen.ExamsScreen.OnSet.background,
          paddingVertical: "2%",
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: Colors.light.liveScreen.ExamsScreen.OnSet.borderColor,
          marginTop: "5%",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
        },
        Department: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.OnSet.ViewBackground,
          height: "auto",
          borderColor: Colors.light.liveScreen.ExamsScreen.OnSet.borderColor,
          marginBottom: "1%",
          paddingVertical: "2%",
        },
        OnSetOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.background,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },
        Exam: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        CourseCreatedText: {
          fontWeight: "500",
          textDecorationLine: "underline",
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
        },
        ExamDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamDescriptionsText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.text,
        },
        ExamContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamSubjectContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
          maxWidth: "25%",
        },
        ExamVenueText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        ExamVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        ExamContentText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
          width: "55%",
        },
        ExamSubjectContentText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "700",
          width: "55%",
        },
        ExamDuration: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        ExamDateText: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          fontWeight: "500",
        },
        ExamDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        ExamDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },

        TopView: {
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.ExamsScreen.OnSet.borderColor,
          borderRadius: 30,
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.OnSet.lightText,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.ExamsScreen.OnSet.iconGray,
        },
        SectionListText: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.liveScreen.ExamsScreen.OnSet.Fadetext,
        },
      },
      FloatView: {
        FloatView: {
          maxHeight: "75%",
          width: "95%",
          position: "absolute",
          zIndex: 999,
          backgroundColor: "#bababa",
          top: Dimensions.get("window").height * 0.05,
          borderBottomStartRadius: 20,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          borderColor: Colors.light.liveScreen.ExamsScreen.FloatView.background,
          alignSelf: "center",
          overflow: "hidden",
          paddingHorizontal: "2%",
          paddingTop: "1%",
        },
        FloatScrollview: {},
        TopView: {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor:
            Colors.light.liveScreen.ExamsScreen.FloatView.borderColor,
          borderRadius: 30,
        },
        FloatTopViewName: {
          color: Colors.light.liveScreen.ExamsScreen.FloatView.FloatTopViewName,
          fontWeight: "500",
          maxWidth: "90%",
        },
        TopView1: {
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "90%",
        },
        FloatTopViewEmail: {
          color: Colors.light.liveScreen.ExamsScreen.FloatView.textEmail,
          fontWeight: "800",
          maxWidth: "90%",
          fontSize: 13,
          marginBottom: "5%",
        },
        FloatTopViewIcon: {
          color: Colors.light.liveScreen.ExamsScreen.FloatView.FloatTopViewIcon,
        },
        OnGoingOpenOrClosed: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.BackgroundSection,
          flexDirection: "row",
          width: "60%",
          gap: 10,
        },

        Department: {
          backgroundColor:
            Colors.light.liveScreen.ExamsScreen.Ongoing.ViewBackground,
          height: "auto",
          borderWidth: 1,
          borderColor: Colors.light.liveScreen.ExamsScreen.Ongoing.borderColor,
          borderBottomStartRadius: 25,
          borderTopStartRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          marginTop: "1%",
          paddingVertical: "2%",
        },
        Exam: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamDescriptions: {
          marginTop: "1%",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamDescriptionsText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "condensed",
        },
        ExamContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamSubjectContent: {
          marginTop: "1%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
          alignItems: "center",
        },
        ExamText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "70%",
        },
        CourseCode: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          maxWidth: "25%",
        },
        ExamContentText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
          width: "55%",
        },
        ExamSubjectContentText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "700",
          width: "95%",
        },
        ExamDuration: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
        },
        ExamVenueText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          fontWeight: "500",
        },
        ExamVenue: {
          justifyContent: "flex-end",
          alignItems: "center",
          maxWidth: "45%",
        },
        ExamDateText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.lightText,
          fontWeight: "900",
        },
        ExamOnText: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.lightText,
          fontWeight: "900",
        },
        ExamDate: {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "1%",
          paddingHorizontal: "2%",
        },
        ExamDateBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-end",
        },
        DptText: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.text,
          maxWidth: "70%",
        },
        DptCode: {
          fontSize: 15,
          fontWeight: "700",
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.textYellow,
          justifyContent: "flex-end",
          maxWidth: "25%",
        },
        iconColor: {
          color: Colors.light.liveScreen.ExamsScreen.Ongoing.iconRed,
        },
      },
    },
  },
};
