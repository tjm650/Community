from rest_framework import serializers

from api.serializers import UserSerializer
from api.models import User, CommunityDirectory
from .models import Connection


class RequestSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Connection
        fields = ["sender", "receiver", "created"]


class FriendSerializer(serializers.ModelSerializer):
    connect = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    is_sender = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    preview_red = serializers.SerializerMethodField()

    class Meta:
        model = Connection
        fields = [
            "id",
            "connect",
            "preview",
            "updated",
            "is_sender",
            "image",
            "preview_red",
        ]

    def get_connect(self, obj):
        # If we are the sender

        if self.context["user"] == obj.sender:
            return UserSerializer(obj.receiver).data

        # If I'm the receiver
        if self.context["user"] == obj.receiver:
            return UserSerializer(obj.sender).data

        else:
            print("Error: No user found in Connects Serializer")

    def get_is_sender(self, obj):
        # If we are the sender
        if not hasattr(obj, "preview_sender"):
            return UserSerializer(obj.sender).data
        else:
            return obj.preview_sender

    def get_image(self, obj):
        if not hasattr(obj, "image"):
            return False
        elif hasattr(obj, "image"):
            val  = obj.image
            if val: 
                return True

    def get_preview(self, obj):
        # val = obj.latest_text
        if not hasattr(obj, "latest_text"):
            return "New Connection"
        else:
            print("obj.latest_text--->", obj.latest_text)
            return obj.latest_text

    def get_preview_red(self, obj):
        # val = obj.latest_text
        if not hasattr(obj, "latest_text"):
            return True
        else:
            return obj.latest_red

    def get_updated(self, obj):
        if not hasattr(obj, "latest_created"):
            date = obj.updated
        else:
            date = obj.latest_created or obj.updated
        return date.isoformat()
