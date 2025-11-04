import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/common/core/useGlobal";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";
import { CreateNotifPost } from "./CreateService";
import SelectedService from "./SelectedService";
import ServicesData from "./ServicesData";

const CreatePoll = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showInfor, setShowIfor] = useState(true);
  const user = useGlobal((state) => state.user);
  const notifSend = useGlobal((state) => state.notifSend);
  const notificationList = useGlobal((state) => state.notificationList);

  const [pollQuestion, setPollQuestion] = useState("");
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollSections, setPollSections] = useState([
    {
      id: 1,
      name: "Section 1",
      color: "#FF6B6B",
      items: ["", ""],
    },
  ]);
  const [pollType, setPollType] = useState("single"); // single or multiple
  const [pollSettings, setPollSettings] = useState({
    duration: 24, // hours
    allowMultipleVotes: false,
    anonymousVoting: false,
    hideResults: false,
    showResultsAfterVote: true,
    maxVotesPerUser: 1,
    requireServiceMember: false,
    allowComments: true,
    sendReminders: true,
    reminderFrequency: 12, // hours
    category: "general",
    tags: [],
    visibility: "public", // public, followers, private
  });
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [showSelectedService, setshowSelectedService] = useState(false);
  const [selectedServices, setSelectedServices] = useState(null); // Will be set to service object with id property

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  const handleSelectService = (item) => {
    setSelectedServices(item);
    setshowSelectedService((value) => (value = true));
  };

  const addSection = () => {
    if (pollSections.length < 5) {
      const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
      const newSection = {
        id: Date.now(),
        name: `Section ${pollSections.length + 1}`,
        color: colors[pollSections.length % colors.length],
        items: ["", ""],
      };
      setPollSections([...pollSections, newSection]);
    } else {
      Alert.alert(
        "Maximum Sections",
        "You can only add up to 5 sections for a poll."
      );
    }
  };

  const removeSection = (sectionId) => {
    if (pollSections.length > 1) {
      setPollSections(
        pollSections.filter((section) => section.id !== sectionId)
      );
    } else {
      Alert.alert("Minimum Sections", "A poll must have at least 1 section.");
    }
  };

  const updateSectionName = (sectionId, name) => {
    setPollSections(
      pollSections.map((section) =>
        section.id === sectionId ? { ...section, name } : section
      )
    );
  };

  const addItemToSection = (sectionId) => {
    setPollSections(
      pollSections.map((section) => {
        if (section.id === sectionId) {
          if (section.items.length < 8) {
            return { ...section, items: [...section.items, ""] };
          } else {
            Alert.alert(
              "Maximum Items",
              "You can only add up to 8 items per section."
            );
            return section;
          }
        }
        return section;
      })
    );
  };

  const updateItemInSection = (sectionId, itemIndex, text) => {
    setPollSections(
      pollSections.map((section) => {
        if (section.id === sectionId) {
          const updatedItems = [...section.items];
          updatedItems[itemIndex] = text;
          return { ...section, items: updatedItems };
        }
        return section;
      })
    );
  };

  const removeItemFromSection = (sectionId, itemIndex) => {
    setPollSections(
      pollSections.map((section) => {
        if (section.id === sectionId) {
          if (section.items.length > 1) {
            const updatedItems = section.items.filter(
              (_, i) => i !== itemIndex
            );
            return { ...section, items: updatedItems };
          } else {
            Alert.alert(
              "Minimum Items",
              "A section must have at least 1 item."
            );
            return section;
          }
        }
        return section;
      })
    );
  };

  const getTotalItems = () => {
    return pollSections.reduce(
      (total, section) => total + section.items.length,
      0
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Create Poll
            </Text>
          }
        />
      ),
    });
  });

  const handleCreatePoll = () => {
    if (!showSelectedService) {
      setAuth(true);
      setRes("Please select a service from your services list");
      return;
    }

    if (!pollTitle.trim()) {
      setAuth(true);
      setRes("Please enter a poll title");
      return;
    }

    if (!pollQuestion.trim()) {
      setAuth(true);
      setRes("Please enter a poll question");
      return;
    }

    // Validate sections and items
    const validSections = pollSections.filter(
      (section) =>
        section.name.trim() && section.items.some((item) => item.trim())
    );

    if (validSections.length === 0) {
      setAuth(true);
      setRes("Please provide at least one section with items");
      return;
    }

    const totalValidItems = validSections.reduce(
      (total, section) =>
        total + section.items.filter((item) => item.trim()).length,
      0
    );

    if (totalValidItems < 2) {
      setAuth(true);
      setRes("Please provide at least 2 poll items across all sections");
      return;
    }

    // Create poll data with sections
    const details = {
      sender: user.id,
      service: selectedServices?.id?.toString() || "",
      update_type: "Poll",
      image: image ? image1 : null,
      description: pollQuestion,
      extra_data: {
        title: pollTitle.trim(),
        description: pollDescription.trim(),
        poll_question: pollQuestion,
        poll_sections: validSections.map((section) => ({
          name: section.name.trim(),
          color: section.color,
          items: section.items
            .filter((item) => item.trim())
            .map((item) => ({
              text: item.trim(),
              votes: 0,
              user_ids: [],
            })),
        })),
        poll_type: pollType,
        settings: pollSettings,
        created_at: new Date().toISOString(),
        expires_at: new Date(
          Date.now() + pollSettings.duration * 60 * 60 * 1000
        ).toISOString(),
        total_votes: 0,
        total_voters: 0,
        is_active: true,
        is_expired: false,
      },
    };

    notifSend(details);
    notificationList();

    // Navigate back or show success message
    navigation.goBack();
  };

  function HandleOk() {
    setAuth((value) => (value = false));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingBottom: Dimensions.get("window").height * 0.03,
        justifyContent: "flex-end",
        gap: 20,
      }}
    >
      <View>
        <ScrollView>
          {showInfor && (
            <View
              style={{
                gap: 15,
                padding: 5,
              }}
            >
              {/* Poll Title Input */}
              <View style={{ paddingHorizontal: 5 }}>
                <Text
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 8,
                  }}
                >
                  Poll Title
                </Text>
                <InputPost
                  postmessage={pollTitle}
                  setPostMessage={setPollTitle}
                  placeholder="Enter poll title (required)"
                  textdescription={true}
                  height={60}
                  backgroundColor={
                    isLight ? LGlobals.background : DGlobals.background
                  }
                />
              </View>

              {/* Poll Description Input */}
              <View style={{ paddingHorizontal: 5 }}>
                <Text
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 8,
                  }}
                >
                  Poll Description
                </Text>
                <InputPost
                  postmessage={pollDescription}
                  setPostMessage={setPollDescription}
                  placeholder="Enter poll description (optional)"
                  textdescription={true}
                  height={60}
                  maxHeight={120}
                  backgroundColor={
                    isLight ? LGlobals.background : DGlobals.background
                  }
                />
              </View>

              {/* Poll Question Input */}
              <View style={{ paddingHorizontal: 5 }}>
                <Text
                  style={{
                    color: isLight ? LGlobals.text : DGlobals.text,
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 8,
                  }}
                >
                  Poll Question
                </Text>
                <InputPost
                  postmessage={pollQuestion}
                  setPostMessage={setPollQuestion}
                  placeholder="What would you like to ask?"
                  textdescription={true}
                  height={60}
                  backgroundColor={
                    isLight ? LGlobals.background : DGlobals.background
                  }
                />
              </View>

              {/* Poll Settings Panel */}
              <View style={{ paddingHorizontal: 5 }}>
                <TouchableOpacity
                  onPress={() => setShowSettings(!showSettings)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    // borderWidth: 1,
                    borderRadius: 15,
                    // backgroundColor: isLight ? "#f5f5f5" : "#2d3748",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Advanced Settings
                  </Text>
                  <FontAwesomeIcon
                    icon={showSettings ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={isLight ? LGlobals.text : DGlobals.text}
                  />
                </TouchableOpacity>

                {showSettings && (
                  <View style={{ gap: 15, marginBottom: 15 }}>
                    {/* Poll Sections */}
                    <View style={{ paddingHorizontal: 5 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: isLight ? LGlobals.text : DGlobals.text,
                            fontSize: 16,
                            fontWeight: "600",
                          }}
                        >
                          Poll Sections ({pollSections.length}/5) - Total Items:{" "}
                          {getTotalItems()}
                        </Text>
                        <TouchableOpacity
                          onPress={addSection}
                          style={{
                            padding: 8,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            borderColor: isLight
                              ? LGlobals.greyText
                              : DGlobals.greyText,
                          }}
                        >
                          <FontAwesomeIcon
                            icon="plus"
                            size={16}
                            color={
                              isLight ? LGlobals.bluetext : DGlobals.bluetext
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      {pollSections.map((section, sectionIndex) => (
                        <View key={section.id} style={{ marginBottom: 20 }}>
                          {/* Section Header */}
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 10,
                            }}
                          >
                            <View
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                backgroundColor: section.color,
                                marginRight: 8,
                              }}
                            />
                            <View style={{ flex: 1 }}>
                              <InputPost
                                postmessage={section.name}
                                setPostMessage={(text) =>
                                  updateSectionName(section.id, text)
                                }
                                onSend={() => {}}
                                height={35}
                                textdescription={true}
                                inputMode="text"
                                onPressIn={() => {}}
                                moreOptions={() => {}}
                                borderWidth={0}
                                borderWidthB={true}
                                minHeight={35}
                                borderRadius={15}
                                backgroundColor={
                                  isLight
                                    ? LGlobals.background
                                    : DGlobals.background
                                }
                                maxHeight={35}
                                onSubmitEditing={() => {}}
                              />
                            </View>
                            {pollSections.length > 1 && (
                              <TouchableOpacity
                                onPress={() => removeSection(section.id)}
                                style={{
                                  padding: 8,
                                  marginLeft: 8,
                                  borderRadius: 15,
                                  // backgroundColor: "#ff4444",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon="trash"
                                  size={14}
                                  color={
                                    isLight ? LGlobals.icon : DGlobals.icon
                                  }
                                />
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* Section Items */}
                          {section.items.map((item, itemIndex) => (
                            <View
                              key={itemIndex}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 8,
                                marginLeft: 24,
                              }}
                            >
                              <Text
                                style={{
                                  color: isLight
                                    ? LGlobals.lighttext
                                    : DGlobals.lighttext,
                                  fontSize: 12,
                                  marginRight: 8,
                                  minWidth: 20,
                                }}
                              >
                                {itemIndex + 1}.
                              </Text>
                              <View style={{ flex: 1 }}>
                                <InputPost
                                  postmessage={item}
                                  setPostMessage={(text) =>
                                    updateItemInSection(
                                      section.id,
                                      itemIndex,
                                      text
                                    )
                                  }
                                  onSend={() => {}}
                                  height={35}
                                  textdescription={true}
                                  inputMode="text"
                                  onPressIn={() => {}}
                                  moreOptions={() => {}}
                                  borderWidth={0}
                                  borderWidthB={true}
                                  minHeight={35}
                                  borderRadius={15}
                                  backgroundColor={
                                    isLight
                                      ? LGlobals.background
                                      : DGlobals.background
                                  }
                                  maxHeight={35}
                                  onSubmitEditing={() => {}}
                                />
                              </View>
                              {section.items.length > 1 && (
                                <TouchableOpacity
                                  onPress={() =>
                                    removeItemFromSection(section.id, itemIndex)
                                  }
                                  style={{
                                    padding: 6,
                                    marginLeft: 8,
                                    borderRadius: 12,
                                    borderColor: isLight
                                      ? LGlobals.borderColor
                                      : DGlobals.borderColor,
                                    borderWidth: 0.5,
                                    // backgroundColor: "#ff4444",
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon="minus"
                                    size={12}
                                    color="#ff4444"
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                          ))}

                          {/* Add Item Button */}
                          <TouchableOpacity
                            onPress={() => addItemToSection(section.id)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 8,
                              marginLeft: 24,
                              marginTop: 5,
                              borderRadius: 15,
                              backgroundColor: isLight ? "#f0f0f0" : "#2d3748",
                            }}
                          >
                            <FontAwesomeIcon
                              icon="plus"
                              size={12}
                              color={isLight ? LGlobals.text : DGlobals.text}
                            />
                            <Text
                              style={{
                                color: isLight ? LGlobals.text : DGlobals.text,
                                fontSize: 12,
                                marginLeft: 5,
                              }}
                            >
                              Add Item ({section.items.length}/8)
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>

                    {/* Poll Type Selection */}
                    <View style={{ paddingHorizontal: 5 }}>
                      <Text
                        style={{
                          color: isLight ? LGlobals.text : DGlobals.text,
                          fontSize: 16,
                          fontWeight: "600",
                          marginBottom: 8,
                        }}
                      >
                        Poll Type
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <TouchableOpacity
                        onPress={() => setPollType("single")}
                        style={{
                          // flex: 1,
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          borderRadius: 15,

                          borderWidth: 1,
                          borderColor:
                            pollType === "single"
                              ? isLight
                                ? "#2196f3"
                                : "#63b3ed"
                              : isLight
                              ? "#ddd"
                              : "#4a5568",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              pollType === "single"
                                ? isLight
                                  ? "#2196f3"
                                  : "#63b3ed"
                                : isLight
                                ? LGlobals.text
                                : DGlobals.text,
                            fontWeight:
                              pollType === "single" ? "800" : "normal",
                          }}
                        >
                          Single Choice
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setPollType("multiple")}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          borderRadius: 15,

                          borderWidth: 1,
                          borderColor:
                            pollType === "multiple"
                              ? isLight
                                ? "#2196f3"
                                : "#63b3ed"
                              : isLight
                              ? "#ddd"
                              : "#4a5568",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              pollType === "multiple"
                                ? isLight
                                  ? "#2196f3"
                                  : "#63b3ed"
                                : isLight
                                ? LGlobals.text
                                : DGlobals.text,
                            fontWeight:
                              pollType === "multiple" ? "800" : "normal",
                          }}
                        >
                          Multiple Choice
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Duration Setting */}
                    <View>
                      <Text
                        style={{
                          color: isLight ? LGlobals.text : DGlobals.text,
                          fontSize: 14,
                          fontWeight: "600",
                          marginBottom: 8,
                        }}
                      >
                        Poll Duration (hours)
                      </Text>

                      <View style={{ flexDirection: "row", gap: 10 }}>
                        {[6, 12, 24, 48, 72, 168].map((duration) => (
                          <TouchableOpacity
                            key={duration}
                            onPress={() =>
                              setPollSettings({ ...pollSettings, duration })
                            }
                            style={{
                              paddingHorizontal: 8,
                              paddingVertical: 3,
                              borderRadius: 15,
                              borderWidth:
                                pollSettings.duration === duration ? 2 : 1,
                              borderColor:
                                pollSettings.duration === duration
                                  ? isLight
                                    ? "#2196f3"
                                    : "#63b3ed"
                                  : isLight
                                  ? LGlobals.borderColor
                                  : DGlobals.borderColor,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  pollSettings.duration === duration
                                    ? isLight
                                      ? "#2196f3"
                                      : "#63b3ed"
                                    : isLight
                                    ? LGlobals.text
                                    : DGlobals.text,
                                fontSize: 12,
                                fontWeight: "600",
                              }}
                            >
                              {duration}h
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Poll Type Settings */}
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          setPollSettings({
                            ...pollSettings,
                            allowMultipleVotes:
                              !pollSettings.allowMultipleVotes,
                          })
                        }
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 15,

                          borderWidth: 1,
                          borderColor: pollSettings.allowMultipleVotes
                            ? isLight
                              ? "#2196f3"
                              : "#63b3ed"
                            : isLight
                            ? "#ddd"
                            : "#4a5568",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: pollSettings.allowMultipleVotes
                              ? isLight
                                ? "#2196f3"
                                : "#63b3ed"
                              : isLight
                              ? LGlobals.text
                              : DGlobals.text,
                            fontWeight: "600",
                            fontSize: 12,
                          }}
                        >
                          Multiple Votes
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          setPollSettings({
                            ...pollSettings,
                            anonymousVoting: !pollSettings.anonymousVoting,
                          })
                        }
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 15,

                          borderWidth: 1,
                          borderColor: pollSettings.anonymousVoting
                            ? isLight
                              ? "#2196f3"
                              : "#63b3ed"
                            : isLight
                            ? "#ddd"
                            : "#4a5568",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: pollSettings.anonymousVoting
                              ? isLight
                                ? "#2196f3"
                                : "#63b3ed"
                              : isLight
                              ? LGlobals.text
                              : DGlobals.text,
                            fontWeight: "600",
                            fontSize: 12,
                          }}
                        >
                          Anonymous
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={{}}>
        <ServicesData
          SelectedServices={selectedServices}
          handleSelectService={handleSelectService}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 25,
            paddingHorizontal: "5%",
          }}
        >
          <TouchableOpacity
            onPress={() => CreateNotifPost.pickImage(setImage, setImage1)}
          >
            <FontAwesomeIcon
              icon="image"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity>

          <SendIcon onPress={handleCreatePoll} disabled={false} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({});
