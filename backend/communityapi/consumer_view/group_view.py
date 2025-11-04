import json
import base64
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.files.base import ContentFile
from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce
from django.core.files.temp import NamedTemporaryFile

from community.models import GroupChat, GroupCon
from community.serializers import GroupMessageSerializer, GroupJoinSerializer
from api.serializers import  UserSerializer
from api.models import User
from afollows.models import Connection
 

#--------------------------------------------------------------
#                    receive_group_message_sent
#--------------------------------------------------------------
def receive_group_message_sent(consumer, data):
    
        user = consumer.scope['user']
        grpConnId = data.get('grpConnId')
        grpmessage_text = data.get('grpmessage')
        print("grpConnId->:",grpConnId)
    
        try:
            connection = GroupCon.objects.get(
                id = grpConnId
                
            )
        except GroupCon.DoesNotExist:
            print('Error: couldnt find connection')
            return
        
        message = GroupChat.objects.create(
            connection=connection,
            user=user,
            text=grpmessage_text
        )
        
         # Get recipient friend
        recipient = connection.users.filter()
        
        if connection.users == user:
            recipient = connection.creator
        
        # Send New Message back to sender
        serialized_message = GroupMessageSerializer(
            message,
            context={
                'user': user
            }
        )
        
        serialized_friend = UserSerializer(
            context={
                'user': recipient
            },
        )
        data = {
            'grpmessage': serialized_message.data,
            'grpconnect': serialized_friend.data
        }
        
        consumer.send_group(user.username, 'groupmessages.send', data)
        
   
        # Send New Message to receiver
        serialized_message = GroupMessageSerializer(
            message,
            context={
                'user': recipient  
            }
        )
        
        serialized_friend = UserSerializer(user)
        data = {
            'grpmessage': serialized_message.data,
            'grpconnect': serialized_friend.data
        }
        
        consumer.send_group(recipient, 'groupmessages.send', data)



#--------------------------------------------------------------
#                    receive_groupchat_list 
#--------------------------------------------------------------
def receive_groupchat_list(consumer, data):
        user = consumer.scope['user']
        grpConnId = data.get('grpConnId')
        page = data.get('page')
        
        try:
            connection = GroupCon.objects.get(
                id = grpConnId,
                 
            )
        except GroupCon.DoesNotExist:
            print('Error: couldnt find Group Connection')
            return
        
        # Get Messages
        messages = GroupChat.objects.filter(
            connection=connection,
        ).order_by('-created')
        
        # Serialized Messages
        serialized_messages = GroupMessageSerializer(
            messages,
            context={
                'user': user
            },
            many = True
        )     
        
        # Get Member
        recipient = connection.users.all()  
        
        
        # Serialise Members
        serialise_connect = UserSerializer(
            recipient,
            context={
                'user': recipient
            },
            many = True
        )
        
        
        
        
        data = {
            'grp_messages': serialized_messages.data,
            'grpconnect': serialise_connect.data
        }
        
        # Send Back to the requestor
        consumer.send_group(
            user.username, 'groupmessages.list', data
        )
        
   
   
#--------------------------------------------------------------
#                    receive_group_connect_list 
#--------------------------------------------------------------
def receive_group_connect_list(consumer, data):
        user = consumer.scope['user']
    # Latest message subquery
        latest_message = GroupChat.objects.filter(
            connection=OuterRef('id')
        ).order_by('-created')[:1]
        
        
        
        # Get Connection for user
        connection = GroupCon.objects.filter(
             Q(users=user),
        ).annotate(
            latest_sender=latest_message.values('sender'),
            latest_text=latest_message.values('text'),
            latest_created=latest_message.values('created')
        ).order_by(
            Coalesce('latest_created', 'updated').desc()
        )
            
        # Serialize Data
        serialised = GroupJoinSerializer(
            connection, 
            context={
                'user': user
            },
            many=True
            )
        
        # Send Back to the requesting user
        consumer.send_group(
            user.username, 'group_connect.list', serialised.data
        )
        
        
 