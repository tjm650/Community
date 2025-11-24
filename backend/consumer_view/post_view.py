import base64
from django.core.files.base import ContentFile

from api.models import User
from api.serializers import UserSerializer
from auserpost.models import Post, Comment

from auserpost.serializers import PostSerializer, CommentSerializer
from .ausernotif_view import (
    receive_notif_liked_auser_post_sent,
    receive_notif_commented_auser_post_sent,
    receive_create_notification,
)


# --------------------------------------------------------------
#                    receive_post_sent
# --------------------------------------------------------------
def receive_post_sent(consumer, data):
    user = consumer.scope["user"]
    user_id = data.get("userId")
    description = data.get("description")
    Image_filename = data.get("imageFilename")
    image_str = data.get("imageBase64")
    print("user_id==>", user_id)

    try:
        user_connection = User.objects.get(id=user_id)
        print("user_id==>", user_connection)

    except User.DoesNotExist:
        print("Error: couldnt find user")
        return

    if image_str == None:
        Get_image = image_str = None

    elif image_str:
        decoded_image = base64.b64decode(image_str)
        Get_image = ContentFile(decoded_image, name=Image_filename)

    message = Post.objects.create(
        sender=user_connection,
        image=Get_image,
        description=description,
    )

    # Send New Message back to sender
    PostSerializer(message, context={"user": user})
    qs = PostSerializer(message, context={"user": user})
    print("Blogers==>", qs.data)

    consumer.send_group(user.username, "post.send", data)


# --------------------------------------------------------------
#                    receive_post_list
# --------------------------------------------------------------
def receive_toggle_like_post(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            posts = Post.objects.all().order_by("-created").distinct()
        except Post.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "like":
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        try:
            notif = Post.objects.get(id=new_post_id)
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
                # receive_notif_liked_auser_post_sent(post_id, consumer, data)

            notif.save()
            receive_create_notification(
                consumer=consumer,
                data=data,
                recipient=notif.sender,
                sender=user,
                notif_type="like",
                description=f"{user.username} liked your post",
                related_id=notif.id,
                content_type="post",
                extra_data={
                    # "image": notif.image,
                    # "sender": notif.sender,
                    "description": notif.description,
                },
            )

            # Get Messages
            posts = Post.objects.all()

        except Post.DoesNotExist:
            print("Error: couldnt find post likes")
            return
        return posts and print("posts_updates==>:", posts)

    PostSerializer(
        posts,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "post_likes": [],
    }

    consumer.send_group(user.username, "post.likes", data)


# --------------------------------------------------------------
#                    receive_post_list
# --------------------------------------------------------------
def receive_post_list(consumer, data):
    user = consumer.scope["user"]
    page = data.get("page", 0)
    page_size = 5

    # Get Messages
    posts = Post.objects.all().order_by("-created")[
        page * page_size : (page + 1) * page_size
    ]

    # Serialized Messages
    serialized_posts = PostSerializer(posts, context={"user": user}, many=True)

    posts_count = Post.objects.filter().count()

    next_page = page + 1 if posts_count > (page + 1) * page_size else None

    data = {
        "posts": serialized_posts.data,
        "next": next_page,
    }

    # Send Back to the requestor
    consumer.send_group(user.username, "post.list", data)


# --------------------------------------------------------------
#                    receive_toggle_post_interactions
# --------------------------------------------------------------
def receive_toggle_post_interactions(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            get_posts = Post.objects.all().order_by("-created").distinct()
        except Post.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "interaction":
        if post_id:
            new_post_id = post_id
        else:
            new_post_id = 2
            return new_post_id

        try:
            post = Post.objects.get(id=new_post_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if post.interactions.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                post.interactions.exists()
            else:
                post.interactions.add(user_get_val)
            post.save()

            # Get Messages
            get_posts = Post.objects.all()

        except Post.DoesNotExist:
            print("Error: couldnt find post ")
            return
        return get_posts and print("post_interactions==>:", get_posts)

    PostSerializer(get_posts, context={"user": user}, many=True)

    data = {
        "post_interactions": [],
    }

    consumer.send_group(user.username, "post.interactions", data)


# --------------------------------------------------------------
#                    receive_comment_sent
# -------------------------------------------------------------
def receive_comment_sent(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
    description = data.get("description")

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        print("Error: couldnt find post")
        return

    comment = Comment.objects.create(post=post, sender=user, description=description)

    # Serialize the comment
    serializer = CommentSerializer(comment, context={"user": user})

    # receive_notif_commented_auser_post_sent(
    #     post_id=post_id, consumer=consumer, data=data
    # )

    receive_create_notification(
        consumer=consumer,
        data=data,
        recipient=post.sender,
        sender=user,
        notif_type="comment",
        description=f"{user.username} commented your post",
        related_id=post.id,
        content_type="post",
        extra_data={
            "comment_id": comment.id,
            "comment_description": comment.description,
            "description": post.description,
        },
    )

    # Send to the post owner and all users who commented on this post
    recipients = set([post.sender.username])
    for comment_user in post.comments.values_list(
        "sender__username", flat=True
    ).distinct():
        recipients.add(comment_user)

    for recipient in recipients:
        consumer.send_group(
            recipient, "comment.send", {"post_id": post_id, "comment": serializer.data}
        )


# --------------------------------------------------------------
#                    receive_comment_list
# -------------------------------------------------------------
def receive_comment_list(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
    page = data.get("page", 1)
    page_size = 5

    try:
        post = Post.objects.get(id=post_id)
        comments = post.comments.all().order_by("-created")
    except Post.DoesNotExist:
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

    consumer.send_group(user.username, "comment.list", data)


# --------------------------------------------------------------
#                    receive_post_list
# --------------------------------------------------------------
def receive_toggle_like_comment(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            comment = Comment.objects.all().order_by("-created").distinct()
        except Post.DoesNotExist:
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
    consumer.send_group(user.username, "comment.likes", data)


# --------------------------------------------------------------
#                    receive_toggle_comment_interactions
# --------------------------------------------------------------
def receive_toggle_comment_interactions(consumer, data):
    user = consumer.scope["user"]
    post_id = data.get("postId")
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

    consumer.send_group(user.username, "comment.interactions", data)
