from django.db import models
from django.conf import settings
from django.utils import timezone
import json

class QuercusConversation(models.Model):
    """Model for storing AI conversations"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_conversations')
    conversation_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.user.username} - {self.title or self.conversation_id}"

class QuercusMessage(models.Model):
    """Model for storing individual AI messages with enhanced Gemini integration"""
    conversation = models.ForeignKey(QuercusConversation, on_delete=models.CASCADE, related_name='messages')
    message_id = models.CharField(max_length=255)
    content = models.TextField()
    is_user = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)
    metadata = models.JSONField(default=dict, blank=True)  # Enhanced metadata for Gemini API

    # Enhanced fields for Gemini integration
    model_used = models.CharField(max_length=50, default='gemini-2.5-flash', help_text='Gemini model used for generation')
    tokens_used = models.IntegerField(default=0, help_text='Approximate tokens consumed')
    response_time_ms = models.IntegerField(default=0, help_text='Response time in milliseconds')
    prompt_tokens = models.IntegerField(default=0, help_text='Tokens in the prompt')
    completion_tokens = models.IntegerField(default=0, help_text='Tokens in the completion')
    total_tokens = models.IntegerField(default=0, help_text='Total tokens used')
    generation_config = models.JSONField(default=dict, blank=True, help_text='Generation parameters used')
    safety_ratings = models.JSONField(default=list, blank=True, help_text='Gemini safety ratings')
    finish_reason = models.CharField(max_length=50, blank=True, help_text='Reason generation finished')

    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['conversation', 'timestamp']),
            models.Index(fields=['model_used', 'timestamp']),
            models.Index(fields=['is_user', 'timestamp']),
        ]

    def __str__(self):
        return f"{self.conversation.user.username} - {'User' if self.is_user else 'AI'}: {self.content[:50]}"

class QuercusSettings(models.Model):
    """Model for storing user AI preferences"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_settings')
    response_style = models.CharField(max_length=50, default='concise', choices=[
        ('concise', 'Concise'),
        ('detailed', 'Detailed'),
        ('conversational', 'Conversational'),
    ])
    auto_save = models.BooleanField(default=True)
    notifications_enabled = models.BooleanField(default=True)
    study_reminders = models.BooleanField(default=True)
    campus_updates = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Quercus Settings"

class QuercusPrompt(models.Model):
    """Model for storing custom AI prompts"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_prompts', null=True, blank=True)
    title = models.CharField(max_length=255)
    prompt = models.TextField()
    category = models.CharField(max_length=100, default='general')
    is_active = models.BooleanField(default=True)
    usage_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-usage_count', '-created_at']

    def __str__(self):
        return self.title

class QuercusAnalytics(models.Model):
    """Model for tracking AI usage analytics"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_analytics')
    date = models.DateField(default=timezone.now)
    total_queries = models.IntegerField(default=0)
    study_queries = models.IntegerField(default=0)
    schedule_queries = models.IntegerField(default=0)
    campus_queries = models.IntegerField(default=0)
    career_queries = models.IntegerField(default=0)
    avg_response_time = models.FloatField(default=0.0)
    satisfaction_rating = models.FloatField(default=0.0, null=True, blank=True)

    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.total_queries} queries"

class QuercusCampusResource(models.Model):
    """Model for storing campus-specific resources and information"""
    RESOURCE_TYPES = [
        ('study_spot', 'Study Spot'),
        ('dining', 'Dining'),
        ('library', 'Library'),
        ('event_venue', 'Event Venue'),
        ('service', 'Service'),
        ('facility', 'Facility'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    resource_type = models.CharField(max_length=50, choices=RESOURCE_TYPES)
    location = models.CharField(max_length=255, blank=True)
    building = models.CharField(max_length=255, blank=True)
    room_number = models.CharField(max_length=50, blank=True)
    operating_hours = models.JSONField(default=dict, blank=True)  # Store as dict
    contact_info = models.JSONField(default=dict, blank=True)
    tags = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.get_resource_type_display()})"

class QuercusStudyPlan(models.Model):
    """Model for storing AI-generated study plans"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_study_plans')
    subject = models.CharField(max_length=255)
    duration_weeks = models.IntegerField()
    difficulty_level = models.CharField(max_length=50, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    plan_data = models.JSONField()  # Store the complete study plan
    is_completed = models.BooleanField(default=False)
    progress_percentage = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.subject} ({self.duration_weeks} weeks)"

class QuercusCareerGuidance(models.Model):
    """Model for storing career guidance sessions"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quercus_career_guidance')
    field_of_study = models.CharField(max_length=255)
    interests = models.TextField()
    guidance_data = models.JSONField()
    follow_up_questions = models.JSONField(default=list, blank=True)
    is_bookmarked = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.field_of_study} Career Guidance"
