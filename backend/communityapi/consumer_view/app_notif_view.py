import base64
from django.core.files.base import ContentFile

from api.models import User, CommunityDirectory
from api.serializers import UserSerializer, CommunityDirectorySerializer
from app_notif.models import AppNotif, AppReport, AppFeedback
from app_notif.serializers import AppNotifSerializer, AppReportSerializer, AppFeedbackSerializer



# --------------------------------------------------------------
#                    receive_app_notif_sent
# --------------------------------------------------------------
def receive_app_notif_sent(consumer, data):
    user = consumer.scope["user"]
    user_id = data.get("UserId")
    receiver_id = data.get("ReceiverId")
    # tags = data.get("tags", "")
    service_id = data.get("directoryId") 
    description = data.get("description")
    Image_filename = data.get("imageFilename")
    image_str = data.get("imageBase64")

    try:
        user_connection = User.objects.get(id=user_id)
        receiver_connection = User.objects.get(id=receiver_id)
        service_connection = CommunityDirectory.objects.get(id=service_id)
        

    except User.DoesNotExist:
        print("Error: couldnt find user")
        return

    if image_str == None:
        Get_image = image_str = None

    elif image_str:
        decoded_image = base64.b64decode(image_str)
        Get_image = ContentFile(decoded_image, name=Image_filename)

    message = AppNotif.objects.create(
        sender=service_connection,
        sender_user =user_connection,
        receiver =receiver_connection,
        description=description,
        image=Get_image,
    )

    # Send New Message back to sender
    AppNotifSerializer(message, context={"user": user})
    qs = AppNotifSerializer(message, context={"user": user})
    print("AppNotif==>", qs.data)

    consumer.send_group(user.username, "app.notif.send", data)
    
   
    
# --------------------------------------------------------------
#                    receive_app_notif_list
# --------------------------------------------------------------
def receive_app_notif_list(consumer, data):
    user = consumer.scope["user"]
    page = data.get("page", 0)
    page_size = 15

    # Get Messages
    posts = AppNotif.objects.filter(receiver=user).order_by("-created")[
        page * page_size : (page + 1) * page_size
    ]

    # Serialized Messages
    serialized_posts = AppNotifSerializer(posts, context={"user": user}, many=True)

    posts_count = AppNotif.objects.filter().count()

    next_page = page + 1 if posts_count > (page + 1) * page_size else None

    data = {
        "notifs": serialized_posts.data,
        "next": next_page,
    }  

    # Send Back to the requestor
    consumer.send_group(user.username, "app.notif.list", data)
    
    
# --------------------------------------------------------------
#                    receive_toggle_app_notif_interactions
# --------------------------------------------------------------
def receive_toggle_app_notif_interactions(consumer, data):
    user = consumer.scope["user"]
    app_notif_id = data.get("appNotifId")
    action = data.get("action")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            app_notifs = AppNotif.objects.all().order_by("-created").distinct()
        except AppNotif.DoesNotExist:
            print("Error: couldnt find Post")
            
            return 

    elif action == "interaction":
        
        if app_notif_id:
            new_app_notif_id = app_notif_id
        else:
            new_app_notif_id = 2
            return new_app_notif_id
        
        
        

        try:
            app_notif = AppNotif.objects.get(id=new_app_notif_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if app_notif.interactions.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                app_notif.interactions.exists()
            else:
                app_notif.interactions.add(user_get_val)
            app_notif.save()

            # Get app notif
            app_notifs = AppNotif.objects.all()
            
        except AppNotif.DoesNotExist:
            print("Error: couldnt find notif")
            return
        return app_notifs and print("app_notifs_interactions==>:", app_notifs)

    AppNotifSerializer(app_notifs,context={"user": user})
    
    # receive_app_notif_list(consumer=consumer, data=data )
    
    consumer.send_group(user.username, "app.notif.interactions", data)



    
      
      
      
      
# --------------------------------------------------------------
#                    receive_report_sent
# --------------------------------------------------------------
def receive_report_sent(consumer, data):
    user = consumer.scope["user"]
    user_id = data.get("userId")
    subject = data.get("subject")
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

    message = AppReport.objects.create(
        sender=user_connection,
        image=Get_image,
        subject=subject,
        description=description,
    )

    # Send New Message back to sender
    AppReportSerializer(message, context={"user": user})
    qs = AppReportSerializer(message, context={"user": user})
    print("Report==>", qs.data)
    
    try:
        user_connection = User.objects.get(id=1)
        receiver_connection = User.objects.get(id=user.id)
        service_connection = CommunityDirectory.objects.get(id=7)
    except User.DoesNotExist:
        print("Error: couldnt find user")
        return
    
    subject = "Report"
    description = "Thank you for your report, we will respond once we review it. Reports help us to mitigate misuse of the Community app. Help us in maintaining our relevancy"
    message = AppNotif.objects.create(
        sender=service_connection,
        subject = subject,
        sender_user =user_connection,
        description=description,
        image=None,
    )
    message.receiver.add(receiver_connection)

    # Send New Message back to sender
    AppNotifSerializer(message, context={"user": user_connection})
    
    consumer.send_group(user.username, "app.feedback.send", data)

    consumer.send_group(user.username, "app.report.send", data)



# --------------------------------------------------------------
#                    receive_app_notif_list
# --------------------------------------------------------------
def receive_reports_list(consumer, data):
    user = consumer.scope["user"]
    page = data.get("page", 0)
    page_size = 5

    # Get Messages
    posts = AppReport.objects.all().order_by("-created")[
        page * page_size : (page + 1) * page_size
    ]

    # Serialized Messages
    serialized_posts = AppReportSerializer(posts, context={"user": user}, many=True)

    posts_count = AppReport.objects.filter().count()

    next_page = page + 1 if posts_count > (page + 1) * page_size else None

    data = {
        "reports": serialized_posts.data,
        "next": next_page,
    }  

    # Send Back to the requestor
    consumer.send_group(user.username, "app.report.list", data)
    


# --------------------------------------------------------------
#                    receive_toggle_report_attandand
# --------------------------------------------------------------
def receive_toggle_report_attandand(consumer, data):
    user = consumer.scope["user"]
    report_id = data.get("appNotifId")
    action = data.get("red")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            app_report = AppReport.objects.all().order_by("-created").distinct()
        except AppReport.DoesNotExist:
            print("Error: couldnt find Post")
            return

    elif action == "red":
        if report_id:
            new_report_id = new_report_id
        else:
            new_report_id = 2
            return new_report_id

        try:
            app_report = AppReport.objects.get(id=new_report_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if app_report.red_by.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                app_report.red_by.exists()
            else:
                app_report.red_by.add(user_get_val)
            app_report.save()

            # Get Messages
            app_reports = AppReport.objects.all()

        except AppReport.DoesNotExist:
            print("Error: couldnt find post likes")
            return
        return app_reports and print("blog_interactions==>:", app_reports)

    AppReportSerializer(
        app_reports,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "app_reports_interactions": [],
    }

    consumer.send_group(user.username, "app.report.red", data)






# --------------------------------------------------------------
#                    receive_feedback_sent
# --------------------------------------------------------------
def receive_feedback_sent(consumer, data):
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

    message = AppFeedback.objects.create(
        sender=user_connection,
        image=Get_image,
        description=description,
    )

    # Send New Message back to sender
    AppFeedbackSerializer(message, context={"user": user})
    
    try:
        user_connection = User.objects.get(id=1)
        receiver_connection = User.objects.get(id=user.id)
        service_connection = CommunityDirectory.objects.get(id=7)
    except User.DoesNotExist:
        print("Error: couldnt find user")
        return
    
    subject = "Feedback"
    description = "Thank you for your feedback."
    message = AppNotif.objects.create(
        sender=service_connection,
        subject = subject,
        sender_user =user_connection,
        description=description,
        image=None,
    )
    message.receiver.add(receiver_connection)

    # Send New Message back to sender
    AppNotifSerializer(message, context={"user": user_connection})
    
    consumer.send_group(user.username, "app.feedback.send", data)
    consumer.send_group(user.username, "app.notif.send", data)
    




# --------------------------------------------------------------
#                    receive_feedback_list
# --------------------------------------------------------------
def receive_feedback_list(consumer, data):
    user = consumer.scope["user"]
    page = data.get("page", 0)
    page_size = 5

    # Get Messages
    posts = AppFeedback.objects.all().order_by("-created")[
        page * page_size : (page + 1) * page_size
    ]

    # Serialized Messages
    serialized_posts = AppFeedbackSerializer(posts, context={"user": user}, many=True)

    posts_count = AppFeedback.objects.filter().count()

    next_page = page + 1 if posts_count > (page + 1) * page_size else None

    data = {
        "posts": serialized_posts.data,
        "next": next_page,
    }  

    # Send Back to the requestor
    consumer.send_group(user.username, "app.feedback.list", data)
    



# --------------------------------------------------------------
#                    receive_toggle_feedback_attandand
# --------------------------------------------------------------
def receive_toggle_feedback_attandand(consumer, data):
    user = consumer.scope["user"]
    AppFeedback_id = data.get("appNotifId")
    action = data.get("red")
    user_id = data.get("userId")

    if action == None:
        try:
            # Get Messages
            app_feedback = AppFeedback.objects.all().order_by("-created").distinct()
        except AppFeedback.DoesNotExist:
            print("Error: couldnt find feeback")
            return

    elif action == "red":
        if AppFeedback_id:
            new_AppFeedback_id = new_AppFeedback_id
        else:
            new_AppFeedback_id = 2
            return new_AppFeedback_id

        try:
            app_feedback = AppFeedback.objects.get(id=new_AppFeedback_id)
            user_get_val = User.objects.get(username=user.username)
            user_filter_val = User.objects.filter(username=user.username)

            print("user_val", user_get_val)
            print("user_val", user_filter_val)

            if not user_filter_val.exists():
                User.objects.create(username=user.username)

            if app_feedback.red_by.filter(id=user_get_val.id).exists():
                #     blog.interactions.remove(user_get_val)
                app_feedback.red_by.exists()
            else:
                app_feedback.red_by.add(user_get_val)
            app_feedback.save()

            # Get Messages
            app_feedbacks = AppFeedback.objects.all()

        except AppFeedback.DoesNotExist:
            print("Error: couldnt find feedbacks likes")
            return
        return app_feedbacks and print("blog_interactions==>:", app_feedbacks)

    AppFeedbackSerializer(
        app_feedbacks,
        context={
            "user": user,
        },
        many=True,
    )

    data = {
        "app_feedbacks_interactions": [],
    }

    consumer.send_group(user.username, "app.feedback.red", data)


