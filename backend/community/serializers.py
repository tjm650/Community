from rest_framework import serializers
from api.serializers import UserSerializer
from .models import GroupChat, GroupCon


class ClientRequestSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = GroupCon
        fields = [
            'name',
            'users',
            'created'
        ]


class GroupJoinSerializer(serializers.ModelSerializer):
    group_chats_sender = serializers.SerializerMethodField()
    group_connect = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    
    class Meta:
        model = GroupCon
        fields = [
            'id',
            'name',
            'group_chats_sender',
            'group_connect',
            'preview',
            'updated'
        ]
        
    def get_group_chats_sender(self, obj):
        selfuser = self.context['user']
        
        values = obj.group_chats.all()
        for v in values:
                fz = v    ### The sender of the new message
                
        return UserSerializer(fz.sender).data
        
    def get_group_connect(self, obj):     
        selfuser = self.context['user']
        
        values = obj.users.all()
        for v in values:
            if v == selfuser:
                qs = v    

                
        return UserSerializer(qs).data 

    def get_preview(self, obj):
        if not hasattr(obj, 'latest_text'):
            return 'You have a new connect'
        return obj.latest_text
    
    
    def get_updated(self, obj):
        if not hasattr(obj, 'latest_created'):
            date = obj.updated
        else:
            date = obj.latest_created or obj.updated
        return date.isoformat()
    
    
    
class GroupMessageSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()
    
    class Meta:
        model = GroupChat
        fields = [
            'id',
            'is_me',
            'sender',
            'text',
            'created'
        ]
        
    def get_is_me(self, obj):
        return self.context['user'] == obj.sender
    
    def get_sender(self, obj):
        return UserSerializer(obj.sender).data
    