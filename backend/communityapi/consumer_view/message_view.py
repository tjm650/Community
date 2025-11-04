import base64
from django.core.files.base import ContentFile

from amessages.serializers import MessageSerializer
from amessages.models import Message
from afollows.models import Connection
from api.serializers import UserSerializer #SearchSerializer 
from afollows.serializers import RequestSerializer, FriendSerializer

from consumer_view.connection_view import receive_connect_list


# --------------------------------------------------------------
#                    receive_message_list
# -------------------------------------------------------------
def receive_message_list(consumer, data):
    user = consumer.scope["user"]
    connectionId = data.get("connectionId")
    page = data.get("page", 0)
    page_size = 15
    print("page", page)

    print("connectionId==>:", connectionId)

    try:
        connection = Connection.objects.get(
            id=connectionId,
        )
    except Connection.DoesNotExist:
        print("Error: couldnt find connection")
        return

    print("connection:", connection, connectionId)
    print("connectionId:", connection)

    # Get Messages
    messages = Message.objects.filter(
        connection=connection,
    ).order_by(
        "-created"
    )[page * page_size : (page + 1) * page_size]

    # Serialized Messages
    serialized_messages = MessageSerializer(messages, context={"user": user}, many=True)

    # Get recipient friend
    recipient = connection.sender
    if connection.sender == user:
        recipient = connection.receiver

    # Serialise Friend
    serialise_connect = UserSerializer(recipient)

    # Count the total number of messages for this connection
    messages_count = Message.objects.filter(connection=connection).count()

    next_page = page + 1 if messages_count > (page + 1) * page_size else None

    print("PAGE:", page, next_page)

    data = {
        "messages": serialized_messages.data,
        "next": next_page,
        "connect": serialise_connect.data,
    }

    consumer.send_group(user.username, "message.list", data)


# --------------------------------------------------------------
#                    receive_message_sent
# -------------------------------------------------------------
def receive_message_sent(consumer, data):
    user = consumer.scope["user"]
    connectionId = data.get("connectionId")
    message_text = data.get("message")

    Image_filename = data.get("imageFilename")
    image_str = data.get("imageBase64")

    try:
        connection = Connection.objects.get(
            id=connectionId,
        )
    except Connection.DoesNotExist:
        print("Error: couldnt find connection")
        return

    if image_str == None:
        Get_image = image_str = None

    elif image_str:
        decoded_image = base64.b64decode(image_str)
        Get_image = ContentFile(decoded_image, name=Image_filename)

    print("creating created image==>")
    

    message = Message.objects.create(
    connection=connection, sender=user, image=Get_image, description=message_text
    )
    
    print("message created==>")
    
    
    
    # Get recipient friend
    recipient = connection.sender
    if connection.sender == user:
        recipient = connection.receiver
        

    # Send New Message back to sender
    serialized_message = MessageSerializer(message, context={"user": user})

    serialized_friend = UserSerializer(recipient)
    data = {"message": serialized_message.data, "connect": serialized_friend.data}

    consumer.send_group(user.username, "message.send", data)

    # Send New Message to receiver
    serialized_message = MessageSerializer(message, context={"user": recipient})

    serialized_friend = UserSerializer(user)
    data = {"message": serialized_message.data, "connect": serialized_friend.data}

    consumer.send_group(recipient.username, "message.send", data)
    
    receive_connect_list(data=data, consumer=consumer)
    
    


# --------------------------------------------------------------
#                    receive_message_type
# -------------------------------------------------------------
def receive_message_type(consumer, data):
    user = consumer.scope["user"]
    recipient_username = data.get("username")

    data = {"username": user.username}
    consumer.send_group(recipient_username, "message.type", data)


# --------------------------------------------------------------
#                    receive_message_red
# -------------------------------------------------------------
def receive_message_red(consumer, data):
    user = consumer.scope["user"]
    connectionId = data.get("connectionId")
    action = data.get("action")
    
    try:
            connection = Connection.objects.get(
                id=connectionId,
            )
            # print("connetctionRedId:", connectionId)

    except Connection.DoesNotExist:
            print("Error: couldnt find connection")
            return
        
    try:
        message = Message.objects.filter(connection=connection).filter(red = False)
        
    except Message.DoesNotExist:
        print("Error: couldnt find message")
        return 
      
    if message.exists:
        for m in message:
            # if message.red == False:
            #     message.red = True
            message.update(red = True)
    else:
        message = Message.objects.filter(connection=connection)
        return message
        
    # message.save()
    print("MessageRed==>", message)
        
        
    
    # Send New Message back to sender
    MessageSerializer(message, context={"user": user})

    receive_connect_list(consumer=  consumer, data =data)
    
    consumer.send_group(user.username, "message.red", data)
    
