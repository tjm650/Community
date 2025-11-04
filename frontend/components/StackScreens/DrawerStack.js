import React from "react";
import { StyleSheet } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

//////////////////// Local Imports //////////////////
import useGlobal from "@/assets/common/core/useGlobal";
import Feedback from "@/screens/ApplicationServices/Feedback/Feedback";
import AppNotifInbox from "@/screens/ApplicationServices/Notifications/OfficialAppNotif/AppNotifInbox";
import OfficialAppNotif from "@/screens/ApplicationServices/Notifications/OfficialAppNotif/OfficialAppNotif";
import ServiceProfileScreen from "@/screens/AUser/ServiceProfileScreen";
import UserProfile from "@/screens/AUser/UserProfile";
import UserProfileScreen from "@/screens/AUser/UserProfileScreen";
import CalendarResourses from "@/screens/CalendarScreens/CalendarResources";
import CommunityInbox from "@/screens/Community/Groups/CommunityInbox";
import ExploreCommunities from "@/screens/Community/Groups/ExploreCommunities";
import ConnectsScreen from "@/screens/ConnectScreens/ConnectsScreen";
import SearchConnects from "@/screens/ConnectScreens/SearchConnects";
import CreateBlog from "@/screens/CreatePost/CreateBlogPost/CreateBlog";
import CreateEvent from "@/screens/CreatePost/CreateEvent/CreateEvent";
import CreateLiveForum from "@/screens/CreatePost/CreateLiveForum/CreateLiveForum";
import CreatePoll from "@/screens/CreatePost/CreateService/CreatePoll";
import CreateServiceNotif from "@/screens/CreatePost/CreateService/CreateServiceNotif";
import CreatePost from "@/screens/CreatePost/CreateUpdatePost/CreatePost";
import Create from "@/screens/CreatePost/GetStarted/Create";
import CreateBloger from "@/screens/CreatePost/GetStarted/CreateBloger/CreateBloger";
import CreateCommunityPages from "@/screens/CreatePost/GetStarted/CreateCommunityPage/CreateCommunityPages";
import CreateOrganizationPages from "@/screens/CreatePost/GetStarted/CreateOrganizationPage/CreateOrganizationPages";
import CreateServicePages from "@/screens/CreatePost/GetStarted/CreateServicePage/CreateServicePages";
import MesssageInbox from "@/screens/EmailScreens/MessageInbox";
import ExchangeDisclaimer from "@/screens/Finance/ExchangeDisclaimer";
import ExchangeRates from "@/screens/Finance/ExchangeRates";
import ImageScreen from "@/screens/GlobalScreens/ImageScreen";
import ProfileImagePreview from "@/screens/GlobalScreens/ProfileImagePreview";
import ProfileScreen from "@/screens/GlobalScreens/ProfileScreen/ProfileScreen";
import ProfileScreen1 from "@/screens/GlobalScreens/ProfileScreen/ProfileScreen1";
import DailyBlog from "@/screens/HomeScreen/Home/DailyBlog/DailyBlog";
import PostCommentScreen from "@/screens/HomeScreen/Home/Post/PostComments/PostCommentScreen";
import PostInbox from "@/screens/HomeScreen/Home/Post/PostInbox";
import AccommodationAgentDashboard from "@/screens/Monetization/Accommodation/AccommodationAgentDashboard";
import CreateAccommodationPost from "@/screens/Monetization/Accommodation/Create/CreateAccommodationPost";
import LandlordLodge from "@/screens/Monetization/Accommodation/LandlordLodge";
import DataSaverHub from "@/screens/Monetization/CampusMap/DataSaverHub";
import CommunityAds from "@/screens/Monetization/CommunityAds/CommunityAds";
import LibraryMarketing from "@/screens/Monetization/Library/LibraryMarketing";
import BrowseFoundItems from "@/screens/Monetization/LostFound/BrowseItems/BrowseFoundItems";
import BrowseLostItems from "@/screens/Monetization/LostFound/BrowseItems/BrowseLostItems";
import ItemDetails from "@/screens/Monetization/LostFound/Details/ItemDetails";
import LostFound from "@/screens/Monetization/LostFound/LostFound";
import ReportFoundItem from "@/screens/Monetization/LostFound/ReportFound/ReportFoundItem";
import ReportLostItem from "@/screens/Monetization/LostFound/ReportLost/ReportLostItem";
import SearchLostFound from "@/screens/Monetization/LostFound/Search/SearchLostFound";
import SubscriptionPlans from "@/screens/Monetization/LostFound/Subscription/SubscriptionPlans";
import Marketing from "@/screens/Monetization/Marketing/Marketing";
import OnlineTransactions from "@/screens/Monetization/OnlineTransactions/OnlineTransactions";
import ServiceGuide from "@/screens/Monetization/ServiceGuide/ServiceGuide";
import ChannelPage from "@/screens/Networking/ChannelPage";
import InternshipsScreen from "@/screens/Networking/Internships/InternshipsScreen";
import NetworkHomeScreen from "@/screens/Networking/NetworkHomeScreen";
import NetworkPage from "@/screens/Networking/NetworkPage/NetworkPage";
import NotifPostCommentScreen from "@/screens/NotificationsScreens/EventScreen/NotifPost/NotifPostComment/NotifPostCommentScreen";
import NotifPostInbox from "@/screens/NotificationsScreens/EventScreen/NotifPost/NotifPostInbox";
import PollInbox from "@/screens/NotificationsScreens/EventScreen/NotifLive/PollInbox";
import LiveForumPage from "@/screens/NotificationsScreens/LiveForumScreen/LiveForumPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Drawer from "../navigation/Drawer";

import QuercusHome from "@/screens/QuercusAI/QuercusHome";

// import { Stack } from 'expo-router';

const DrawerStack = () => {
  const Stack = createNativeStackNavigator();
  const insets = useSafeAreaInsets();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          height: "20%", // Set header height here
          paddingTop: insets.top,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
        }}
      />



      <Stack.Screen
        name="QuercusHome"
        component={QuercusHome}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "fade_from_bottom",
          animationTypeForReplace: "push",
        }}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "pop",
        }}
      />

      <Stack.Screen
        name="OfficialAppNotif"
        component={OfficialAppNotif}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "pop",
        }}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ServiceProfileScreen"
        component={ServiceProfileScreen}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="AppNotifInbox"
        component={AppNotifInbox}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="CreateCommunityPages"
        component={CreateCommunityPages}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="CreateBloger"
        component={CreateBloger}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="CreateServicePages"
        component={CreateServicePages}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="CreateOrganizationPages"
        component={CreateOrganizationPages}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ProfileScreen1"
        component={ProfileScreen1}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ConnectsScreen"
        component={ConnectsScreen}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SearchConnects"
        component={SearchConnects}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="MesssageInbox"
        component={MesssageInbox}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: "black", //DGlobals.StatusBar.statusBarColor,
          statusBarStyle: DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="PostInbox"
        component={PostInbox}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="PostCommentScreen"
        component={PostCommentScreen}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? "rgba(180, 231, 237, 0.49)"
            : "rgba(2, 28, 32, 0.71)",
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "fade_from_bottom",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="NotifPostCommentScreen"
        component={NotifPostCommentScreen}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? "rgba(180, 231, 237, 0.49)"
            : "rgba(2, 28, 32, 0.71)",
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "fade_from_bottom",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="CommunityInbox"
        component={CommunityInbox}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isLight
              ? LGlobals.background
              : DGlobals.background,
            height: 5, // Set header height here
          },

          statusBarHidden: false,
          statusBarBackgroundColor: isLight
            ? LGlobals.StatusBar.statusBarColor
            : DGlobals.StatusBar.statusBarColor,
          statusBarStyle: isLight
            ? LGlobals.StatusBar.statusBarStyle
            : DGlobals.StatusBar.statusBarStyle,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          contentStyle: { zIndex: 1 },
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      />

      <>
        <Stack.Screen
          name="ProfileImagePreview"
          component={ProfileImagePreview}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            headerStyle: { backgroundColor: "black" },
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
      </>

      <>
        <Stack.Screen
          name="CreateBlog"
          component={CreateBlog}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="DailyBlog"
          component={DailyBlog}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CalendarResourses"
          component={CalendarResourses}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_left",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="LiveForumPage"
          component={LiveForumPage}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CreatePoll"
          component={CreatePoll}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="NotifPostInbox"
          component={NotifPostInbox}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="PollInbox"
          component={PollInbox}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        <Stack.Screen
          name="ChannelPage"
          component={ChannelPage}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        <Stack.Screen
          name="NetworkPage"
          component={NetworkPage}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="InternshipsScreen"
          component={InternshipsScreen}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="NetworkHomeScreen"
          component={NetworkHomeScreen}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CreateLiveForum"
          component={CreateLiveForum}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="ExchangeRates"
          component={ExchangeRates}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        <Stack.Screen
          name="ExchangeDisclaimer"
          component={ExchangeDisclaimer}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CreateServiceNotif"
          component={CreateServiceNotif}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="AccommodationAgentDashboard"
          component={AccommodationAgentDashboard}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateAccommodationPost"
          component={CreateAccommodationPost}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ExploreCommunities"
          component={ExploreCommunities}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{
            headerShown: true,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        <Stack.Screen
          name="OnlineTransactions"
          component={OnlineTransactions}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="LandlordLodge"
          component={LandlordLodge}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="GeneralMarketing"
          component={Marketing}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="LibraryMarketing"
          component={LibraryMarketing}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="DataSaverHub"
          component={DataSaverHub}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="ServiceGuide"
          component={ServiceGuide}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="CommunityAds"
          component={CommunityAds}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />

        {/* Lost & Found Screens */}
        <Stack.Screen
          name="LostFound"
          component={LostFound}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="ReportLostItem"
          component={ReportLostItem}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="ReportFoundItem"
          component={ReportFoundItem}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="BrowseLostItems"
          component={BrowseLostItems}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="BrowseFoundItems"
          component={BrowseFoundItems}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="SubscriptionPlans"
          component={SubscriptionPlans}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="SearchLostFound"
          component={SearchLostFound}
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: isLight
              ? LGlobals.StatusBar.statusBarColor
              : DGlobals.StatusBar.statusBarColor,
            statusBarStyle: isLight
              ? LGlobals.StatusBar.statusBarStyle
              : DGlobals.StatusBar.statusBarStyle,
            statusBarTranslucent: true,
            statusBarAnimation: "slide",
            contentStyle: { zIndex: 1 },
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
        />
      </>
    </Stack.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({});
