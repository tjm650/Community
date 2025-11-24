import base64
from django.core.files.base import ContentFile

from api.models import User, CommunityDirectory
from api.serializers import UserSerializer
from ablog.models import Bloger as Blog
from ablog.serializers import BlogSerializer


# --------------------------------------------------------------
#                    receive_post_sent
# --------------------------------------------------------------
def receive_blog_sent(consumer, data):
    user = consumer.scope["user"]
    user_id = data.get("UserId")
    tags = data.get("tags", "")
    service_id = data.get("directoryId")
    description = data.get("description")
    Image_filename = data.get("imageFilename")
    image_str = data.get("imageBase64")

    try:
        user_connection = User.objects.get(id=user_id)
        department_connection = CommunityDirectory.objects.get(id=service_id)
        print("user_connection::-->", user_connection, user_connection.id)
        

    except User.DoesNotExist:
        print("Error: couldnt user")
        return

    print("selected_tags:===>", tags)

    # Process tags

    if tags:
        # Clean and split the tags string
        tag_ids = [int(tag.strip()) for tag in tags.split(",") if tag.strip().isdigit()]
        
    
    # # Get users associated with tags
    # tagged_users = User.objects.filter(id__in=tag_ids) if tag_ids else []
    # tagged_users = User.objects.filter(id__in=tag_ids)
    # print("selected_tags:===>", tagged_users)
    
    

    if image_str == None:
        Get_image = image_str = None

    elif image_str:
        decoded_image = base64.b64decode(image_str)
        Get_image = ContentFile(decoded_image, name=Image_filename)

        message = Blog.objects.create(
            sender=user_connection,
            image=Get_image,
            service=department_connection,
            description=description,
        )

        # Add tagged users to the blog (assuming it's a many-to-many relationship)
        # message.tags.add(*tag_ids)
        if tags != None:
            if isinstance(tag_ids, list):
                message.tags.add(*tag_ids) 
            else:
                message.tags.add(tag_ids)  

        # Send New Bloger back to sender
        BlogSerializer(message, context={"user": user})

        consumer.send_group(user.username, "blog.send", data)


# --------------------------------------------------------------
#                    receive_blog_list
# --------------------------------------------------------------
def receive_blog_list(consumer, data):
    user = consumer.scope["user"]
    username = data.get("username")
    page = data.get("page", 0)
    page_size = 5

    # Get Messages
    blogs = Blog.objects.all().order_by("-created")[
        page * page_size : (page + 1) * page_size
    ]

    # Serialized Blog
    serialized_blogs = BlogSerializer(blogs, context={"user": user}, many=True)

    # Count the total number of messages for this connection
    blogs_count = Blog.objects.filter().count()

    next_page = page + 1 if blogs_count > (page + 1) * page_size else None

    data = {
        "blogs": serialized_blogs.data,
        "next": next_page,
    }

    # Send Back to the requestor
    consumer.send_group(user.username, "blog.list", data)


# --------------------------------------------------------------
#                    receive_blog_interactions
# --------------------------------------------------------------
def receive_toggle_blog_interactions(consumer, data):
    user = consumer.scope["user"]
    blog_id = data.get("blogId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            blogs = Blog.objects.all().order_by("-created").distinct()
        except Blog.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "interaction":
        if blog_id:
            new_blog_id = blog_id
        else:
            new_blog_id = 2
            return new_blog_id

        try:
            blog = Blog.objects.get(id=new_blog_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if blog.interactions.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                blog.interactions.exists()
            else:
                blog.interactions.add(user_get_val)
            blog.save()

            # Get Messages
            blogs = Blog.objects.all()

        except Blog.DoesNotExist:
            print("Error: couldnt find post likes")
            return
        return blogs and print("blog_interactions==>:", blogs)

    BlogSerializer(
        blogs,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "blog_interactions": [],
    }

    consumer.send_group(user.username, "blog.interactions", data)


# --------------------------------------------------------------
#                    receive_blog_shared
# --------------------------------------------------------------
def receive_toggle_blog_shared(consumer, data):
    user = consumer.scope["user"]
    blog_id = data.get("blogId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            blogs = Blog.objects.all().order_by("-created").distinct()
        except Blog.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "shared":
        if blog_id:
            new_blog_id = blog_id
        else:
            new_blog_id = 2
            return new_blog_id

        try:
            blog = Blog.objects.get(id=new_blog_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if blog.shared.filter(id=user_get_val.id).exists():
                blog.shared.add(user_get_val)
            else:
                blog.shared.add(user_get_val)
            blog.save()

            # Get Messages
            blogs = Blog.objects.all()

        except Blog.DoesNotExist:
            print("Error: couldnt find post likes")
            return
        return blogs and print("blog_shared==>:", blogs)

    BlogSerializer(
        blogs,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "blog_shared": [],
    }

    consumer.send_group(user.username, "blog.shared", data)
