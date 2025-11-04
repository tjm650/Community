from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce

from api.serializers import UserSerializer, SearchResultSerializer
from afollows.serializers import FriendSerializer, RequestSerializer
from afollows.models import Connection
from api.models import User
from amessages.models import  Message
from amessages.serializers import  MessageSerializer


#--------------------------------------------------------------
#                    receive_request_connect
#--------------------------------------------------------------   
def receive_request_connect(consumer, data):
    user = consumer.scope['user']
    username = data.get('username')
    
     # Attempt to  Fetch the receiving data
    try:
            receiver = User.objects.get(username=username)
    except User.DoesNotExist:
            print("Error: User not found")
            return

        # Create Connection
    connection, _ = Connection.objects.get_or_create(
            sender=consumer.scope['user'],
            receiver=receiver
        )

        # Serialized Connection
    serialized = RequestSerializer(connection)
    print("Sender: ", connection.sender.username, " & ", "Receiver: ", connection.receiver.username)
        # Send Ba ck to Sender
    consumer.send_group(
            connection.sender.username, 'request.connect', serialized.data
        )
        # Send to Receiver
    consumer.send_group(
            connection.receiver.username, 'request.connect', serialized.data
        )
    
    # consumer.send_group(user.username, 'message.send', data)
     
  
#--------------------------------------------------------------
#                    receive_request_list
#--------------------------------------------------------------   
def receive_request_list(consumer, data):
    user = consumer.scope['user']
    username = data.get('username')
    
     # Get connection made to this user
    connections = Connection.objects.filter(
            receiver=user,
            accepted=False
        )
    serialised = RequestSerializer(connections, many=True)

        # Send request list back to the user
    consumer.send_group(user.username, 'request.list', serialised.data)
    
    
#--------------------------------------------------------------
#                    receive_request_accept
#--------------------------------------------------------------            
def receive_request_accept(consumer , data):
        username = data.get('username')
               
        # Fetch Connection object
        try:
            connection = Connection.objects.get(
                sender__username=username,
                receiver=consumer.scope['user']
            )
            
        except Connection.DoesNotExist:
            print("Error: Connection doesn't exist")
            return
        try:
            user = User.objects.get(username = username)
        except User.DoesNotExist:
            print("Error: User doesn't exist")
            return
        
        # Update Connection
        connection.accepted = True
        connection.save()
        
        # Serialise Data
        Serialised = RequestSerializer(connection)
        
        # Send accepted request to sender
        consumer.send_group(
            connection.sender.username, 'request.accept', Serialised.data
        )
        
        # Send accepted request to receiver
        consumer.send_group(
            connection.receiver.username, 'request.accept', Serialised.data
        )
        
        # Send new friend object to sender
        serialized_friend = FriendSerializer(
            connection,
            context={
                'user': connection.sender
            }
        )
        consumer.send_group(connection.sender.username, 'connect.new', serialized_friend.data)
        
         # Send new friend object to receiver
        serialized_friend = FriendSerializer(
            connection,
            context={
                'user': connection.receiver
            }
        )
        consumer.send_group(connection.receiver.username, 'connect.new', serialized_friend.data)
        
        
        
        
        
        
        
        
        
        
        
        
        


#--------------------------------------------------------------
#                    receive_connect_list
#--------------------------------------------------------------
def receive_connect_list(consumer, data): 
    user = consumer.scope['user']
    
            # Latest message subquery
    latest_message = Message.objects.filter(
            connection=OuterRef('id')
        ).order_by('-created')[:1]
        
        
        
        # Get Connection for user
    connection = Connection.objects.filter(
            Q(sender=user) | Q(receiver=user),
            accepted=True
        ).annotate(
            latest_text=latest_message.values('description'),
            latest_red=latest_message.values('red'),
            image=latest_message.values('image'),
            preview_sender=latest_message.values('sender'),
            latest_created=latest_message.values('created')
        ).order_by(
            Coalesce('latest_created', 'image', 'preview_sender', 'latest_red', 'latest_text',  'updated').desc()
        )
        
    print("connection", connection)
        
              
        # Serialize Data 
    serialised = FriendSerializer(
            connection, 
            context={
                'user': user
            },
            many=True
            )
        
        # Send Back to the requesting user
    consumer.send_group(
            user.username, 'connect.list', serialised.data
        )
    
    
    
     
      
#--------------------------------------------------------------
#                    receive_search
#--------------------------------------------------------------   
def receive_search(consumer, data):
    user = consumer.scope['user']
    query = data.get('query')

        # Get all users from query search terms
    users = User.objects.filter(
            Q(username__istartswith=query) |
            Q(email__istartswith=query)

        ).exclude(
            username=consumer.username
        ).annotate(
            pending_them=Exists(
                Connection.objects.filter(
                    sender=consumer.scope['user'],
                    receiver=OuterRef('id'),
                    accepted=False
                )
            ),
            pending_me=Exists(
                Connection.objects.filter(
                    sender=OuterRef('id'),
                    receiver=consumer.scope['user'],
                    accepted=False
                )
            ),
            connected=Exists(
                Connection.objects.filter(
                    Q(sender=consumer.scope['user'], receiver=OuterRef('id')) |
                    Q(receiver=consumer.scope['user'], sender=OuterRef('id')),
                    accepted=True
                )
            ) 
        )

        # serialize results
    serialized = SearchResultSerializer(users, many=True)

        # Send search results back to this user
    consumer.send_group(consumer.username, 'search', serialized.data)
    print("Search.data: ", consumer.send_group(consumer.username, 'search', serialized.data))











#--------------------------------------------------------------
#                    receive_request_delete
#--------------------------------------------------------------            
def receive_request_delete(consumer , data):
        username = data.get('username')
               
        # Fetch Connection object
        try:
            connection = Connection.objects.get(
                sender__username=username,
                receiver=consumer.scope['user']
            )
            
        except Connection.DoesNotExist:
            print("Error: Connection doesn't exist")
            return
        try:
            user = User.objects.get(username = username)
        except User.DoesNotExist:
            print("Error: User doesn't exist")
            return
        
        # Update Connection
        # connection.accepted = False
        connection.delete()
        
        # Serialise Data
        Serialised = RequestSerializer(connection)
        
        # Send accepted request to sender
        consumer.send_group(
            connection.sender.username, 'request.delete', Serialised.data
        )
        
        # Send accepted request to receiver
        consumer.send_group(
            connection.receiver.username, 'request.delete', Serialised.data
        )
        
    