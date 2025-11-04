import json
import base64
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.files.base import ContentFile
from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce
from django.core.files.temp import NamedTemporaryFile

from anotif.serializers import NotifSerializer, CommentSerializer
from anotif.models import Notif, Comment
from api.models import User, CommunityDirectory


# --------------------------------------------------------------
#                    receive_notif_send
# --------------------------------------------------------------
def receive_notif_sent(consumer, data):
    user = consumer.scope["user"]
    user_id = data.get("sender")
    service_id = data.get("service")
    update_type = data.get("update_type") 
    imageBase64 = data.get("imageBase64")
    imageFilename = data.get("imageFilename")
    description = data.get("description")
    
    extra_data = data.get("extra_data")
    name = extra_data.get("name")
    topic = extra_data.get("topic")
    start_date = extra_data.get("start_date")
    end_date = extra_data.get("end_date")
    
    
    
    print("user_id==>", user_id)
    print("service_id==>", service_id)

    try:
        user_connection = User.objects.get(id=user_id)
        print("user_id=======>", user_connection)
        service_connection = CommunityDirectory.objects.get(id=service_id)
        print("user_id========>", service_id)

    except User.DoesNotExist:
        print("Error: couldnt find user")
        return

    if imageBase64 == None:
        Get_image = imageBase64 = None

    elif imageBase64:
        decoded_image = base64.b64decode(imageBase64)
        Get_image = ContentFile(decoded_image, name=imageFilename)

    if update_type == "Update":
        notifPost = Notif.objects.create(
            sender=user_connection,
            service=service_connection,
            image=Get_image,
            update_type=update_type,
            description=description,
        )

    if update_type == "LiveForumn":
        fullname = user_connection.first_name + " " + user_connection.last_name
        notifPost = Notif.objects.create(
            sender=user_connection,
            service=service_connection,
            image=Get_image,
            update_type=update_type,
            description=description,
            extra_data={
                "name": name,
                "topic": topic,
                "sender_name": fullname,
                "sender_username": user_connection.username,
                "sender_profile_image": user_connection.profile_image,
                "start_date": start_date,
                "end_date": end_date
                },
        )

    if update_type == "Event":
        # Prepare event-specific data
        event_data = extra_data or {}

        # Set default values if not provided
        event_data.setdefault('title', event_data.get('title', 'Event'))
        event_data.setdefault('date', event_data.get('date', ''))
        event_data.setdefault('time', event_data.get('time', ''))
        event_data.setdefault('venue', event_data.get('venue', ''))
        event_data.setdefault('duration', event_data.get('duration', ''))
        event_data.setdefault('description', event_data.get('description', description))
        event_data.setdefault('category', event_data.get('category', 'General'))
        event_data.setdefault('start_date', event_data.get('start_date', ''))
        event_data.setdefault('end_date', event_data.get('end_date', ''))

        notifPost = Notif.objects.create(
            sender=user_connection,
            service=service_connection,
            image=Get_image,
            update_type=update_type,
            description=description,
            extra_data=event_data,
        )

    if update_type == "Poll":
        from anotif.models import Poll

        poll_sections = extra_data.get("poll_sections", [])
        poll_images = extra_data.get("images", [])
        poll_type = extra_data.get("poll_type", "single")
        poll_title = extra_data.get("title", name or "Poll")
        poll_question = extra_data.get("poll_question", description)
        poll_category = extra_data.get("category", "general")
        poll_settings = extra_data.get("settings", {})

        # Create the base notification
        notifPost = Notif.objects.create(
            sender=user_connection,
            service=service_connection,
            image=Get_image,
            update_type=update_type,
            description=poll_question,
            extra_data={
                "title": poll_title,
                "poll_question": poll_question,
                "poll_sections": poll_sections,
                "images": poll_images,
                "poll_type": poll_type,
                "category": poll_category,
                "settings": poll_settings,
            },
        )

        # Create the comprehensive Poll model
        poll_data = {
            'notification': notifPost,
            'update_type': update_type or 'Poll',
            'title': poll_title,
            'poll_question': poll_question,
            'poll_type': poll_type,
            'category': poll_category,
            'poll_sections': poll_sections,
            'images': poll_images,
            'settings': poll_settings,
            'duration_hours': poll_settings.get('duration', 24),
            'is_active': True,
            'expired': False,
            'allow_multiple_votes': poll_settings.get('allowMultipleVotes', False),
            'anonymous_voting': poll_settings.get('anonymousVoting', False),
            'hide_results_until_expired': poll_settings.get('hideResults', False),
            'show_results_after_vote': poll_settings.get('showResultsAfterVote', True),
            'allow_comments': poll_settings.get('allowComments', True),
            'send_reminders': poll_settings.get('sendReminders', True),
            'reminder_frequency_hours': poll_settings.get('reminderFrequency', 12),
            'visibility': poll_settings.get('visibility', 'public'),
            'tags': poll_settings.get('tags', []),
        }

        poll = Poll.objects.create(**poll_data)

    # Send New Message back to sender
    NotifSerializer(notifPost, context={"user": user})

    consumer.send_group(user.username, "notif.send", data)


# --------------------------------------------------------------
#                    receive_notif_list
# --------------------------------------------------------------
def receive_notif_list(consumer, data):
    user = consumer.scope["user"]
    page = data.get("page", 0)
    notif_id = data.get("notifId")
    action = data.get("action")
    page_size = 10

    if action == None:
        try:
            # Get Messages
            notifs = (
                Notif.objects.all()
                .order_by("-created")
                .distinct()[page * page_size : (page + 1) * page_size]
            )
        except Notif.DoesNotExist:
            print("Error: couldnt find notif")
            return

    # Serialized Notifs
    serialized_notifs = NotifSerializer(notifs, context={"user": user}, many=True)

    notifs_count = Notif.objects.filter().count()

    next_page = page + 1 if notifs_count > (page + 1) * page_size else None

    data = {
        "notifs": serialized_notifs.data,
        "next": next_page,
    }

    # Send Back to the requestor
    consumer.send_group(user.username, "notif.list", data)


# --------------------------------------------------------------
#                    receive_notif_Likes
# --------------------------------------------------------------
def receive_toggle_like_notif(consumer, data):
    user = consumer.scope["user"]
    notif_id = data.get("notifId")
    action = data.get("action")
    community_directory_id = data.get("directoryId")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            notifs = Notif.objects.all().order_by("-created").distinct()
        except Notif.DoesNotExist:
            print("Error: couldnt find notif")
            return

    elif action == "like":
        if notif_id:
            new_notif_id = notif_id
        else:
            new_notif_id = 2
            return new_notif_id

        try:
            notif = Notif.objects.get(id=new_notif_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)
            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if notif.likes.filter(id=user_get_val.id).exists():
                notif.likes.remove(user_get_val)
            else:
                notif.likes.add(user_get_val)
            notif.save()

            # Get Messages
            notifs = Notif.objects.all()

        except Notif.DoesNotExist:
            print("Error: couldnt find notif likes")
            return
        return notifs and print("notifs_update==>:", notifs)

    NotifSerializer(
        notifs,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "notif_likes": [],  # serialise_followers.data,
    }

    consumer.send_group(user.username, "notif.likes", data)


# --------------------------------------------------------------
#                    receive_notif_comment_sent
# -------------------------------------------------------------
def receive_notif_comment_sent(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("notifId")
    description = data.get("description")

    try:
        post = Notif.objects.get(id=post_id)
    except Notif.DoesNotExist:
        print("Error: couldnt find post")
        return

    comment = Comment.objects.create(post=post, sender=user, description=description)

    # Serialize the comment
    serializer = CommentSerializer(comment, context={"user": user})

    # Send to the post owner and all users who commented on this post
    recipients = set([post.sender.username])
    for comment_user in post.notif_comments.values_list(
        "sender__username", flat=True
    ).distinct():
        recipients.add(comment_user)

    for recipient in recipients:
        consumer.send_group(
            recipient,
            "notif.comment.send",
            {"post_id": post_id, "comment": serializer.data},
        )


# --------------------------------------------------------------
#                    receive_notif_comment_list
# -------------------------------------------------------------
def receive_notif_comment_list(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("notifId")
    page = data.get("page", 1)
    page_size = 5

    try:
        post = Notif.objects.get(id=post_id)
        comments = post.notif_comments.all().order_by("-created")
    except Notif.DoesNotExist:
        print("Error: couldnt find post")
        return

    # # Pagination
    start = (page - 1) * page_size
    end = start + page_size
    paginated_comments = comments[start:end]

    comments_count = comments.count()

    next_page = page + 1 if comments_count > start else None

    serializer = CommentSerializer(
        paginated_comments,
        # paginated_comments,
        many=True,
        context={"user": user},
    )

    data = {
        "post_id": post_id,
        "comments": serializer.data,
        "next": next_page,
    }

    consumer.send_group(user.username, "notif.comment.list", data)


# --------------------------------------------------------------
#                    receive_toggle_like_notif_comment
# --------------------------------------------------------------
def receive_toggle_like_notif_comment(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("notifId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            comment = Comment.objects.all().order_by("-created").distinct()
        except Notif.DoesNotExist:
            print("Error: couldnt find comment")
            return

    elif action == "like":
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        try:
            comment_post = Comment.objects.get(id=new_post_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if comment_post.likes.filter(id=user_get_val.id).exists():
                comment_post.likes.remove(user_get_val)
            else:
                comment_post.likes.add(user_get_val)
            comment_post.save()

            # Get Messages
            comment = Comment.objects.all()

            # Send to the post owner and all users who commented on this post
            # recipients = set([comment_post.sender.username])
            # for comment_user in comment_post.comments.values_list(
            #     "sender__username", flat=True
            # ).distinct():
            #     recipients.add(comment_user)

        except Comment.DoesNotExist:
            print("Error: couldnt find post likes")
            return
        return comment  # , recipients

    CommentSerializer(comment, context={"user": user}, many=True)
    data = {
        "comments_likes": [],
    }

    # for recipient in recipients:
    consumer.send_group(user.username, "notif.comment.likes", data)


# --------------------------------------------------------------
#                    receive_toggle_notif_comment_interactions
# --------------------------------------------------------------
def receive_toggle_notif_comment_interactions(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("notifId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            get_comments = Comment.objects.all().order_by("-created").distinct()
        except Comment.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "interaction":
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        try:
            comment = Comment.objects.get(id=new_post_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if comment.interactions.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                comment.interactions.exists()
            else:
                comment.interactions.add(user_get_val)
            comment.save()

            # Get Messages
            get_comments = Comment.objects.all()

        except Comment.DoesNotExist:
            print("Error: couldnt find comment")
            return
        return get_comments and print("comment_interactions==>:", get_comments)

    CommentSerializer(get_comments, context={"user": user}, many=True)

    data = {
        "comment_interactions": [],
    }

    consumer.send_group(user.username, "notif.comment.interactions", data)


# --------------------------------------------------------------
#                    receive_notif_poll_vote
# --------------------------------------------------------------
def receive_notif_poll_vote(consumer, data):
    user = consumer.scope["user"]
    notif_id = data.get("notifId")
    poll_option_indices = data.get("pollOptionIndices", [])  # Support multiple indices

    try:
        from anotif.models import Poll

        # Get the poll using the notification ID
        poll = Poll.objects.get(notification_id=notif_id)
        user_obj = User.objects.get(username=user.username)

        # Check if poll can accept votes before attempting to vote
        if not poll.can_accept_votes():
            error_message = "Cannot vote on this poll"
            if poll.is_expired:
                error_message = "Poll has expired"
            elif not poll.is_active:
                error_message = "Poll is not active"

            consumer.send_group(user.username, "notif.poll.error", {
                "error": error_message,
                "poll_id": notif_id
            })
            return

        # Record the vote using the Poll model's method
        poll.record_vote(user_obj, poll_option_indices)

        # Send updated poll data to all users who can see this notification
        from anotif.serializers import PollSerializer
        serialized_poll = PollSerializer(poll, context={"user": user})

        # Send to notification list subscribers
        consumer.send_group(user.username, "notif.poll.update", {
            "poll": serialized_poll.data
        })

    except (Notif.DoesNotExist, User.DoesNotExist, Poll.DoesNotExist) as e:
        print(f"Error processing poll vote: {e}")
        consumer.send_group(user.username, "notif.poll.error", {
            "error": "Poll not found",
            "poll_id": notif_id
        })
        return
    except ValueError as e:
        # Handle poll-specific errors (expired, not active, etc.)
        error_message = str(e)
        print(f"Poll vote error: {error_message}")
        consumer.send_group(user.username, "notif.poll.error", {
            "error": error_message,
            "poll_id": notif_id
        })
        return


# --------------------------------------------------------------
#                    receive_notif_poll_list
# --------------------------------------------------------------
def receive_notif_poll_list(consumer, data):
    """Get list of polls with filtering options"""
    user = consumer.scope["user"]
    page = data.get("page", 0)
    page_size = data.get("page_size", 10)
    category = data.get("category")
    status = data.get("status", "active")  # active, expired, all
    service_id = data.get("service_id")

    from anotif.models import Poll

    # Build query
    polls_query = Poll.objects.all()

    if category:
        polls_query = polls_query.filter(category=category)

    if service_id:
        polls_query = polls_query.filter(notification__service_id=service_id)

    if status == "active":
        polls_query = polls_query.filter(is_active=True, expired=False)
    elif status == "expired":
        polls_query = polls_query.filter(expired=True)

    # Pagination
    start = page * page_size
    end = start + page_size
    polls = polls_query[start:end]

    # Serialize polls
    from anotif.serializers import PollSerializer
    serialized_polls = []
    for poll in polls:
        serialized_poll = PollSerializer(poll, context={"user": user})
        serialized_polls.append(serialized_poll.data)

    # Get total count for pagination
    total_count = polls_query.count()
    next_page = page + 1 if total_count > end else None

    response_data = {
        "polls": serialized_polls,
        "next": next_page,
        "total": total_count,
        "page": page,
        "page_size": page_size,
    }

    consumer.send_group(user.username, "notif.poll.list", response_data)


# --------------------------------------------------------------
#                    receive_notif_poll_details
# --------------------------------------------------------------
def receive_notif_poll_details(consumer, data):
    """Get detailed information about a specific poll"""
    user = consumer.scope["user"]
    notif_id = data.get("notifId")

    try:
        from anotif.models import Poll

        poll = Poll.objects.get(notification_id=notif_id)
        poll_data = poll.get_poll_results()

        from anotif.serializers import PollSerializer
        serialized_poll = PollSerializer(poll, context={"user": user})

        response_data = {
            "poll": serialized_poll.data
        }

        consumer.send_group(user.username, "notif.poll.details", response_data)

    except (Notif.DoesNotExist, Poll.DoesNotExist) as e:
        print(f"Error getting poll details: {e}")
        return


# --------------------------------------------------------------
#                    receive_notif_poll_statistics
# --------------------------------------------------------------
def receive_notif_poll_statistics(consumer, data):
    """Get poll statistics and analytics"""
    user = consumer.scope["user"]
    notif_id = data.get("notifId")

    try:
        from anotif.models import Poll

        poll = Poll.objects.get(notification_id=notif_id)
        statistics = poll.vote_statistics
        vote_distribution = poll.get_vote_distribution()
        winners = poll.get_winner_options()

        response_data = {
            "poll_id": notif_id,
            "statistics": statistics,
            "vote_distribution": vote_distribution,
            "winners": winners,
            "total_votes": poll.total_votes,
            "unique_voters": poll.unique_voter_count,
            "is_expired": poll.is_expired,
            "time_remaining": poll.time_remaining,
        }

        consumer.send_group(user.username, "notif.poll.statistics", response_data)

    except (Notif.DoesNotExist, Poll.DoesNotExist) as e:
        print(f"Error getting poll statistics: {e}")
        return
