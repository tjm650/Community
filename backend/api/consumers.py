import json
import base64
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.files.base import ContentFile
from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce
from django.core.files.temp import NamedTemporaryFile

from .serializers import UserSerializer
from .models import User

# Add the project directory to the system path
# sys.path.append(os.path.dirname(consumer))


from consumer_view.message_view import (
    receive_message_list,
    receive_message_sent,
    receive_message_type,
    receive_message_red,
)

from consumer_view.user_view import (
    receive_user_email,
    receive_user_profile,
    receive_user_agreement,
)

from consumer_view.search_view import receive_app_trending, receive_app_search

from consumer_view.ausernotif_view import (
    receive_notif_liked_auser_post_sent,
    receive_notif_liked_auser_post,
    receive_notif_commented_auser_post,
    receive_notif_commented_auser_post_sent,
    receive_unread_notif_user,
    receive_all_notif_user,
    receive_mark_notif_user_as_read,
    receive_create_notification,
)

from consumer_view.connection_view import (
    receive_request_connect,
    receive_request_accept,
    receive_connect_list,
    receive_request_list,
    receive_request_delete,
    receive_search,
)

from consumer_view.blog_view import (
    receive_blog_sent,
    receive_blog_list,
    receive_toggle_blog_interactions,
    receive_toggle_blog_shared,
)

from consumer_view.post_view import (
    receive_post_sent,
    receive_post_list,
    receive_toggle_like_post,
    receive_comment_sent,
    receive_comment_list,
    receive_toggle_like_comment,
    receive_toggle_post_interactions,
    receive_toggle_comment_interactions,
)
from consumer_view.group_view import (
    receive_group_connect_list,
    receive_group_message_sent,
    receive_groupchat_list,
)

from consumer_view.directory_view import (
    receive_community_directory,
    create_community_directory,
)
from consumer_view.monetization_view import (
    receive_monetization_accommodations,
    receive_monetization_marketing,
    receive_monetization_library,
    receive_monetization_campusmap,
    receive_monetization_create_tx,
    receive_monetization_create_accommodation,
    receive_monetization_tx,
    receive_monetization_lost_items,
    receive_monetization_found_items,
    receive_monetization_create_lost_item,
    receive_monetization_create_found_item,
    receive_monetization_lost_found_search,
    receive_service_guide_ai_search,
    receive_service_guide_list,
    receive_service_guide_documents,
    receive_analytics_dashboard,
    receive_analytics_summary,
    receive_analytics_track_visit
    )
from consumer_view.notif_view import (
    receive_notif_list,
    receive_toggle_like_notif,
    receive_notif_sent,
    receive_notif_comment_sent,
    receive_notif_comment_list,
    receive_toggle_like_notif_comment,
    receive_toggle_notif_comment_interactions,
    receive_notif_poll_vote,
    receive_notif_poll_list,
    receive_notif_poll_details,
    receive_notif_poll_statistics,
)
from consumer_view.app_notif_view import (
    receive_app_notif_sent,
    receive_app_notif_list,
    receive_toggle_app_notif_interactions,
    receive_report_sent,
    receive_reports_list,
    receive_toggle_report_attandand,
    receive_feedback_sent,
    receive_feedback_list,
    receive_toggle_feedback_attandand,
)

# Quercus AI WebSocket handlers
from consumer_view.Quercus_view import (
    receive_quercus_ai_query,
    receive_quercus_conversation_history,
    receive_quercus_campus_info,
    receive_quercus_study_plan,
    receive_quercus_career_guidance,
    receive_quercus_settings_update,
    receive_quercus_conversation_create,
    receive_quercus_typing_start,
    receive_quercus_typing_end,
    receive_quercus_image_analysis,
    receive_quercus_document_analysis,
    receive_quercus_conversation_summary,
    receive_quercus_conversation_insights,
    receive_quercus_analytics,
    receive_quercus_suggestions,
)



class ChatConsumers(WebsocketConsumer):
    def connect(self):
        user = self.scope["user"]
        print(user, user.is_authenticated)
        # if not user.is_authenticated:
        # return

        # save username to use as a group name for this user
        self.username = user.username

        # join this user to a group with their username
        async_to_sync(self.channel_layer.group_add)(self.username, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        # leave group
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )

    # ---------------------------------------------------------------------------
    # ---------------------------------------------------------------------------
    #        Handle Requests
    # ---------------------------------------------------------------------------
    # ---------------------------------------------------------------------------
    def receive(self, text_data):
        # Receive message from websocket
        data = json.loads(text_data)
        data_source = data.get("source")

        # Pretty print python dictionary
        print("receive", json.dumps(data, indent=2))

        # --------------------------------------
        #        app_notif_view
        # --------------------------------------
        # app_notif

        # app notif list
        if data_source == "user.profile":
            receive_user_profile(self, data)

        # app notif send
        elif data_source == "app.notif.list":
            receive_app_notif_sent(self, data)

        # app notif send
        elif data_source == "app.notif.send":
            receive_app_notif_sent(self, data)

        # app notif interact
        elif data_source == "app.notif.interactions":
            receive_toggle_app_notif_interactions(self, data)

        # -----------------------------------
        # App Infor

        # app report send
        elif data_source == "app.trending":
            receive_app_trending(self, data)

        # app report List
        elif data_source == "app.search":
            receive_app_search(self, data)


        # -----------------------------------
        # app_report

        # app report send
        elif data_source == "app.report.send":
            receive_report_sent(self, data)

        # app report List
        elif data_source == "app.report.list":
            receive_reports_list(self, data)

        # app report red
        elif data_source == "app.report.red":
            receive_toggle_report_attandand(self, data)

        # -----------------------------------
        # app_feedback

        # app feedback send
        elif data_source == "app.feedback.send":
            receive_feedback_sent(self, data)

        # app feedback list
        elif data_source == "app.feedback.list":
            receive_feedback_list(self, data)

        # app feedback red
        elif data_source == "app.feedback.red":
            receive_toggle_feedback_attandand(self, data)

        # --------------------------------------
        #        UserNotif_View
        # --------------------------------------
        # receive_all_notifications
        elif data_source == "user.notif.all_notifs":
            receive_all_notif_user(self, data)

        # # receive_notif_liked_auser_post list
        elif data_source == "user.notif.unread_notifs":
            receive_unread_notif_user(self, data)

        # receive_notif_commented_auser_post_sent
        elif data_source == "user.notif.send":
            receive_create_notification(self, data)

        # # receive_notif_commented_auser_post list
        elif data_source == "user.notif.red":
            receive_mark_notif_user_as_read(self, data)

        # --------------------------------------
        #        Connection_View
        # --------------------------------------
        # Get friend list
        if data_source == "connect.list":
            receive_connect_list(self, data)

        # make connect request
        elif data_source == "request.connect":
            receive_request_connect(self, data)

        # Accept connect request
        elif data_source == "request.accept":
            receive_request_accept(self, data)

        # Accept connect request
        elif data_source == "request.delete":
            receive_request_delete(self, data)

        # Get Request List
        elif data_source == "request.list":
            receive_request_list(self, data)

        # Search / filter users
        elif data_source == "search":
            receive_search(self, data)

        # --------------------------------------
        #        Message_View
        # --------------------------------------
        # Message List
        elif data_source == "message.list":
            receive_message_list(self, data)

        # Message has been sent
        elif data_source == "message.send":
            receive_message_sent(self, data)

        # User id typing message
        elif data_source == "message.type":
            receive_message_type(self, data)

        # User id typing message
        elif data_source == "message.red":
            receive_message_red(self, data)

        # --------------------------------------
        #        Blog_View
        # --------------------------------------
        # Message has been sent
        elif data_source == "blog.send":
            receive_blog_sent(self, data)

        # Get Blog List
        elif data_source == "blog.list":
            receive_blog_list(self, data)

        # Get Blog Interactions
        elif data_source == "blog.interactions":
            receive_toggle_blog_interactions(self, data)

        # Get Blog shared
        elif data_source == "blog.shared":
            receive_toggle_blog_shared(self, data)

        # --------------------------------------
        #        Post_View
        # --------------------------------------
        # Message has been sent
        elif data_source == "post.send":
            receive_post_sent(self, data)

        # Get Post List
        elif data_source == "post.list":
            receive_post_list(self, data)

        elif data_source == "post.likes":
            receive_toggle_like_post(self, data)

        # Comment has been sent
        elif data_source == "comment.send":
            receive_comment_sent(self, data)

        # Get Comment List
        elif data_source == "comment.list":
            receive_comment_list(self, data)

        # Get Comment likes
        elif data_source == "comment.likes":
            receive_toggle_like_comment(self, data)

        # Get Post interactions
        elif data_source == "post.interactions":
            receive_toggle_post_interactions(self, data)

        # Get Comment interactions
        elif data_source == "comment.interactions":
            receive_toggle_comment_interactions(self, data)

        # --------------------------------------
        #        notif_View
        # --------------------------------------
        elif data_source == "notif.list":
            receive_notif_list(self, data)

        elif data_source == "notif.likes":
            receive_toggle_like_notif(self, data),

        elif data_source == "notif.send":
            receive_notif_sent(self, data),

        elif data_source == "notif.comment.send":
            receive_notif_comment_sent(self, data),

        elif data_source == "notif.comment.list":
            receive_notif_comment_list(self, data),

        elif data_source == "notif.comment.likes":
            receive_toggle_like_notif_comment(self, data),

        elif data_source == "notif.comment.interactions":
            receive_toggle_notif_comment_interactions(self, data),

        elif data_source == "notif.poll.vote":
            receive_notif_poll_vote(self, data),

        elif data_source == "notif.poll.list":
            receive_notif_poll_list(self, data),

        elif data_source == "notif.poll.details":
            receive_notif_poll_details(self, data),

        elif data_source == "notif.poll.statistics":
            receive_notif_poll_statistics(self, data),

        # --------------------------------------
        #        Group_View
        # --------------------------------------
        # Group Mesages Send
        elif data_source == "groupmessages.send":
            receive_group_message_sent(self, data)

        # Get Group Connect list
        elif data_source == "group_connect.list":
            receive_group_connect_list(self, data)

        # Group Mesages List
        elif data_source == "groupmessages.list":
            receive_groupchat_list(self, data)

        # --------------------------------------
        #        User_View
        # --------------------------------------
        # Upload Image
        elif data_source == "image.upload":
            self.receive_image(data)

        # Upload Email
        elif data_source == "user.email":
            self.receive_user_email(data)

        # Upload Email
        elif data_source == "user.agreement":
            self.receive_user_agreement(data)

        # --------------------------------------
        #        Message_View
        # --------------------------------------
        # Directory List
        elif data_source == "directory.list":
            receive_community_directory(self, data)

        # Monetization websocket messages
    
        elif data_source == "monetization.accommodations":
            receive_monetization_accommodations(self, data)
            
        elif data_source == "monetization.tx":
            receive_monetization_tx(self, data)

        elif data_source == "monetization.marketing":
            receive_monetization_marketing(self, data)

        elif data_source == "monetization.library":
            receive_monetization_library(self, data)

        elif data_source == "monetization.campusmap":
            receive_monetization_campusmap(self, data)

        elif data_source == "monetization.create_accommodation":
            # handle creation of accommodation via websocket
            receive_monetization_create_accommodation(self, data)
            
        elif data_source == "monetization.create_tx_agent":
            # handle creation of accommodation via websocket
            receive_monetization_create_tx(self, data)

        # Lost and Found WebSocket handlers
        elif data_source == "monetization.lost_items":
            receive_monetization_lost_items(self, data)

        elif data_source == "monetization.found_items":
            receive_monetization_found_items(self, data)

        elif data_source == "monetization.create_lost_item":
            receive_monetization_create_lost_item(self, data)

        elif data_source == "monetization.create_found_item":
            receive_monetization_create_found_item(self, data)

        elif data_source == "monetization.lost_found_search":
            receive_monetization_lost_found_search(self, data)

        # Analytics WebSocket handlers
        elif data_source == "analytics.dashboard":
            receive_analytics_dashboard(self, data)

        elif data_source == "analytics.summary":
            receive_analytics_summary(self, data)

        elif data_source == "analytics.track_visit":
            receive_analytics_track_visit(self, data)

        # Service Guide AI Search handlers
        elif data_source == "service_guide.ai_search":
            receive_service_guide_ai_search(self, data)

        elif data_source == "service_guide.list":
            receive_service_guide_list(self, data)

        elif data_source == "service_guide.documents":
            receive_service_guide_documents(self, data)

        # Directory List
        elif data_source == "directory.create":
            create_community_directory(self, data)

        # --------------------------------------
        #        Quercus AI View
        # --------------------------------------
        elif data_source == "quercus.ai_query":
            receive_quercus_ai_query(self, data)

        elif data_source == "quercus.conversation_history":
            receive_quercus_conversation_history(self, data)

        elif data_source == "quercus.campus_info":
            receive_quercus_campus_info(self, data)

        elif data_source == "quercus.study_plan":
            receive_quercus_study_plan(self, data)

        elif data_source == "quercus.career_guidance":
            receive_quercus_career_guidance(self, data)

        elif data_source == "quercus.settings_update":
            receive_quercus_settings_update(self, data)

        elif data_source == "quercus.conversation_create":
            receive_quercus_conversation_create(self, data)

        elif data_source == "quercus.typing_start":
            receive_quercus_typing_start(self, data)

        elif data_source == "quercus.typing_end":
            receive_quercus_typing_end(self, data)

        # New Gemini integration handlers
        elif data_source == "quercus.image_analysis":
            receive_quercus_image_analysis(self, data)

        elif data_source == "quercus.document_analysis":
            receive_quercus_document_analysis(self, data)

        elif data_source == "quercus.conversation_summary":
            receive_quercus_conversation_summary(self, data)

        elif data_source == "quercus.conversation_insights":
            receive_quercus_conversation_insights(self, data)

        elif data_source == "quercus.analytics":
            receive_quercus_analytics(self, data)

        elif data_source == "quercus.suggestions":
            receive_quercus_suggestions(self, data)

        # --------------------------------------
        #        ------##----------
        # --------------------------------------
        elif data_source == "user.email":
            receive_user_email(self, data)

        elif data_source == "user.agreement":
            receive_user_agreement(self, data)

    # ==================================================================================================================================================================== #

    # -----------------------------------------------------------------
    #   Catch/all broadcast to client helpers
    # -----------------------------------------------------------------
    def send_group(self, group, source, data):
        response = {"type": "broadcast_group", "source": source, "data": data}
        async_to_sync(self.channel_layer.group_send)(group, response)

    def broadcast_group(self, data):
        """
        data:
            - type: 'broadcast_group'
            - source: where it is originated
            - data: what ever to be sent
        """

        # =====================================================

        data.pop("type")

        # =====================================================
        """
               return-data:
                   - source: where it is originated
                   - data: what ever to be send
        """
        # =====================================================

        self.send(text_data=json.dumps(data))
 