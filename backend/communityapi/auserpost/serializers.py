from rest_framework import serializers

from api.serializers import UserSerializer
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    interactions = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()
    user_interacted = serializers.SerializerMethodField()
    total_interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "sender",
            "image",
            "description",
            "created",
            "likes",
            "likes_count",
            "user_liked",
            "comments",
            "comments_count",
            "interactions",
            "interactions_count",
            "user_interacted",
            "total_interactions_count",
        ]

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_likes(self, obj):

        values = obj.likes.all()
        for v in values:
            # if v == selfuser:
            return UserSerializer(v).data

    def get_likes_count(self, obj):

        values = obj.likes.all().count()
        return values

    def get_user_liked(self, obj):
        selfuser = self.context["user"]

        values = obj.likes.all()
        for v in values:
            if selfuser == v:
                val = True
                return val
            elif selfuser != v:
                return None
        return

    def get_comments(self, obj):
        comments = obj.comments.all().order_by("-created")[:3]  # Get latest 3 comments
        return CommentSerializer(comments, many=True, context=self.context).data

    def get_comments_count(self, obj):
        return obj.comments.all().count()

    def get_interactions_count(self, obj):
        values = obj.interactions.all().count()
        return values
    
    def get_interactions(self, obj):
        values = obj.interactions.all()
        for v in values:
            return UserSerializer(v).data

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

    def get_total_interactions_count(self, obj):
        interactions = obj.interactions.all().count()
        comments = obj.comments.all().count()
        likes = obj.likes.all().count()
        values = interactions + likes + comments
        return values


class CommentSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    interactions = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()
    user_interacted = serializers.SerializerMethodField()
    total_interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "sender",
            "description",
            "created",
            "likes_count",
            "user_liked",
            "interactions",
            "interactions_count",
            "user_interacted",
            "total_interactions_count",
        ]

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_likes_count(self, obj):
        return obj.likes.all().count()

    def get_user_liked(self, obj):
        user = self.context.get("user")
        if user and user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False
    
    def get_interactions(self, obj):
        values = obj.interactions.all()
        for v in values:   
            return UserSerializer(v).data

    def get_interactions_count(self, obj):
        values = obj.interactions.all().count()
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

    def get_total_interactions_count(self, obj):
        interactions = obj.interactions.all().count()
        likes = obj.likes.all().count()
        values = interactions + likes
        return values
