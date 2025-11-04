import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import DirectoryDetails from "../DirectoryDetails";
import { useNavigation } from "@react-navigation/native";
import NotifPostInteractions from "../NotifPostInteractions";

//======================================================================================

function PollLiveView({
  image,
  description,
  time,
  profileimg,
  name,
  directoryStatus,
  extra_data,
  item,
  sender,
  isInbox = false,
}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  const [isOpenDescription, setIsOpenDescrition] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const pollHeight = Dimensions.get("window").height * 0.15;

  const user = useGlobal((state) => state.user);
  const notifPollVote = useGlobal((state) => state.notifPollVote);
  const notifPostInteraction = useGlobal((state) => state.notifPostInteraction);
  const notifCommentInteraction = useGlobal(
    (state) => state.notifCommentInteraction
  );

  const fetchNotifPostComments = useGlobal(
    (state) => state.fetchNotifPostComments
  );

  const userId = user.id;
  const postId = item.id;

  const OpenNotifPostInbox = (data) => {
    navigation.navigate("PollInbox", { data: data });
    fetchNotifPostComments(postId);

    if (item.comments) {
      notifPostInteraction(postId, userId, "interaction");
    } else {
      notifCommentInteraction(postId, userId, "interaction");
    }
  };

  const NotifPostCommentScreen = (data) => {
    navigation.navigate("NotifPostCommentScreen", { data: data });
  };
  // Parse poll data from extra_data
  const pollSections = extra_data?.poll_sections || [];
  const pollType = extra_data?.poll_type || "single";
  const pollTitle = extra_data?.title || "Poll";

  // Flatten all options for easier processing
  const allPollOptions = useMemo(() => {
    return pollSections.flatMap((section) =>
      section.items.map((item) => ({
        ...item,
        sectionName: section.name,
        sectionColor: section.color,
        globalIndex: `${section.name}-${item.text}`,
      }))
    );
  }, [pollSections]);

  const totalVotes = allPollOptions.reduce(
    (sum, option) => sum + (option.votes || 0),
    0
  );

  // Generate random colors for sections if not provided
  const sectionColors = useMemo(() => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];

    return pollSections.reduce((acc, section, index) => {
      acc[section.name] = section.color || colors[index % colors.length];
      return acc;
    }, {});
  }, [pollSections]);

  const handleVote = (optionIndex) => {
    if (hasVoted && pollType === "single") return;

    const userId = user.id;
    const postId = item.id;

    if (pollType === "single") {
      setSelectedOptions([optionIndex]);
      setHasVoted(true);
    } else {
      setSelectedOptions((prev) => {
        const newSelection = prev.includes(optionIndex)
          ? prev.filter((i) => i !== optionIndex)
          : [...prev, optionIndex];
        setHasVoted(newSelection.length > 0);
        return newSelection;
      });
    }

    // Send vote to backend
    notifPollVote(postId, optionIndex);
  };

  const getVotePercentage = (optionVotes) => {
    return totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  };

  const getMaxBarHeight = () => {
    const maxVotes = Math.max(...allPollOptions.map((opt) => opt.votes || 0));
    return maxVotes > 0 ? pollHeight : pollHeight * 0.4; // Landscape image height equivalent
  };

  const renderPollChart = () => {
    const maxHeight = getMaxBarHeight();
    const maxVotes = Math.max(...allPollOptions.map((opt) => opt.votes || 0));

    return (
      <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ marginVertical: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              height: maxHeight + 60,
            }}
          >
            {allPollOptions.map((option, index) => {
              const isSelected = selectedOptions.includes(index);
              const percentage = getVotePercentage(option.votes || 0);
              const barHeight =
                maxVotes > 0
                  ? ((option.votes || 0) / maxVotes) * maxHeight
                  : 50;
              const sectionColor = sectionColors[option.sectionName];

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleVote(index)}
                  disabled={hasVoted && pollType === "single" && !isSelected}
                  style={{
                    alignItems: "center",
                    marginHorizontal: 4,
                    minWidth: 30,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                  }}
                >
                  {/* Vote count and percentage */}
                  <View style={{ alignItems: "center", marginBottom: 8 }}>
                    <Text
                      style={{
                        color: isLight ? LGlobals.text : DGlobals.text,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {option.votes || 0}
                    </Text>
                    <Text
                      style={{
                        color: isLight
                          ? LGlobals.lighttext
                          : DGlobals.lighttext,
                        fontSize: 10,
                      }}
                    >
                      {percentage}%
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 30,
                      height: barHeight,
                      backgroundColor: isSelected
                        ? isLight
                          ? "#2196f3"
                          : "#63b3ed"
                        : sectionColor,
                      borderRadius: 4,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: 5,
                    }}
                  >
                    <Ionicons name="person" size={16} color="white" />
                  </View>

                  {/* Option text */}
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontSize: 10,
                      textAlign: "center",
                      marginTop: 4,
                      maxWidth: 60,
                    }}
                    numberOfLines={2}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderPollItemsList = () => {
    const displayItems = showAllItems
      ? allPollOptions
      : allPollOptions.slice(0, 5);

    return (
      <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
        {/* <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Poll Options
        </Text> */}

        {pollSections.map((section) => (
          <View key={section.name} style={{ marginBottom: 15 }}>
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                fontSize: 12,
                fontWeight: "600",
                marginBottom: 5,
                textTransform: "uppercase",
              }}
            >
              {section.name}
            </Text>

            {section.items.map((item, itemIndex) => {
              const globalIndex = allPollOptions.findIndex(
                (opt) =>
                  opt.sectionName === section.name && opt.text === item.text
              );
              const isSelected = selectedOptions.includes(globalIndex);
              const sectionColor = sectionColors[section.name];

              return (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => handleVote(globalIndex)}
                  disabled={hasVoted && pollType === "single" && !isSelected}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    marginVertical: 2,
                    borderRadius: 6,
                    backgroundColor: isSelected
                      ? isLight
                        ? "#e3f2fd"
                        : "#1a365d"
                      : "transparent",
                  }}
                >
                  {/* Color legend dot */}
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: sectionColor,
                      marginRight: 10,
                    }}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: isLight ? LGlobals.text : DGlobals.text,
                        fontSize: 14,
                        fontWeight: isSelected ? "600" : "400",
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>

                  {/* Voter count */}
                  <Text
                    style={{
                      color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                      fontSize: 12,
                      fontWeight: "600",
                      marginRight: 8,
                    }}
                  >
                    {item.votes || 0}
                  </Text>

                  {/* Vote indicator */}
                  {isSelected && (
                    <FontAwesomeIcon
                      icon="check-circle"
                      size={16}
                      color={isLight ? "#2196f3" : "#63b3ed"}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {allPollOptions.length > 5 && (
          <TouchableOpacity
            onPress={() => setShowAllItems(!showAllItems)}
            style={{
              alignItems: "center",
              paddingVertical: 8,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {showAllItems
                ? "Show Less"
                : `Show ${allPollOptions.length - 5} More`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        marginBottom: 5,
        position: "relative",
        marginHorizontal: "1%",
        paddingBottom: 7,
        borderBottomWidth: 0.3,
        borderColor: isLight
          ? LNotifs.events.notifPostView.borderColor
          : DNotifs.events.notifPostView.borderColor,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
      }}
    >
      <DirectoryDetails
        time={utils.CalendarPostTime(item.created)}
        name={item.service ? item.service.username : item.sender.username}
        profileimg={
          item.service ? item.service.profile_image : item.sender.profile_image
        }
        directoryStatus={
          item.service
            ? item.service.directory_status1
            : item.sender.directory_status1
        }
        item={item}
        verified={item.service ? item.service.verified : item.sender.verified}
      />

      <View
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingBottom: "2%",
          borderColor: isLight
            ? LNotifs.events.notifLiveView.borderColor
            : DNotifs.events.notifLiveView.borderColor,
          overflow: "hidden",
        }}
      >
        {/* Poll Image */}
        {item.image && (
          <View style={{ position: "relative" }}>
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
              }}
              source={utils.GetImage(item.image)}
            />

            {/* Poll Tag */}
            {/* <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#7dd87d",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Poll
              </Text>
            </View> */}
          </View>
        )}

        {/* Poll Chart */}
        {renderPollChart()}

        {/* Poll Title */}
        <TouchableOpacity
          style={{ paddingHorizontal: "4%", paddingTop: "2%" }}
          onPress={() => OpenNotifPostInbox(item)}
          activeOpacity={isInbox ? 1 : 0.6}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: isLight ? LGlobals.text : DGlobals.text,
              marginBottom: 5,
            }}
          >
            {pollTitle}
          </Text>
        </TouchableOpacity>

        {/* Poll Question */}
        {/* <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              // fontSize: 16,
              fontWeight: "600",
              marginBottom: 15,
            }}
          >
            {description}
          </Text>
        </View> */}

        {/* Poll Items List */}
        {renderPollItemsList()}

        {/* Poll Stats */}
        {hasVoted && (
          <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                  fontSize: 12,
                }}
              >
                Total votes: {totalVotes}
              </Text>
              <Text
                style={{
                  color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                  fontSize: 12,
                }}
              >
                {pollType === "single" ? "Single choice" : "Multiple choice"}
              </Text>
            </View>
          </View>
        )}

        {/* Description */}
        {/* <View
          style={{
            paddingHorizontal: "4%",
            paddingVertical: "2%",
          }}
        >
          <TouchableOpacity
            onPress={() => setIsOpenDescrition((value) => !value)}
            activeOpacity={0.6}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
                lineHeight: 20,
              }}
              numberOfLines={isOpenDescription ? 99 : 3}
            >
              {extra_data.description || "Vote in this poll"}
            </Text>
            {isOpenDescription && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-shield"
                  size={14}
                  color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                />
                <Text
                  style={{
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  {item.sender.username}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View> */}

        {/* Poll Interactions */}
        {/* <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {item.comments && (
              <TouchableOpacity
                onPress={() => {
                  // Navigate to PollInbox screen for comments
                  if (navigation) {
                    navigation.navigate("PollInbox", { data: item });
                  }
                }}
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 2,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <FontAwesomeIcon
                  icon="fa-regular fa-comments"
                  size={20}
                  color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => handleVote(0)} // Default vote action
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 2,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                flexDirection: "row",
                gap: 3,
              }}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-heart"
                size={14}
                color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 2,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                flexDirection: "row",
                gap: 3,
              }}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-share-from-square"
                size={14}
                color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 2,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                flexDirection: "row",
                gap: 3,
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-chart-simple"
                size={12}
                color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              />
            </TouchableOpacity>
          </View>
        </View> */}

        <NotifPostInteractions
          NotifPostCommentScreen={NotifPostCommentScreen}
          item={item}
        />
      </View>
    </View>
  );
}

export default PollLiveView;

const styles = StyleSheet.create({});
