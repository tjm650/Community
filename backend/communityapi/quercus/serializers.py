from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    QuercusConversation,
    QuercusMessage,
    QuercusSettings,
    QuercusAnalytics,
    QuercusCampusResource,
    QuercusStudyPlan,
    QuercusCareerGuidance
)
 
User = get_user_model()

class QuercusMessageSerializer(serializers.ModelSerializer):
    """Enhanced serializer for Quercus AI messages with Gemini integration"""
    conversation_title = serializers.CharField(source='conversation.title', read_only=True)
    is_user_display = serializers.SerializerMethodField()
    model_display = serializers.CharField(source='model_used', read_only=True)
    usage_summary = serializers.SerializerMethodField()

    class Meta:
        model = QuercusMessage
        fields = [
            'id', 'message_id', 'conversation', 'conversation_title',
            'content', 'is_user', 'is_user_display', 'timestamp',
            'metadata', 'model_used', 'model_display', 'tokens_used',
            'response_time_ms', 'prompt_tokens', 'completion_tokens',
            'total_tokens', 'generation_config', 'safety_ratings',
            'finish_reason', 'usage_summary'
        ]
        read_only_fields = [
            'id', 'message_id', 'timestamp', 'model_used', 'tokens_used',
            'response_time_ms', 'prompt_tokens', 'completion_tokens',
            'total_tokens', 'generation_config', 'safety_ratings', 'finish_reason'
        ]

    def get_is_user_display(self, obj):
        return "You" if obj.is_user else "Quercus AI"

    def get_usage_summary(self, obj):
        """Get usage summary for the message"""
        if obj.total_tokens > 0:
            return {
                'total_tokens': obj.total_tokens,
                'prompt_tokens': obj.prompt_tokens,
                'completion_tokens': obj.completion_tokens,
                'estimated_cost': round((obj.total_tokens / 1000) * 0.0005, 6)  # Approximate Gemini pricing
            }
        return None


class QuercusConversationSerializer(serializers.ModelSerializer):
    """Serializer for Quercus AI conversations"""
    message_count = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    preview_text = serializers.SerializerMethodField()

    class Meta:
        model = QuercusConversation
        fields = [
            'id', 'conversation_id', 'user', 'title',
            'is_active',
            'created_at', 'updated_at', 'message_count', 'last_message', 'preview_text'
        ]
        read_only_fields = ['id', 'conversation_id', 'created_at', 'updated_at']

    def get_message_count(self, obj):
        return obj.messages.count()

    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-timestamp').first()
        if last_msg:
            return QuercusMessageSerializer(last_msg).data
        return None

    def get_preview_text(self, obj):
        last_msg = obj.messages.filter(is_user=True).order_by('-timestamp').first()
        if last_msg:
            content = last_msg.content
            return content[:50] + "..." if len(content) > 50 else content
        return "New conversation"


class QuercusConversationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new conversations"""

    class Meta:
        model = QuercusConversation
        fields = ['title']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class QuercusSettingsSerializer(serializers.ModelSerializer):
    """Serializer for Quercus AI settings"""

    class Meta:
        model = QuercusSettings
        fields = [
            'id', 'user', 'response_style', 'auto_save_conversations',
            'notifications_enabled', 'sound_enabled', 'typing_indicator_enabled',
            'max_tokens_per_response', 'temperature', 'context_memory_length',
            'preferred_language', 'campus_specific_features', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class QuercusAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for Quercus AI analytics"""

    class Meta:
        model = QuercusAnalytics
        fields = [
            'id', 'user', 'total_conversations', 'total_messages',
            'total_ai_responses', 'average_response_time', 'most_used_features',
            'favorite_contexts', 'total_tokens_used', 'conversations_archived',
            'settings_updated_count', 'last_activity', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class QuercusCampusResourceSerializer(serializers.ModelSerializer):
    """Serializer for campus resources"""

    class Meta:
        model = QuercusCampusResource
        fields = [
            'id', 'resource_id', 'name', 'resource_type', 'category',
            'description', 'location', 'contact_info', 'availability_hours',
            'website_url', 'is_active', 'is_featured', 'tags', 'metadata',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'resource_id', 'created_at', 'updated_at']


class QuercusStudyPlanSerializer(serializers.ModelSerializer):
    """Serializer for study plans"""

    class Meta:
        model = QuercusStudyPlan
        fields = [
            'id', 'plan_id', 'user', 'title', 'subject', 'description',
            'duration_weeks', 'difficulty_level', 'current_week', 'is_completed',
            'is_active', 'progress_percentage', 'study_materials', 'weekly_goals',
            'achievements', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'plan_id', 'created_at', 'updated_at']


class QuercusCareerGuidanceSerializer(serializers.ModelSerializer):
    """Serializer for career guidance"""

    class Meta:
        model = QuercusCareerGuidance
        fields = [
            'id', 'guidance_id', 'user', 'field_of_interest', 'current_education_level',
            'target_career', 'skills_assessment', 'career_paths', 'recommended_courses',
            'skill_gaps', 'action_plan', 'timeline', 'resources', 'progress_tracking',
            'is_completed', 'is_active', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'guidance_id', 'created_at', 'updated_at']


# Response serializers for API endpoints
class QuercusAIResponseSerializer(serializers.Serializer):
    """Serializer for AI response data"""
    response = serializers.CharField()
    conversation_id = serializers.CharField()
    message_id = serializers.CharField()
    context = serializers.CharField()
    tokens_used = serializers.IntegerField(required=False)
    processing_time = serializers.FloatField(required=False)
    success = serializers.BooleanField(default=True)


class QuercusConversationListSerializer(serializers.Serializer):
    """Serializer for conversation list response"""
    conversations = QuercusConversationSerializer(many=True)
    total_count = serializers.IntegerField()
    success = serializers.BooleanField(default=True)


class QuercusCampusInfoSerializer(serializers.Serializer):
    """Serializer for campus information response"""
    resources = QuercusCampusResourceSerializer(many=True)
    total_count = serializers.IntegerField()
    categories = serializers.ListField()
    success = serializers.BooleanField(default=True)


class QuercusStudyPlanResponseSerializer(serializers.Serializer):
    """Serializer for study plan response"""
    plan = QuercusStudyPlanSerializer()
    success = serializers.BooleanField(default=True)


class QuercusCareerGuidanceResponseSerializer(serializers.Serializer):
    """Serializer for career guidance response"""
    guidance = QuercusCareerGuidanceSerializer()
    success = serializers.BooleanField(default=True)


class QuercusSettingsResponseSerializer(serializers.Serializer):
    """Serializer for settings response"""
    settings = QuercusSettingsSerializer()
    success = serializers.BooleanField(default=True)


class QuercusErrorSerializer(serializers.Serializer):
    """Serializer for error responses"""
    error = serializers.CharField()
    error_code = serializers.CharField(required=False)
    success = serializers.BooleanField(default=False)


# Enhanced serializers for Gemini integration features

class QuercusImageAnalysisSerializer(serializers.Serializer):
    """Serializer for image analysis requests"""
    image_data = serializers.CharField(required=True)
    prompt = serializers.CharField(default='Analyze this image and provide helpful insights')
    context = serializers.CharField(default='image_analysis')
    conversation_id = serializers.CharField(required=False)

    def validate_image_data(self, value):
        """Validate image data format"""
        if not value or len(value) < 100:  # Basic validation
            raise serializers.ValidationError("Invalid image data provided")
        return value


class QuercusDocumentAnalysisSerializer(serializers.Serializer):
    """Serializer for document analysis requests"""
    document_data = serializers.CharField(required=True)
    document_type = serializers.CharField(default='text')
    prompt = serializers.CharField(default='Analyze this document and provide insights')
    context = serializers.CharField(default='document_analysis')
    conversation_id = serializers.CharField(required=False)

    def validate_document_data(self, value):
        """Validate document data"""
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Document data cannot be empty")
        return value


class QuercusConversationSummarySerializer(serializers.Serializer):
    """Serializer for conversation summary responses"""
    conversation_id = serializers.CharField()
    title = serializers.CharField()
    message_count = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    last_activity = serializers.DateTimeField()
    overall_summary = serializers.CharField()
    key_topics = serializers.ListField(child=serializers.CharField())
    insights = serializers.ListField(child=serializers.CharField())
    action_items = serializers.ListField(child=serializers.CharField())
    sentiment = serializers.CharField()
    helpfulness_score = serializers.IntegerField()


class QuercusConversationInsightsSerializer(serializers.Serializer):
    """Serializer for conversation insights responses"""
    conversation_id = serializers.CharField()
    title = serializers.CharField()
    message_count = serializers.IntegerField()
    user_messages = serializers.IntegerField()
    ai_messages = serializers.IntegerField()
    duration = serializers.FloatField()
    avg_response_length = serializers.IntegerField()
    learning_progression = serializers.CharField()
    knowledge_gaps = serializers.ListField(child=serializers.CharField())
    study_patterns = serializers.ListField(child=serializers.CharField())
    question_quality = serializers.CharField()
    engagement_level = serializers.CharField()
    suggested_improvements = serializers.ListField(child=serializers.CharField())
    key_learning_moments = serializers.ListField(child=serializers.CharField())
    recommended_resources = serializers.ListField(child=serializers.CharField())
    confidence_indicators = serializers.ListField(child=serializers.CharField())
    areas_for_focus = serializers.ListField(child=serializers.CharField())


class QuercusAnalyticsSummarySerializer(serializers.Serializer):
    """Enhanced serializer for analytics summary"""
    period_days = serializers.IntegerField()
    total_queries = serializers.IntegerField()
    total_conversations = serializers.IntegerField()
    avg_queries_per_day = serializers.FloatField()
    most_active_context = serializers.CharField()
    total_study_queries = serializers.IntegerField()
    total_campus_queries = serializers.IntegerField()
    total_career_queries = serializers.IntegerField()
    total_schedule_queries = serializers.IntegerField()
    cost_estimate = serializers.DictField()


class QuercusSuggestionsSerializer(serializers.Serializer):
    """Serializer for AI-powered suggestions"""
    suggestions = serializers.ListField(child=serializers.DictField())
    context = serializers.CharField()


class QuercusExportRequestSerializer(serializers.Serializer):
    """Serializer for conversation export requests"""
    conversation_ids = serializers.ListField(child=serializers.CharField())
    format = serializers.ChoiceField(choices=['json', 'txt'], default='json')


class QuercusExportResponseSerializer(serializers.Serializer):
    """Serializer for conversation export responses"""
    export_data = serializers.CharField()
    filename = serializers.CharField()
    format = serializers.CharField()
    conversation_count = serializers.IntegerField()
    success = serializers.BooleanField(default=True)