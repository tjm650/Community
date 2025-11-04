import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import {
  FontAwesome5
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ShowInfor = ({ route }) => {
  const data = route.params.data;
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.7} >
      <View
        id="Department"
        style={Post.liveScreenPost.LessonsScreen.OnGoing.Department}
        activeOpacity={0.9}
      >
        <View
          id="TopView"
          style={Post.liveScreenPost.LessonsScreen.OnGoing.TopView}
        >
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.DptText}
          >
            {data.dptName}
          </Text>
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.DptCode}
          >
            {data.dptCode}
          </Text>
        </View>
        <View
          id="Lesson Details"
          style={Post.liveScreenPost.LessonsScreen.OnGoing.Lesson}
        >
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseText}
          >
            {data.lesson}
          </Text>
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseCode}
          >
            {data.lessonCode}
          </Text>
        </View>
        <View
          id="Lesson Content"
          style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseContent}
        >
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseContentText}
          >
            {data.lecturer}
          </Text>
          <Pressable
            id="Venue"
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseVenue}
          >
            <Text
              numberOfLines={1}
              style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseVenueText}
            >
              {data.venue}
            </Text>
          </Pressable>
        </View>

        <View
          id="Descriptions"
          style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseDescriptions}
        >
          <Text
            numberOfLines={3}
            style={
              Post.liveScreenPost.LessonsScreen.OnGoing.CourseDescriptionsText
            }
          >
            {data.description}
          </Text>
        </View>

        <View
          id="Lesson Date"
          style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseDate}
        >
          <Pressable
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseDateBtn}
          >
            <Text
              style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseDuration}
            >
              {data.period}
            </Text>
            <FontAwesome5
              name="chevron-circle-up"
              size={20}
              color={Colors.light.liveScreen.LessonsScreen.Ongoing.textgreen}
            />
            <Text
              style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseOnText}
            >
              {data.live}
            </Text>
          </Pressable>
          <Text
            numberOfLines={1}
            style={Post.liveScreenPost.LessonsScreen.OnGoing.CourseDateText}
          >
            {data.date}
          </Text>
          <Pressable>
            <Text numberOfLines={1}>
              created •{" "}
              <Text
                style={
                  Post.liveScreenPost.LessonsScreen.OnSet.CourseCreatedText
                }
              >
                {data.created}
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShowInfor;

const styles = StyleSheet.create({});
