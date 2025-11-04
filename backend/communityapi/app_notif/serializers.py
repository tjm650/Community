
from rest_framework import serializers

from .models import AppNotif, AppReport, AppFeedback
from api.serializers import UserSerializer, CommunityDirectorySerializer



class AppNotifSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    sender_user = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    interactions = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()
    user_interacted = serializers.SerializerMethodField()

     
    class Meta:
        model = AppNotif
        fields = [
            'id',
            'sender',
            'sender_user',
            'receiver',
            'subject',
            'description',
            'image',
            'interactions',
            'interactions_count',
            'user_interacted',
            'created',
        ]
        
    def get_sender(self, obj):
        return CommunityDirectorySerializer(obj.sender).data
    
    def get_sender_user(self, obj):
        return UserSerializer(obj.sender_user).data
    
    
    def get_receiver(self, obj):
        selfuser = self.context["user"]
        values = obj.receiver.all()
        return UserSerializer(values, many=True).data

        
    
    def get_interactions_count(self, obj):
        values = obj.interactions.all().count()
        return values
    
    def get_interactions(self, obj):
        values = obj.interactions.all()
        return UserSerializer(values, many=True).data


    def get_user_interacted(self, obj):
        selfuser = self.context["user"]

        values = obj.interactions.all()
        for v in values:
            if selfuser == v:
                val = True
                return val
            
    
    
class AppReportSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    attendand = serializers.SerializerMethodField()
    red_by = serializers.SerializerMethodField()
    
     
    class Meta:
        model = AppReport
        fields = [
            'id',
            'sender',
            'attendand',
            'subject',
            'description',
            'red_by',
            'image',
            'red_by',
            'created',
        ]
        
    def get_sender(self, obj):
        return UserSerializer(obj.sender).data
    
    def get_red_by(self, obj):
        selfuser = self.context["user"]
        values = obj.red_by.all() 
        return UserSerializer(values, many=True).data

    
    def get_attendand(self, obj):
        values= obj.attendand.all()  # Get latest attandand 
        return UserSerializer(values, many=True).data
    
class AppFeedbackSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    attendand = serializers.SerializerMethodField()
    red_by = serializers.SerializerMethodField()
    
     
    class Meta:
        model = AppFeedback
        fields = [
            'id',
            'sender',
            'red_by',
            'attendand',
            'description',
            'image',
            'red_by',
            'created',
        ]
        
    def get_sender(self, obj):
        return UserSerializer(obj.sender).data
    
    def get_red_by(self, obj):
        selfuser = self.context["user"]
        values = obj.red_by.all() 
        return UserSerializer(values, many=True).data

    
    def get_attendand(self, obj):
        values= obj.attendand.all()  # Get latest attandand 
        return UserSerializer(values, many=True).data