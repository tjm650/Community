from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import User, UserPreference, UserAnalytics, CommunityDirectory, Message, Notification, UserSession
from auserpost.models import Post, Comment
from amessages.models import Message as MessageModel

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    name = serializers.SerializerMethodField()
    is_online = serializers.ReadOnlyField()
    total_posts = serializers.ReadOnlyField()
    total_followers = serializers.ReadOnlyField()
    total_following = serializers.ReadOnlyField()
    reputation_score = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'full_name',
            'name',
            'bio', 'profession', 'prof_initial', 'program', 'service_name',
            'cell', 'location', 'website', 'profile_image', 'coverImage',
            'is_online', 'last_seen', 'verified', 'total_posts', 'total_followers',
            'total_following', 'reputation_score', 'theme_preference', 'language',
            'created_at', 'updated_at', 'profession', 'program', 'directory_status1', 'prof_initial' 
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_name(self, obj):
        first = (obj.first_name or '').strip()
        last = (obj.last_name or '').strip()
        if first and last:
            return f"{first} {last}"
        return first or last

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'confirm_password',
            'first_name', 'last_name'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('Account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include username and password')
        
        return attrs

class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = [
            'email_notifications', 'push_notifications', 'sms_notifications',
            'profile_visibility', 'show_online_status', 'allow_messages_from',
            'auto_play_videos', 'show_trending_content', 'content_language'
        ]

class UserAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnalytics
        fields = [
            'total_logins', 'last_login', 'total_session_time', 'average_session_time',
            'posts_created', 'comments_made', 'likes_given', 'likes_received',
            'connections_made', 'messages_sent', 'messages_received'
        ]
        read_only_fields = fields

class CommunityDirectorySerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    member_count = serializers.ReadOnlyField()
    post_count = serializers.ReadOnlyField()
    engagement_rate = serializers.ReadOnlyField()
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = CommunityDirectory
        fields = [
            'id', 'username', 'directory_status1', 'directory_status2', 'directory_status3',
            'full_name', 'bio', 'code', 'category', 'tags', 'location', 'website',
            'contact_info', 'public', 'agreement', 'verified', 'is_active', 'is_featured',
            'member_count', 'post_count', 'engagement_rate', 'creator',
            'profile_image', 'cover_image', 'created', 'updated'
        ]
        read_only_fields = ['id', 'created', 'updated']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    reply_to = serializers.PrimaryKeyRelatedField(queryset=Message.objects.all(), required=False)
    
    class Meta:
        model = Message
        fields = [
            'id', 'sender', 'receiver', 'message_type', 'content', 'media_url',
            'file_size', 'is_read', 'is_delivered', 'is_edited', 'is_deleted',
            'reactions', 'reply_to', 'created_at', 'updated_at', 'read_at'
        ]
        read_only_fields = ['id', 'sender', 'created_at', 'updated_at', 'read_at']

class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'recipient', 'sender', 'notification_type', 'title', 'message',
            'related_post_id', 'related_comment_id', 'related_user_id',
            'is_read', 'is_sent', 'data', 'created_at', 'read_at'
        ]
        read_only_fields = ['id', 'recipient', 'created_at', 'read_at']

class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = [
            'id', 'user', 'session_id', 'device_info', 'ip_address',
            'is_active', 'last_activity', 'created_at', 'expires_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

# Enhanced serializers for specific use cases
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'bio', 'profession', 'prof_initial',
            'program', 'service_name', 'cell', 'location', 'website',
            'theme_preference', 'language'
        ]

class CommunityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityDirectory
        fields = [
            'username', 'directory_status1', 'directory_status2', 'directory_status3',
            'bio', 'category', 'tags', 'location', 'website', 'contact_info',
            'public', 'agreement'
        ]
    
    def validate_username(self, value):
        if CommunityDirectory.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already taken')
        return value

class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['receiver', 'message_type', 'content', 'media_url', 'reply_to']
    
    def validate_receiver(self, value):
        # Check if user can send message to receiver based on privacy settings
        sender = self.context['request'].user
        receiver_prefs = UserPreference.objects.get(user=value)
        
        if receiver_prefs.allow_messages_from == 'none':
            raise serializers.ValidationError('This user does not accept messages')
        elif receiver_prefs.allow_messages_from == 'friends':
            # Check if they are connected/friends
            # This would need to be implemented based on your connection logic
            pass
        
        return value

class SearchResultSerializer(serializers.Serializer):
    users = UserSerializer(many=True)
    communities = CommunityDirectorySerializer(many=True)
    posts = serializers.ListField()  # Would need PostSerializer if you have posts
    
    def to_representation(self, instance):
        return {
            'query': instance.get('query', ''),
            'results': {
                'users': UserSerializer(instance.get('users', []), many=True).data,
                'communities': CommunityDirectorySerializer(instance.get('communities', []), many=True).data,
                'posts': instance.get('posts', [])
            },
            'total_results': instance.get('total_results', 0)
        }

# Admin serializers for admin panel
class AdminPostSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    likes_count = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'sender', 'sender_username', 'image', 'description',
            'interactions', 'likes', 'created', 'likes_count', 'interactions_count'
        ]
        read_only_fields = ['id', 'created']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_interactions_count(self, obj):
        return obj.interactions.count()

class AdminCommentSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    likes_count = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'sender', 'sender_username', 'description',
            'interactions', 'likes', 'created', 'likes_count', 'interactions_count'
        ]
        read_only_fields = ['id', 'created']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_interactions_count(self, obj):
        return obj.interactions.count()

class AdminMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = MessageModel
        fields = [
            'id', 'connection', 'sender', 'sender_username', 'image',
            'red', 'description', 'created'
        ]
        read_only_fields = ['id', 'created']

class AdminNotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    service_name = serializers.CharField(source='service.service_name', read_only=True)
    likes_count = serializers.SerializerMethodField()
    interactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id', 'sender', 'sender_username', 'service', 'service_name',
            'update_type', 'description', 'image', 'extra_data', 'likes',
            'interactions', 'created', 'likes_count', 'interactions_count'
        ]
        read_only_fields = ['id', 'created']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_interactions_count(self, obj):
        return obj.interactions.count()
