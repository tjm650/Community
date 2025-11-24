from rest_framework import serializers

from .models import Notif_user_post_liked, Notif_user_post_commented, Notif_user
from api.serializers import UserSerializer
from auserpost.serializers import PostSerializer


class Notif_user_post_liked_serializer(serializers.ModelSerializer):
    interactor = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()

    class Meta:
        model = Notif_user_post_liked
        fields = [
            "id",
            "interactor",
            "notif_type",
            "description",
            "post",
            "created",
        ]

    def get_interactor(self, obj):
        return UserSerializer(obj.interactor).data

    def get_post(self, obj):
        post = obj.post
        return PostSerializer(post, context=self.context).data


class Notif_user_post_commented_serializer(serializers.ModelSerializer):
    interactor = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()

    class Meta:
        model = Notif_user_post_commented
        fields = [
            "id",
            "interactor",
            "notif_type",
            "description",
            "post",
            "created",
        ]

    def get_interactor(self, obj):
        return UserSerializer(obj.interactor).data

    def get_post(self, obj):
        post = obj.post
        return PostSerializer(post, context=self.context).data


class Notif_user_serializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Notif_user
        fields = [
            "id",
            "sender",
            "notif_type",
            "description",
            "related_id",
            "is_read",
            "content_type",
            "extra_data",
            "created",
        ]

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data
