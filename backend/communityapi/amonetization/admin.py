from django.contrib import admin
from .models import (
    Accommodation,
    Marketing,
    LibraryMarketing,
    CampusMap,
    OnlineTransaction,
    LostItem,
    FoundItem,
    LostFoundMatch,
    LostFoundReward,
    ServiceGuide,
    ServiceDocument,
    ServiceGuideSearch,
    ServiceGuideAnalytics,
)


@admin.register(Marketing)
class MarketingAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "owner", "price", "currency", "active", "created_at")
    list_filter = ("active", "currency")
    search_fields = ("title", "description")


@admin.register(LibraryMarketing)
class LibraryMarketingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "owner",
        "access_level",
        "downloads",
        "active",
        "created_at",
    )
    list_filter = ("access_level", "active")
    search_fields = ("title", "description")


@admin.register(CampusMap)
class CampusMapAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "building", "floor", "active", "created_at")
    search_fields = ("name", "building")


@admin.register(Accommodation)
class AccommodationAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "sender", "price", "currency", "created_at")
    search_fields = ("title", "description", "sender__username")


@admin.register(OnlineTransaction)
class OnlineTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "provider",
        "provider_location",
        "geo_lat",
        "geo_lng",
        "method",
        "description",
        "active",
        "metadata",
        "created_at",
        "updated_at",
    )
    search_fields = ("provider__username", "method", "provider_location")


@admin.register(LostItem)
class LostItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "reporter",
        "category",
        "location",
        "status",
        "is_premium",
        "reward_offered",
        "currency",
        "views",
        "created_at",
    )
    list_filter = ("status", "is_premium", "category", "currency")
    search_fields = ("title", "description", "reporter__username", "location")
    readonly_fields = ("views", "created_at", "updated_at")


@admin.register(FoundItem)
class FoundItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "reporter",
        "category",
        "location",
        "status",
        "is_premium",
        "views",
        "created_at",
    )
    list_filter = ("status", "is_premium", "category")
    search_fields = ("title", "description", "reporter__username", "location")
    readonly_fields = ("views", "created_at", "updated_at")


@admin.register(LostFoundMatch)
class LostFoundMatchAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "lost_item",
        "found_item",
        "match_confidence",
        "matched_by",
        "status",
        "created_at",
    )
    list_filter = ("status", "match_confidence")
    search_fields = ("lost_item__title", "found_item__title", "matched_by__username")


@admin.register(LostFoundReward)
class LostFoundRewardAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "lost_item",
        "found_item",
        "reporter_reward",
        "finder_reward",
        "currency",
        "status",
        "created_at",
    )
    list_filter = ("status", "currency")
    search_fields = ("lost_item__title", "found_item__title")


@admin.register(ServiceGuide)
class ServiceGuideAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "service_name",
        "service_type",
        "department",
        "contact_person",
        "contact_email",
        "is_verified",
        "is_active",
        "views",
        "created_at",
    )
    list_filter = ("service_type", "is_verified", "is_active", "department")
    search_fields = ("service_name", "description", "contact_person", "contact_email", "department")
    readonly_fields = ("views", "created_at", "updated_at")


@admin.register(ServiceDocument)
class ServiceDocumentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "service_guide",
        "file_size",
        "version",
        "is_current",
        "processing_status",
        "uploaded_by",
        "created_at",
    )
    list_filter = ("is_current", "processing_status", "version", "uploaded_via_email")
    search_fields = ("title", "description", "service_guide__service_name")
    readonly_fields = ("file_size", "is_processed", "extracted_text", "created_at", "updated_at")


@admin.register(ServiceGuideSearch)
class ServiceGuideSearchAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "query",
        "confidence_score",
        "user",
        "created_at",
    )
    list_filter = ("confidence_score", "created_at")
    search_fields = ("query", "response", "user__username")
    readonly_fields = ("created_at",)


@admin.register(ServiceGuideAnalytics)
class ServiceGuideAnalyticsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "service_guide",
        "date",
        "views",
        "searches",
        "document_downloads",
        "unique_visitors",
        "avg_confidence_score",
    )
    list_filter = ("date", "service_guide__service_type")
    search_fields = ("service_guide__service_name",)
    readonly_fields = ("created_at", "updated_at")
