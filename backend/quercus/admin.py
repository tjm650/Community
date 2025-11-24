from django.contrib import admin
from .models import (
    QuercusConversation,
    QuercusMessage,
    QuercusSettings,
    QuercusPrompt,
    QuercusAnalytics,
    QuercusCampusResource,
    QuercusStudyPlan,
    QuercusCareerGuidance
)


@admin.register(QuercusConversation)
class QuercusConversationAdmin(admin.ModelAdmin):
    """Admin interface for Quercus AI conversations"""
    list_display = ['conversation_id', 'user', 'title', 'created_at', 'updated_at', 'is_active']
    list_filter = ['is_active', 'created_at', 'updated_at']
    search_fields = ['conversation_id', 'title', 'user__username']
    readonly_fields = ['conversation_id', 'created_at', 'updated_at']
    ordering = ['-updated_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(QuercusMessage)
class QuercusMessageAdmin(admin.ModelAdmin):
    """Admin interface for Quercus AI messages"""
    list_display = ['message_id', 'conversation', 'is_user', 'timestamp', 'content_preview']
    list_filter = ['is_user', 'timestamp']
    search_fields = ['message_id', 'content', 'conversation__conversation_id']
    readonly_fields = ['message_id', 'timestamp', 'metadata']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('conversation__user')

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = "Content Preview"


@admin.register(QuercusSettings)
class QuercusSettingsAdmin(admin.ModelAdmin):
    """Admin interface for Quercus AI user settings"""
    list_display = ['user', 'response_style', 'auto_save', 'notifications_enabled', 'study_reminders', 'campus_updates']
    list_filter = ['response_style', 'auto_save', 'notifications_enabled', 'study_reminders', 'campus_updates']
    search_fields = ['user__username']
    readonly_fields = ['created_at', 'updated_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(QuercusPrompt)
class QuercusPromptAdmin(admin.ModelAdmin):
    """Admin interface for custom AI prompts"""
    list_display = ['title', 'category', 'user', 'is_active', 'usage_count', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['title', 'prompt', 'user__username']
    readonly_fields = ['usage_count', 'created_at']
    ordering = ['-usage_count', '-created_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(QuercusAnalytics)
class QuercusAnalyticsAdmin(admin.ModelAdmin):
    """Admin interface for AI usage analytics"""
    list_display = ['user', 'date', 'total_queries', 'study_queries', 'schedule_queries', 'campus_queries', 'career_queries', 'avg_response_time']
    list_filter = ['date', 'total_queries']
    search_fields = ['user__username']
    readonly_fields = ['date', 'total_queries', 'study_queries', 'schedule_queries', 'campus_queries', 'career_queries']
    ordering = ['-date']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(QuercusCampusResource)
class QuercusCampusResourceAdmin(admin.ModelAdmin):
    """Admin interface for campus resources"""
    list_display = ['name', 'resource_type', 'location', 'building', 'room_number', 'is_active']
    list_filter = ['resource_type', 'is_active', 'building']
    search_fields = ['name', 'description', 'location', 'building']
    readonly_fields = ['created_at', 'updated_at']

    def get_queryset(self, request):
        return super().get_queryset(request)


@admin.register(QuercusStudyPlan)
class QuercusStudyPlanAdmin(admin.ModelAdmin):
    """Admin interface for AI-generated study plans"""
    list_display = ['user', 'subject', 'duration_weeks', 'difficulty_level', 'progress_percentage', 'is_completed', 'created_at']
    list_filter = ['difficulty_level', 'is_completed', 'duration_weeks', 'created_at']
    search_fields = ['user__username', 'subject']
    readonly_fields = ['created_at', 'updated_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(QuercusCareerGuidance)
class QuercusCareerGuidanceAdmin(admin.ModelAdmin):
    """Admin interface for career guidance sessions"""
    list_display = ['user', 'field_of_study', 'is_bookmarked', 'created_at']
    list_filter = ['is_bookmarked', 'created_at']
    search_fields = ['user__username', 'field_of_study', 'interests']
    readonly_fields = ['created_at', 'updated_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')
