from rest_framework import serializers

from api.serializers import CommunityDirectorySerializer, UserSerializer
from .models import Bloger


class BlogSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    tags_count = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()
    shared = serializers.SerializerMethodField()
    shared_count = serializers.SerializerMethodField()
    interactions = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()
    user_interacted = serializers.SerializerMethodField()
    user_shared = serializers.SerializerMethodField()
    total_interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Bloger
        fields = [
            'id',
            "sender",
            "image",
            "description",
            "tags",
            "tags_count",
            "service",
            "created",
            "interactions",
            "interactions_count",
            "user_interacted",
            "shared",
            "shared_count",
            "user_shared",
            "total_interactions_count"
        ]

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_service(self, obj):
        return CommunityDirectorySerializer(obj.service).data
    
    
    def get_tags(self, obj):
        values = obj.tags.all() 
        return UserSerializer(values, many=True).data


    def get_tags_count(self, obj):
        values = obj.tags.all().count()
        return values

    def get_interactions(self, obj):
        values = obj.interactions.all()
        for v in values:   
            return UserSerializer(v).data

    def get_interactions_count(self, obj): 
        values = obj.interactions.all().count()
        return values
    def get_shared(self, obj):
        values = obj.shared.all()
        for v in values:
            return UserSerializer(v).data

    def get_shared_count(self, obj):
        values = obj.shared.all().count()
        return values

    def get_user_interacted(self, obj):
        selfuser = self.context["user"]

        values = obj.interactions.all()
        for v in values:
            if selfuser == v:
                val = True
                return val
            elif selfuser != v:
                return None
        return

    def get_user_shared(self, obj):
        selfuser = self.context["user"]

        values = obj.shared.all()
        for v in values:
            if selfuser == v:
                val = True
                return val
            elif selfuser != v:
                return None
        return

    def get_total_interactions_count(self, obj):
        interactions = obj.interactions.all().count()
        shared = obj.shared.all().count()
        values = interactions + shared
        return values
