import React from "react";
import { StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { orgDirectory } from "@/DammyData";
import { useNavigation } from "@react-navigation/native";
import ServiceView from "../CreateService/ServiceView";
import EventView from "./EventView";
import CreatePostRBSheet from "../PostMethods/CreatePostRBSheet";

const EventsData = ({
  handleSelectEvent,
  SelectedEvents,
  handleSelectService,
  SelectedServices,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  // Sample events data - this should come from your backend
  const eventsData = [
    {
      id: "1",
      eventName: "Annual Sports Day",
      bio: "Join us for the biggest sports event of the year with various competitions and activities.",
      category: "Sports",
      date: "2024-12-15",
      venue: "Main Sports Ground",
      duration: "8 hours"
    },
    {
      id: "2",
      eventName: "Tech Conference 2024",
      bio: "A comprehensive conference covering the latest in technology and innovation.",
      category: "Academic",
      date: "2024-12-20",
      venue: "Conference Hall A",
      duration: "6 hours"
    },
    {
      id: "3",
      eventName: "Cultural Festival",
      bio: "Celebrating diverse cultures with performances, food, and traditional activities.",
      category: "Entertainment",
      date: "2024-12-25",
      venue: "Cultural Center",
      duration: "10 hours"
    },
    {
      id: "4",
      eventName: "Workshop: AI & Machine Learning",
      bio: "Hands-on workshop covering practical applications of AI and ML technologies.",
      category: "Workshop",
      date: "2024-12-18",
      venue: "Computer Lab 1",
      duration: "4 hours"
    },
    {
      id: "5",
      eventName: "Student Council Meeting",
      bio: "Monthly meeting to discuss student affairs and upcoming events.",
      category: "Meeting",
      date: "2024-12-10",
      venue: "Meeting Room 2",
      duration: "2 hours"
    }
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <CreatePostRBSheet
          SheetName={"Events"}
          Data={eventsData}
          renderItem={({ item }) => (
            <EventView
              item={item}
              handleSelect={(item) => handleSelectEvent(item)}
              SelectedEvents={SelectedEvents}
            />
          )}
        />

        <CreatePostRBSheet
          SheetName={"Services"}
          Data={orgDirectory}
          renderItem={({ item }) =>
            item.ds1 === "ACADEMIC DEPARTMENT" ? null : item.ds1 ===
              "FACULTY" ? null : item.ds1 === "OFFICE DEPARTMENT" ? null : (
              <ServiceView
                item={item}
                handleSelect={(item) => handleSelectService(item)}
                SelectedServices={SelectedServices}
              />
            )
          }
        />
      </View>
    </View>
  );
};

export default EventsData;

const styles = StyleSheet.create({});
