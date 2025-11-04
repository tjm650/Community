from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


# Analytics models for tracking page visits and statistics
class PageVisit(models.Model):
    """Track individual page visits by users."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    page_name = models.CharField(max_length=100)  # e.g., 'OnlineTransactions', 'AccommodationAgents'
    session_id = models.CharField(max_length=255, blank=True)  # For anonymous users
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    visited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['page_name', 'visited_at']),
            models.Index(fields=['user', 'visited_at']),
        ]

    def __str__(self):
        return f"Visit: {self.page_name} by {self.user or 'Anonymous'} at {self.visited_at}"


class MonetizationAnalytics(models.Model):
    """Store daily analytics for monetization pages."""
    date = models.DateField()
    page_name = models.CharField(max_length=100)

    # Visit statistics
    total_visits = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)

    # Engagement metrics (can be updated based on user interactions)
    engagement_rate = models.FloatField(default=0.0)  # Percentage
    link_clicks = models.IntegerField(default=0)
    profile_visits = models.IntegerField(default=0)

    # Social metrics
    likes = models.IntegerField(default=0)
    replies = models.IntegerField(default=0)
    reposts = models.IntegerField(default=0)
    new_followers = models.IntegerField(default=0)

    # Calculated fields for trends
    previous_period_visits = models.IntegerField(default=0)
    visit_change_percentage = models.FloatField(default=0.0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['date', 'page_name']
        indexes = [
            models.Index(fields=['date', 'page_name']),
            models.Index(fields=['page_name', 'date']),
        ]

    def __str__(self):
        return f"Analytics: {self.page_name} on {self.date} - {self.total_visits} visits"

    @classmethod
    def get_or_create_today(cls, page_name):
        """Get or create analytics record for today."""
        today = timezone.now().date()
        return cls.objects.get_or_create(
            date=today,
            page_name=page_name,
            defaults={'total_visits': 0, 'unique_visitors': 0}
        )

    @classmethod
    def calculate_7day_trends(cls, page_name):
        """Calculate 7-day trends for a specific page."""
        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)
        last_14_days = today - timedelta(days=14)

        # Get current 7 days data
        current_period = cls.objects.filter(
            page_name=page_name,
            date__gte=last_7_days,
            date__lt=today
        ).aggregate(
            total_visits=models.Sum('total_visits'),
            unique_visitors=models.Sum('unique_visitors')
        )

        # Get previous 7 days data
        previous_period = cls.objects.filter(
            page_name=page_name,
            date__gte=last_14_days,
            date__lt=last_7_days
        ).aggregate(
            total_visits=models.Sum('total_visits'),
            unique_visitors=models.Sum('unique_visitors')
        )

        current_visits = current_period['total_visits'] or 0
        previous_visits = previous_period['total_visits'] or 0

        # Calculate percentage change
        if previous_visits > 0:
            change_percentage = ((current_visits - previous_visits) / previous_visits) * 100
        else:
            change_percentage = 100.0 if current_visits > 0 else 0.0

        return {
            'current_visits': current_visits,
            'previous_visits': previous_visits,
            'change_percentage': round(change_percentage, 1)
        }


# New monetization models: Marketing, LibraryMarketing, CampusMap
class Marketing(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="marketing_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    media = models.JSONField(default=list, blank=True)  # images / video URLs
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default="USD")
    category = models.CharField(max_length=100, blank=True)
    tags = models.JSONField(default=list, blank=True)
    external_link = models.URLField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=40, blank=True)
    views = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Marketing: {self.title} by {self.owner}"


class LibraryMarketing(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="library_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    files = models.JSONField(default=list, blank=True)  # file URLs or identifiers
    tags = models.JSONField(default=list, blank=True)
    access_level = models.CharField(max_length=50, default="public")  # public, members, private
    downloads = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Library Item: {self.title} by {self.owner}"


class CampusMap(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    geo_lat = models.FloatField(null=True, blank=True)
    geo_lng = models.FloatField(null=True, blank=True)
    building = models.CharField(max_length=255, blank=True)
    floor = models.CharField(max_length=50, blank=True)
    floor_plan_url = models.URLField(blank=True)
    opening_hours = models.JSONField(default=dict, blank=True)
    accessibility = models.JSONField(default=dict, blank=True)
    contact = models.JSONField(default=dict, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"CampusMap: {self.name}"


# Model to represent simple online transaction/service provider entries.
class OnlineTransaction(models.Model):
    provider = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="online_transactions"
    )
    provider_location = models.CharField(max_length=512, blank=True)
    geo_lat = models.FloatField(null=True, blank=True)
    geo_lng = models.FloatField(null=True, blank=True)
    method = models.CharField(max_length=100, help_text="Transaction method, e.g. ecocash, onemoney")
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        name = (self.provider.username if self.provider else "Unknown")
        return f"OnlineTransaction: {name} ({self.method})"


# Keep Accommodation model (unchanged)
class Accommodation(models.Model):
    """Accommodation listing specialized model with images, phone, geolocation and address."""
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="accommodations")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    images = models.JSONField(default=list, blank=True)
    geo_lat = models.FloatField(null=True, blank=True)
    geo_lng = models.FloatField(null=True, blank=True)
    location = models.CharField(max_length=512, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    inquiries = models.IntegerField(default=0)
    virtual_views = models.IntegerField(default=0)
    verify_badge = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Accommodation {self.title} by {self.sender}"


# Lost and Found Models
class LostItem(models.Model):
    """Model for lost items reported by users."""
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="lost_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    date_lost = models.DateTimeField(null=True, blank=True)
    images = models.JSONField(default=list, blank=True)
    reward_offered = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default="USD")
    contact_info = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=50, default="active")  # active, resolved, expired
    is_premium = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    reported_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="reported_lost_items")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lost: {self.title} by {self.reporter}"


class FoundItem(models.Model):
    """Model for found items reported by users."""
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="found_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    date_found = models.DateTimeField(null=True, blank=True)
    images = models.JSONField(default=list, blank=True)
    contact_info = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=50, default="unclaimed")  # unclaimed, claimed, returned
    is_premium = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    reported_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="reported_found_items")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Found: {self.title} by {self.reporter}"


class LostFoundMatch(models.Model):
    """Model to track matches between lost and found items."""
    lost_item = models.ForeignKey(LostItem, on_delete=models.CASCADE, related_name="matches")
    found_item = models.ForeignKey(FoundItem, on_delete=models.CASCADE, related_name="matches")
    match_confidence = models.FloatField(default=0.0)
    matched_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, default="pending")  # pending, confirmed, rejected
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Match: {self.lost_item.title} ↔ {self.found_item.title}"


class LostFoundReward(models.Model):
    """Model to track rewards for successful lost item recovery."""
    lost_item = models.ForeignKey(LostItem, on_delete=models.CASCADE, related_name="rewards")
    found_item = models.ForeignKey(FoundItem, on_delete=models.CASCADE, related_name="rewards")
    reporter_reward = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    finder_reward = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=10, default="USD")
    status = models.CharField(max_length=50, default="pending")  # pending, paid, cancelled
    transaction_id = models.CharField(max_length=255, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reward: {self.reporter_reward} + {self.finder_reward} {self.currency}"


# Service Guide Models
class ServiceGuide(models.Model):
    """Model for service guides submitted by campus services."""
    service_name = models.CharField(max_length=255)
    service_type = models.CharField(max_length=100, help_text="e.g., Academic, Administrative, Student Services")
    department = models.CharField(max_length=255, blank=True)
    description = models.TextField(help_text="Brief description of the service")
    contact_person = models.CharField(max_length=255, blank=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=40, blank=True)
    location = models.CharField(max_length=255, blank=True)
    operating_hours = models.JSONField(default=dict, blank=True, help_text="Operating hours by day")
    website_url = models.URLField(blank=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    views = models.IntegerField(default=0)
    search_keywords = models.JSONField(default=list, blank=True, help_text="Keywords for AI search")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Service Guide: {self.service_name}"

    class Meta:
        indexes = [
            models.Index(fields=['service_type', 'is_active']),
            models.Index(fields=['is_verified', 'is_active']),
        ]


class ServiceDocument(models.Model):
    """Model for storing service guide documents (PDFs)."""
    service_guide = models.ForeignKey(ServiceGuide, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=255, help_text="Document title")
    description = models.TextField(blank=True, help_text="Document description")
    document_file = models.FileField(upload_to='service_guides/', help_text="PDF document")
    file_size = models.IntegerField(null=True, blank=True, help_text="File size in bytes")
    is_processed = models.BooleanField(default=False, help_text="Whether document has been processed for AI search")
    extracted_text = models.TextField(blank=True, help_text="Extracted text content for AI search")
    processing_status = models.CharField(max_length=50, default="pending", help_text="Document processing status")
    version = models.CharField(max_length=50, default="1.0", help_text="Document version")
    is_current = models.BooleanField(default=True, help_text="Whether this is the current version")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    uploaded_via_email = models.BooleanField(default=False, help_text="Whether uploaded via email")
    email_message_id = models.CharField(max_length=255, blank=True, help_text="Email message ID if uploaded via email")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Document: {self.title} for {self.service_guide.service_name}"

    class Meta:
        indexes = [
            models.Index(fields=['service_guide', 'is_current']),
            models.Index(fields=['is_processed', 'processing_status']),
        ]


class ServiceGuideSearch(models.Model):
    """Model for storing AI search queries and responses."""
    query = models.TextField(help_text="User search query")
    response = models.TextField(help_text="AI generated response")
    relevant_documents = models.ManyToManyField(ServiceDocument, related_name="searches", help_text="Relevant documents found")
    confidence_score = models.FloatField(default=0.0, help_text="AI confidence in response")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    search_metadata = models.JSONField(default=dict, blank=True, help_text="Additional search metadata")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Search: {self.query[:50]}... at {self.created_at}"

    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['user', 'created_at']),
        ]


class ServiceGuideAnalytics(models.Model):
    """Analytics for service guide usage."""
    service_guide = models.ForeignKey(ServiceGuide, on_delete=models.CASCADE, related_name="analytics")
    date = models.DateField()
    views = models.IntegerField(default=0)
    searches = models.IntegerField(default=0)
    document_downloads = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)
    avg_confidence_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analytics: {self.service_guide.service_name} on {self.date}"

    class Meta:
        unique_together = ['service_guide', 'date']
        indexes = [
            models.Index(fields=['service_guide', 'date']),
            models.Index(fields=['date', 'views']),
        ]
