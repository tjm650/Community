from auserpost.models import Post, Comment
from ausernotif.models import (
    Notif_user_post_liked,
    Notif_user_post_commented,
    Notif_user,
)
from ausernotif.serializers import (
    Notif_user_post_liked_serializer,
    Notif_user_post_commented_serializer,
    Notif_user_serializer,
)
from api.models import User
from afollows.models import Connection
from django.db.models import Q


# --------------------------------------------------------------
#                    receive_notif_liked_auser_post_list
# --------------------------------------------------------------
def receive_notif_liked_auser_post(consumer, data):
    user = consumer.scope["user"]

    posts = Notif_user_post_liked.objects.all().order_by("-created")

    for v in posts:
        recipient_post = v.post
        recipient = v.post.sender

        # x = posts.get(post=recipient_post)
        # y = x.objects.get(sender=recipient)

        serialized_posts = Notif_user_post_liked_serializer(
            posts, context={"user": recipient}, many=True
        )
        # return

        print("userNotifList========>:", serialized_posts.data)

        consumer.send_group(
            recipient.username, "user.notif.post.like.list", serialized_posts.data
        )


# --------------------------------------------------------------
#                    receive_notif_liked_auser_post_sent
# --------------------------------------------------------------
def receive_notif_liked_auser_post_sent(post_id, consumer, data):
    user = consumer.scope["user"]

    try:
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        notif = Post.objects.get(id=new_post_id)
        notif_likes = notif.likes.all()

        try:
            connection1 = Connection.objects.filter(
                sender=notif.sender, receiver=user, accepted=True
            )
            connection2 = Connection.objects.filter(
                sender=user, receiver=notif.sender, accepted=True
            )

        except Connection.DoesNotExist:
            print("connections does not exist")

        print("connection1--->", connection1)
        print("connection2--->", connection2)

        if connection1.exists:
            notif_user_liked = notif_likes.get(username=user.username)
        elif not connection2.exists:
            notif_user_liked = notif_likes.get(username=user.username)
        else:
            print("connection2 does not exist-->")
            # notif_user_liked = notif_likes.get(username=user.username)

        # user_get_val = User.objects.get(username=user.username)
        # user_filter_val = User.objects.filter(username=user.username)

    except Post.DoesNotExist:
        print("Couldn't find post")
        return

    if user != notif.sender:
        print("notif_user_liked-->", notif_user_liked)
        print("notif.sender-->", notif.sender.username)
        interactor_name = notif_user_liked.username

        recipient = notif.sender

        notif_interaction = Notif_user_post_liked.objects.create(
            interactor=notif_user_liked,
            notif_type="PostLike",
            description=f"{interactor_name} liked your post",
            post=notif,
        )

        Notif_user_post_liked_serializer(notif_interaction, context={"user": recipient})

        consumer.send_group(user.username, "user.notif.post.like.sent", data)


# --------------------------------------------------------------
#                    receive_notif_commented_auser_post_list
# --------------------------------------------------------------
def receive_notif_commented_auser_post(consumer, data):
    user = consumer.scope["user"]

    posts = Notif_user_post_commented.objects.all().order_by("-created")

    for v in posts:
        recipient_post = v.post
        recipient = v.post.sender

        # x = posts.get(post=recipient_post)
        # y = x.objects.get(sender=recipient)

        serialized_posts = Notif_user_post_commented_serializer(
            posts, context={"user": recipient}, many=True
        )
        # return

        print("userNotifListCommenteds========>:", serialized_posts.data)

        consumer.send_group(
            recipient.username, "user.notif.post.commented.list", serialized_posts.data
        )


# --------------------------------------------------------------
#                    receive_notif_commented_auser_post_sent
# --------------------------------------------------------------
def receive_notif_commented_auser_post_sent(post_id, consumer, data):
    user = consumer.scope["user"]

    try:
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        notif = Post.objects.get(id=new_post_id)
        notif_likes = notif.likes.all()

        try:
            connection1 = Connection.objects.filter(
                sender=notif.sender, receiver=user, accepted=True
            )
            connection2 = Connection.objects.filter(
                sender=user, receiver=notif.sender, accepted=True
            )

        except Connection.DoesNotExist:
            print("connections does not exist")

        print("connection1--->", connection1)
        print("connection2--->", connection2)

        if connection1.exists:
            notif_user_liked = notif_likes.get(username=user.username)
        elif not connection2.exists:
            notif_user_liked = notif_likes.get(username=user.username)
        else:
            print("connection2 does not exist-->")
            # notif_user_liked = notif_likes.get(username=user.username)

        # user_get_val = User.objects.get(username=user.username)
        # user_filter_val = User.objects.filter(username=user.username)

    except Post.DoesNotExist:
        print("Couldn't find post")
        return

    if user != notif.sender:
        print("notif_user_commented-->", notif_user_liked)
        print("notif.sender-->", notif.sender.username)
        interactor_name = notif_user_liked.username

        recipient = notif.sender

        notif_interaction = Notif_user_post_commented.objects.create(
            interactor=notif_user_liked,
            notif_type="PostComment",
            description=f"{interactor_name} commented on your post",
            post=notif,
        )

        Notif_user_post_commented_serializer(
            notif_interaction, context={"user": recipient}
        )

        consumer.send_group(user.username, "user.notif.post.commented.sent", data)


# --------------------------------------------------------------
#                    receive_send_unread_notif_user
# --------------------------------------------------------------
def receive_unread_notif_user(consumer, data):
    user = consumer.scope["user"]

    notifications = Notif_user.objects.filter(recipient=user, is_read=False).order_by(
        "-created"
    )[:20]

    serializer = Notif_user_serializer(notifications, many=True, context={"user": user})
    print("serializer_user_notif--->", serializer.data)

    consumer.send_group(user.username, "user.notif.unread_notifs", serializer.data)


# --------------------------------------------------------------
#                    receive_all_notifications
# --------------------------------------------------------------
def receive_all_notif_user(consumer, data):
    user = consumer.scope["user"]
    action = data.get("action")
    notif_user_id = data.get("notif_user_id")

    if action == "get_notif":
        notifications = Notif_user.objects.filter(recipient=user).order_by(
            "-created"
        )[:50]

        serializer = Notif_user_serializer(
            notifications, many=True, context={"user": user}
        )

        consumer.send_group(
            user.username,
            "user.notif.all_notifs",
            serializer.data,
        )


# --------------------------------------------------------------
#                    receive_mark_notification_as_read
# --------------------------------------------------------------
def receive_mark_notif_user_as_read(consumer, data):
    user = consumer.scope["user"]
    notif_user_id = data.get("notif_user_id")
    action = data.get("action")

    if action == "mark_as_read":

        try:
            notification = Notif_user.objects.get(id=notif_user_id, recipient=user)

            notification.is_read = True
            notification.save()

        except Notif_user.DoesNotExist:
            print("notif_user does not exist")

    consumer.send_group(user.username, "user.notif.red", data)


# --------------------------------------------------------------
#                    create_notification
# --------------------------------------------------------------
def receive_create_notification(
    consumer,
    data,
    recipient,
    sender,
    notif_type,
    description,
    related_id,
    content_type,
    extra_data=None,
):
    user = consumer.scope["user"]

    try:
        connection1 = Connection.objects.filter(
            sender=sender, receiver=recipient, accepted=True
        )
        connection2 = Connection.objects.filter(
            sender=recipient, receiver=sender, accepted=True
        )

    except Connection.DoesNotExist:
        print("connections does not exist")

    print("connection1--->", connection1)
    print("connection2--->", connection2)

    if connection1.exists:
        notification = Notif_user.objects.create(
            recipient=recipient,
            sender=sender,
            notif_type=notif_type,
            description=description,
            related_id=related_id,
            content_type=content_type,
            extra_data=extra_data or {},
        )

    elif connection2.exists:
        notification = Notif_user.objects.create(
        recipient=recipient,
        sender=sender,
        notif_type=notif_type,
        description=description,
        related_id=related_id,
        content_type=content_type,
        extra_data=extra_data or {},
         )
        
    else:
        print("no connection exist-->")
        
        return notification
    
    print("notification created>")
    print("notification--->", notification)
    
        

    serialized = Notif_user_serializer(notification).data

    data = {"source": "new_notification", "data": serialized}

    consumer.send_group(user.username, "user.notif.send", serialized)
    


# --------------------------------------------------------------
#                    receive_notif_user
# --------------------------------------------------------------
# def receive_notif_user(consumer, data):
