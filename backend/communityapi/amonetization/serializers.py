from rest_framework import serializers
from .models import (
    Marketing,
    LibraryMarketing,
    CampusMap,
    Accommodation,
    LostItem,
    FoundItem,
    LostFoundMatch,
    LostFoundReward,
    PageVisit,
    MonetizationAnalytics,
    ServiceGuide,
    ServiceDocument,
    ServiceGuideSearch,
    ServiceGuideAnalytics
)
from api.serializers import UserSerializer


class MarketingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marketing
        fields = [
            "id",
            "owner",
            "title",
            "description",
            "media",
            "price",
            "currency",
            "category",
            "tags",
            "external_link",
            "contact_email",
            "contact_phone",
            "views",
            "active",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "owner", "views", "created_at", "updated_at"]


class LibraryMarketingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryMarketing
        fields = [
            "id",
            "owner",
            "title",
            "description",
            "files",
            "tags",
            "access_level",
            "downloads",
            "active",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "owner", "downloads", "created_at", "updated_at"]


class CampusMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusMap
        fields = [
            "id",
            "name",
            "description",
            "geo_lat",
            "geo_lng",
            "building",
            "floor",
            "floor_plan_url",
            "opening_hours",
            "accessibility",
            "contact",
            "active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class AccommodationSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    
    class Meta:
        model = Accommodation
        fields = [
            "id",
            "sender",
            "title",
            "description",
            "price",
            "currency",
            "images",
            "geo_lat",
            "geo_lng",
            "location",
            "phone",
            "inquiries",
            "virtual_views",
            "verify_badge",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "sender", "inquiries", "virtual_views", "verify_badge", "created_at", "updated_at"]
        
    def get_sender(self, obj):
        return UserSerializer(obj.sender).data


class OnlineTransactionSerializer(serializers.ModelSerializer):
    provider = serializers.SerializerMethodField()
    
    class Meta:
        model = getattr(__import__("amonetization.models", fromlist=["OnlineTransaction"]), "OnlineTransaction")
        fields = [
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
        ]
        read_only_fields = ["id", "provider", "created_at", "updated_at"]
        
    def get_provider(self, obj):
        return UserSerializer(obj.provider).data


class LostItemSerializer(serializers.ModelSerializer):
    reporter = serializers.SerializerMethodField()
    reported_by = serializers.SerializerMethodField()

    class Meta:
        model = LostItem
        fields = [
            "id",
            "reporter",
            "title",
            "description",
            "category",
            "location",
            "date_lost",
            "images",
            "reward_offered",
            "currency",
            "contact_info",
            "status",
            "is_premium",
            "views",
            "reported_by",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "reporter", "views", "reported_by", "created_at", "updated_at"]

    def get_reporter(self, obj):
        return UserSerializer(obj.reporter).data

    def get_reported_by(self, obj):
        if obj.reported_by:
            return UserSerializer(obj.reported_by).data
        return None


class FoundItemSerializer(serializers.ModelSerializer):
    reporter = serializers.SerializerMethodField()
    reported_by = serializers.SerializerMethodField()

    class Meta:
        model = FoundItem
        fields = [
            "id",
            "reporter",
            "title",
            "description",
            "category",
            "location",
            "date_found",
            "images",
            "contact_info",
            "status",
            "is_premium",
            "views",
            "reported_by",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "reporter", "views", "reported_by", "created_at", "updated_at"]

    def get_reporter(self, obj):
        return UserSerializer(obj.reporter).data

    def get_reported_by(self, obj):
        if obj.reported_by:
            return UserSerializer(obj.reported_by).data
        return None


class LostFoundMatchSerializer(serializers.ModelSerializer):
    lost_item = serializers.SerializerMethodField()
    found_item = serializers.SerializerMethodField()
    matched_by = serializers.SerializerMethodField()

    class Meta:
        model = LostFoundMatch
        fields = [
            "id",
            "lost_item",
            "found_item",
            "match_confidence",
            "matched_by",
            "status",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_lost_item(self, obj):
        return LostItemSerializer(obj.lost_item).data

    def get_found_item(self, obj):
        return FoundItemSerializer(obj.found_item).data


class ServiceGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceGuide
        fields = [
            "id",
            "service_name",
            "service_type",
            "department",
            "description",
            "contact_person",
            "contact_email",
            "contact_phone",
            "location",
            "operating_hours",
            "website_url",
            "is_verified",
            "is_active",
            "views",
            "search_keywords",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "views", "created_at", "updated_at"]


class ServiceDocumentSerializer(serializers.ModelSerializer):
    service_guide = serializers.SerializerMethodField()
    uploaded_by = serializers.SerializerMethodField()

    class Meta:
        model = ServiceDocument
        fields = [
            "id",
            "service_guide",
            "title",
            "description",
            "document_file",
            "file_size",
            "is_processed",
            "extracted_text",
            "processing_status",
            "version",
            "is_current",
            "uploaded_by",
            "uploaded_via_email",
            "email_message_id",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "is_processed", "extracted_text", "created_at", "updated_at"]

    def get_service_guide(self, obj):
        return {
            "id": obj.service_guide.id,
            "service_name": obj.service_guide.service_name,
            "service_type": obj.service_guide.service_type,
        }

    def get_uploaded_by(self, obj):
        if obj.uploaded_by:
            return UserSerializer(obj.uploaded_by).data
        return None


class ServiceGuideSearchSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    relevant_documents = serializers.SerializerMethodField()

    class Meta:
        model = ServiceGuideSearch
        fields = [
            "id",
            "query",
            "response",
            "relevant_documents",
            "confidence_score",
            "user",
            "search_metadata",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_user(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return None

    def get_relevant_documents(self, obj):
        return ServiceDocumentSerializer(obj.relevant_documents.all(), many=True).data


class ServiceGuideAnalyticsSerializer(serializers.ModelSerializer):
    service_guide = serializers.SerializerMethodField()

    class Meta:
        model = ServiceGuideAnalytics
        fields = [
            "id",
            "service_guide",
            "date",
            "views",
            "searches",
            "document_downloads",
            "unique_visitors",
            "avg_confidence_score",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_service_guide(self, obj):
        return {
            "id": obj.service_guide.id,
            "service_name": obj.service_guide.service_name,
            "service_type": obj.service_guide.service_type,
        }


class PageVisitSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = PageVisit
        fields = [
            "id",
            "user",
            "page_name",
            "session_id",
            "ip_address",
            "user_agent",
            "visited_at",
        ]
        read_only_fields = ["id", "visited_at"]

    def get_user(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return None


class MonetizationAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonetizationAnalytics
        fields = [
            "id",
            "date",
            "page_name",
            "total_visits",
            "unique_visitors",
            "engagement_rate",
            "link_clicks",
            "profile_visits",
            "likes",
            "replies",
            "reposts",
            "new_followers",
            "previous_period_visits",
            "visit_change_percentage",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_matched_by(self, obj):
        if obj.matched_by:
            return UserSerializer(obj.matched_by).data
        return None


class LostFoundRewardSerializer(serializers.ModelSerializer):
    lost_item = serializers.SerializerMethodField()
    found_item = serializers.SerializerMethodField()

    class Meta:
        model = LostFoundReward
        fields = [
            "id",
            "lost_item",
            "found_item",
            "reporter_reward",
            "finder_reward",
            "currency",
            "status",
            "transaction_id",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_lost_item(self, obj):
        return LostItemSerializer(obj.lost_item).data

    def get_found_item(self, obj):
        return FoundItemSerializer(obj.found_item).data
