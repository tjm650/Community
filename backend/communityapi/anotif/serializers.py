from rest_framework import serializers

from api.models import CommunityDirectory
from api.serializers import CommunityDirectorySerializer, UserSerializer
from .models import Notif, Comment, Poll


class NotifSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()
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
        model = Notif
        fields = [
            "id",
            "sender",
            "service",
            "update_type",
            "description",
            "image",
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
            "extra_data"
        ]

    def get_sender(self, obj):
        return UserSerializer(obj.sender).data

    def get_service(self, obj):
        return CommunityDirectorySerializer(obj.service).data

    def get_likes(self, obj):
        selfuser = self.context["user"]

        values = obj.likes.all()
        for v in values:
            # if v == selfuser:
            return UserSerializer(v).data

    def get_likes_count(self, obj):
        selfuser = self.context["user"]

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
        comments = obj.notif_comments.all().order_by("-created")[:3]  # Get latest 3 comments
        return CommentSerializer(comments, many=True, context=self.context).data

    def get_comments_count(self, obj):
        return obj.notif_comments.all().count()

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
        comments = obj.notif_comments.all().count()
        likes = obj.likes.all().count()
        values = interactions + likes + comments
        return values

    def get_post(self, obj):
        return print("get_post-->:", obj)  # NotifSerializer(obj.post).data


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


class PollSerializer(serializers.ModelSerializer):
    """Serializer for Poll model with comprehensive poll data"""
    notification = NotifSerializer(read_only=True)
    update_type = serializers.CharField(read_only=True)
    time_remaining = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()
    is_active_computed = serializers.SerializerMethodField()
    vote_statistics = serializers.SerializerMethodField()
    vote_distribution = serializers.SerializerMethodField()
    winner_options = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = [
            'notification',
            'update_type',
            'title',
            'poll_question',
            'poll_type',
            'category',
            'visibility',
            'poll_sections',
            'images',
            'settings',
            'duration_hours',
            'expires_at',
            'total_votes',
            'total_voters',
            'unique_voter_count',
            'is_active',
            'expired',
            'allow_comments',
            'allow_multiple_votes',
            'anonymous_voting',
            'hide_results_until_expired',
            'show_results_after_vote',
            'send_reminders',
            'reminder_frequency_hours',
            'tags',
            'created_at',
            'updated_at',
            'time_remaining',
            'is_expired',
            'is_active_computed',
            'vote_statistics',
            'vote_distribution',
            'winner_options',
        ]

    def get_time_remaining(self, obj):
        return obj.time_remaining

    def get_is_expired(self, obj):
        return obj.is_expired

    def get_is_active_computed(self, obj):
        return obj.is_active_computed

    def get_vote_statistics(self, obj):
        return obj.vote_statistics

    def get_vote_distribution(self, obj):
        return obj.get_vote_distribution()

    def get_winner_options(self, obj):
        return obj.get_winner_options()
