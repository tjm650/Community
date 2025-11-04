import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import FeedSkeleton from "@/components/FeedSkeleton";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NotifPostInboxHeader from "../../../TopViews/NotifsHeaders/NotifPostInboxHeader";
import DirectoryDetails from "../DirectoryDetails";
import NotifPostRenderComment from "../NotifPost/NotifPostComment/NotifPostRenderComment";
import NotifPostInteractions from "../NotifPostInteractions";

const PollInbox = ({ route }) => {
  const data = route.params.data;
  // // const duration = props.route.params.duration;
  // const image = props.route.params.image;
  // const description = props.route.params.time;
  // const profileimg = props.route.params.profileimg;
  // const name = props.route.params.name;
  // const directoryStatus = props.route.params.directoryStatus;
  // const sender = props.route.params.sender;
  // const UpdateType = props.route.params.UpdateType;
  // const verified = props.route.params.verified;
  // const time = props.route.params.time;

  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const pollHeight = Dimensions.get("window").height * 0.15;

  const user = useGlobal((state) => state.user);
  const notifPollVote = useGlobal((state) => state.notifPollVote);

  const fetchNotifPostComments = useGlobal(
    (state) => state.fetchNotifPostComments
  );
  const notifPostCommentsList = useGlobal(
    (state) => state.notifPostCommentsList
  );
  const notifPostsCommentsNext = useGlobal(
    (state) => state.notifPostsCommentsNext
  );

  const userId = user.id;
  const postId = data.id;

  // Parse poll data from extra_data
  const pollSections = data.extra_data?.poll_sections || [];
  const pollType = data.extra_data?.poll_type || "single";
  const pollTitle = data.extra_data?.title || "Poll";

  // Flatten all options for easier processing
  const allPollOptions = useMemo(() => {
    return pollSections.flatMap(section =>
      section.items.map(item => ({
        ...item,
        sectionName: section.name,
        sectionColor: section.color,
        globalIndex: `${section.name}-${item.text}`
      }))
    );
  }, [pollSections]);

  const totalVotes = allPollOptions.reduce((sum, option) => sum + (option.votes || 0), 0);

  // Generate random colors for sections if not provided
  const sectionColors = useMemo(() => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
      "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
    ];

    return pollSections.reduce((acc, section, index) => {
      acc[section.name] = section.color || colors[index % colors.length];
      return acc;
    }, {});
  }, [pollSections]);

  const handleVote = (optionIndex) => {
    if (hasVoted && pollType === "single") return;

    const userId = user.id;
    const postId = data.id;

    if (pollType === "single") {
      setSelectedOptions([optionIndex]);
      setHasVoted(true);
    } else {
      setSelectedOptions(prev => {
        const newSelection = prev.includes(optionIndex)
          ? prev.filter(i => i !== optionIndex)
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
    const maxVotes = Math.max(...allPollOptions.map(opt => opt.votes || 0));
    return maxVotes > 0 ? pollHeight : pollHeight*0.4; // Landscape image height equivalent
  };

  const renderPollChart = () => {
    const maxHeight = getMaxBarHeight();
    const maxVotes = Math.max(...allPollOptions.map(opt => opt.votes || 0));

    return (
      <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ marginVertical: 10 }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end", height: maxHeight + 60 }}>
            {allPollOptions.map((option, index) => {
              const isSelected = selectedOptions.includes(index);
              const percentage = getVotePercentage(option.votes || 0);
              const barHeight = maxVotes > 0 ? ((option.votes || 0) / maxVotes) * maxHeight : 50;
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
                    borderTopLeftRadius:30,
                    borderTopRightRadius:30
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
                        color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
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
                        ? (isLight ? "#2196f3" : "#63b3ed")
                        : sectionColor,
                      borderRadius: 4,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: 5,
                    }}
                  >
                    <Ionicons
                      name="person"
                      size={16}
                      color="white"
                    />
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
    const displayItems = showAllItems ? allPollOptions : allPollOptions.slice(0, 5);

    return (
      <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
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
              const globalIndex = allPollOptions.findIndex(opt =>
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
                      ? (isLight ? "#e3f2fd" : "#1a365d")
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
              {showAllItems ? "Show Less" : `Show ${allPollOptions.length - 5} More`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const NotifPostCommentScreen = (data) => {
    navigation.navigate("NotifPostCommentScreen", { data: data });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <NotifPostInboxHeader />,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
      }}
    >
      <FlatList
        data={data.comments && notifPostCommentsList}
        ListEmptyComponent={
          data.comments && notifPostCommentsList === null ? (
            <FeedSkeleton rows={4} compact />
          ) : null
        }
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View
          style={{
            paddingHorizontal:"3%"
          }}
          >
           <DirectoryDetails
            profileimg={
              data.service
                ? data.service.profile_image
                : data.sender.profile_image
            }
            name={data.service ? data.service.username : data.sender.username}
            directoryStatus={
              data.service
                ? data.service.directory_status1
                : data.sender.directory_status1
            }
            item={data}
            time={utils.CalendarPostTime(data.created)}
            verified={data.service ? data.service.verified : data.sender.verified}
          />

            {/* Poll Image */}
            {data.image && (
              <View style={{ position: "relative" }}>
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    resizeMode: "cover",
                  }}
                  source={utils.GetImage(data.image)}
                />
              </View>
            )}

          
            {/* Poll Chart */}
            {renderPollChart()}

            {/* Poll Items List */}
            {renderPollItemsList()}

            {/* Poll Stats */}
            {hasVoted && (
              <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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

              {/* Poll Title */}
            <View style={{ paddingHorizontal: "2%", paddingTop: "4%" }}>
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
            </View>

            {/* Poll Question */}
            <View style={{ paddingHorizontal: "2%", paddingVertical: "2%" }}>
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  fontWeight: "600",
                  marginBottom: 15,
                }}
              >
                {data.description}
              </Text>
            </View>


            {/* Poll Interactions */}
             <NotifPostInteractions
                     NotifPostCommentScreen={NotifPostCommentScreen}
                     item={data}
                   />

            {data.comments && data.comments_count === 0 ? (
              <View
                style={{
                  borderBottomWidth: 0,
                  marginHorizontal: "3%",
                  paddingTop: "5%",

                  borderRadius: 100,
                  borderBottomColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: isLight ? LGlobals.icon : DGlobals.icon,
                    fontWeight: "700",
                  }}
                >
                  No comments for this poll
                </Text>

                <FontAwesomeIcon
                  icon="fa-solid fa-comment-slash"
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </View>
            ) : data.comments && data.comments_count >= 1 ? (
              <Text
                style={{
                  color: isLight ? LGlobals.icon : DGlobals.icon,
                  alignSelf: "center",
                  fontWeight: "700",
                  borderTopWidth: 0.3,
                  textAlign: "center",
                  width: "100%",
                  paddingTop: "2%",
                  marginTop: "2%",
                  marginHorizontal: "3%",
                  borderRadius: 100,
                  borderTopColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                }}
              >
                Comments{"   "}
                <Text
                  style={{ fontSize: 16, fontWeight: 600, color: "#0D99FF" }}
                >
                  ⁘
                </Text>
              </Text>
            ) : (
              <View
                style={{
                  borderBottomWidth: 0,
                  marginHorizontal: "3%",
                  paddingTop: "5%",

                  borderRadius: 100,
                  borderBottomColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: isLight ? LGlobals.icon : DGlobals.icon,
                    fontWeight: "700",
                  }}
                >
                  No comments for this poll
                </Text>

                <FontAwesomeIcon
                  icon="fa-solid fa-comment-slash"
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </View>
            )}
          </View>
        }
        ListFooterComponent={
          data.comments && data.comments_count === 0 ? (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "5%",
                paddingTop: "2%",
              }}
            >
              •
            </Text>
          ) : data.comments && notifPostCommentsList.length === 0 ? (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "10%",
              }}
            >
              •
            </Text>
          ) : data.comments && loading ? (
            <ActivityIndicator
              size={"small"}
              color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              style={{
                paddingVertical: "5%",
              }}
            />
          ) : (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "5%",
                paddingTop: "2%",
              }}
            >
              •
            </Text>
          )
        }

        renderItem={({ item }) => (
          <NotifPostRenderComment
            isPostInbox={true}
            item={item}
            NotifPostCommentScreen={NotifPostCommentScreen}
          />
        )}
        style={{
          paddingVertical: "3%",
          flex: 1,
        }}
        onEndReached={() => {
          if (notifPostsCommentsNext) {
            fetchNotifPostComments(postId, notifPostsCommentsNext);
            setloading(true);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default PollInbox;

const styles = StyleSheet.create({});