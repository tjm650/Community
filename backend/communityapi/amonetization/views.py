from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.utils import timezone
from django.db.models import Q
from datetime import date, timedelta
import uuid
import decimal
import django.db.models as models


# Legacy models (Listing, Transaction, Subscription, Badge, PaymentWebhookEvent)
# were removed. Views below either persist to the new models (Marketing,
# LibraryMarketing, Accommodation) or emit synthetic payloads so API clients
# continue to receive compatible responses.

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
    PageVisit,
    MonetizationAnalytics,
    ServiceGuide,
    ServiceDocument,
    ServiceGuideSearch,
    ServiceGuideAnalytics
)
from .serializers import (
    AccommodationSerializer,
    MarketingSerializer,
    LibraryMarketingSerializer,
    CampusMapSerializer,
    OnlineTransactionSerializer,
    LostItemSerializer,
    FoundItemSerializer,
    LostFoundMatchSerializer,
    LostFoundRewardSerializer,
    PageVisitSerializer,
    MonetizationAnalyticsSerializer
)


class SignedUploadUrlView(APIView):
    """Return a mock signed upload URL and public URL for a given filename."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        filename = request.data.get('filename') or f"upload-{uuid.uuid4()}"
        # In production you would generate a signed URL (S3, GCS). Here we return a mock.
        upload_id = str(uuid.uuid4())
        upload_url = f"https://example.com/uploads/{upload_id}/{filename}"
        public_url = upload_url
        return Response({"uploadUrl": upload_url, "publicUrl": public_url})


class AccommodationListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        qs = Accommodation.objects.filter().order_by("-created_at")[:100]
        ser = AccommodationSerializer(qs, many=True)
        return Response({"accommodations": ser.data})

    def post(self, request):
        payload = request.data.dict() if hasattr(request.data, 'dict') else dict(request.data)
        try:
            price = decimal.Decimal(str(payload.get("price", "0")))
        except Exception:
            return Response({"error": "Invalid price"}, status=status.HTTP_400_BAD_REQUEST)
        acc = Accommodation(
            sender=request.user,
            title=payload.get("title", ""),
            description=payload.get("description", ""),
            price=price,
            currency=payload.get("currency", "USD"),
            images=payload.get("images") or [],
            geo_lat=payload.get("geo_lat"),
            geo_lng=payload.get("geo_lng"),
            location=payload.get("location", ""),
            phone=payload.get("phone", ""),
        )
        acc.save()
        ser = AccommodationSerializer(acc)
        return Response({"ok": True, "accommodation": ser.data}, status=status.HTTP_201_CREATED)


class AccommodationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            acc = Accommodation.objects.get(pk=pk)
        except Accommodation.DoesNotExist:
            return Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)
        ser = AccommodationSerializer(acc)
        return Response({"accommodation": ser.data})

    def post(self, request, pk):
        # used for updates like incrementing views or inquiries
        action = request.data.get('action')
        try:
            acc = Accommodation.objects.get(pk=pk)
        except Accommodation.DoesNotExist:
            return Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)

        if action == 'inquiry':
            acc.inquiries = (acc.inquiries or 0) + 1
            acc.save()
            return Response({"ok": True, "inquiries": acc.inquiries})
        if action == 'virtual_view':
            acc.virtual_views = (acc.virtual_views or 0) + 1
            acc.save()
            return Response({"ok": True, "virtual_views": acc.virtual_views})

        return Response({"ok": False, "error": "unknown action"}, status=status.HTTP_400_BAD_REQUEST)

class OnlineTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = OnlineTransaction.objects.filter(active=True).order_by("-created_at")[:100]
        ser = OnlineTransactionSerializer(qs, many=True)
        return Response({"tx": ser.data})


# Lost and Found API Views
class LostItemListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        qs = LostItem.objects.filter().order_by("-created_at")[:100]
        ser = LostItemSerializer(qs, many=True)
        return Response({"lost_items": ser.data})

    def post(self, request):
        payload = request.data.dict() if hasattr(request.data, 'dict') else dict(request.data)
        try:
            reward = decimal.Decimal(str(payload.get("reward_offered", "0")))
        except Exception:
            return Response({"error": "Invalid reward amount"}, status=status.HTTP_400_BAD_REQUEST)

        lost_item = LostItem(
            reporter=request.user,
            title=payload.get("title", ""),
            description=payload.get("description", ""),
            category=payload.get("category", ""),
            location=payload.get("location", ""),
            date_lost=payload.get("date_lost"),
            images=payload.get("images") or [],
            reward_offered=reward if reward > 0 else None,
            currency=payload.get("currency", "USD"),
            contact_info=payload.get("contact_info") or {},
            status=payload.get("status", "active"),
            is_premium=payload.get("is_premium", False),
            reported_by=request.user,
            metadata=payload.get("metadata") or {},
        )
        lost_item.save()
        ser = LostItemSerializer(lost_item)
        return Response({"ok": True, "lost_item": ser.data}, status=status.HTTP_201_CREATED)


class FoundItemListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        qs = FoundItem.objects.filter().order_by("-created_at")[:100]
        ser = FoundItemSerializer(qs, many=True)
        return Response({"found_items": ser.data})

    def post(self, request):
        payload = request.data.dict() if hasattr(request.data, 'dict') else dict(request.data)

        found_item = FoundItem(
            reporter=request.user,
            title=payload.get("title", ""),
            description=payload.get("description", ""),
            category=payload.get("category", ""),
            location=payload.get("location", ""),
            date_found=payload.get("date_found"),
            images=payload.get("images") or [],
            contact_info=payload.get("contact_info") or {},
            status=payload.get("status", "unclaimed"),
            is_premium=payload.get("is_premium", False),
            reported_by=request.user,
            metadata=payload.get("metadata") or {},
        )
        found_item.save()
        ser = FoundItemSerializer(found_item)
        return Response({"ok": True, "found_item": ser.data}, status=status.HTTP_201_CREATED)


class LostItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            item = LostItem.objects.get(pk=pk)
        except LostItem.DoesNotExist:
            return Response({"error": "Lost item not found"}, status=status.HTTP_404_NOT_FOUND)
        ser = LostItemSerializer(item)
        return Response({"lost_item": ser.data})

    def post(self, request, pk):
        action = request.data.get('action')
        try:
            item = LostItem.objects.get(pk=pk)
        except LostItem.DoesNotExist:
            return Response({"error": "Lost item not found"}, status=status.HTTP_404_NOT_FOUND)

        if action == 'view':
            item.views = (item.views or 0) + 1
            item.save()
            return Response({"ok": True, "views": item.views})

        return Response({"ok": False, "error": "unknown action"}, status=status.HTTP_400_BAD_REQUEST)


class FoundItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            item = FoundItem.objects.get(pk=pk)
        except FoundItem.DoesNotExist:
            return Response({"error": "Found item not found"}, status=status.HTTP_404_NOT_FOUND)
        ser = FoundItemSerializer(item)
        return Response({"found_item": ser.data})

    def post(self, request, pk):
        action = request.data.get('action')
        try:
            item = FoundItem.objects.get(pk=pk)
        except FoundItem.DoesNotExist:
            return Response({"error": "Found item not found"}, status=status.HTTP_404_NOT_FOUND)

        if action == 'view':
            item.views = (item.views or 0) + 1
            item.save()
            return Response({"ok": True, "views": item.views})

        return Response({"ok": False, "error": "unknown action"}, status=status.HTTP_400_BAD_REQUEST)


class LostFoundSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q', '')
        category = request.GET.get('category', '')

        lost_items = LostItem.objects.filter(status='active')
        found_items = FoundItem.objects.filter(status='unclaimed')

        if query:
            lost_items = lost_items.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(location__icontains=query)
            )
            found_items = found_items.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(location__icontains=query)
            )

        if category:
            lost_items = lost_items.filter(category=category)
            found_items = found_items.filter(category=category)

        lost_ser = LostItemSerializer(lost_items[:50], many=True)
        found_ser = FoundItemSerializer(found_items[:50], many=True)

        return Response({
            "lost_items": lost_ser.data,
            "found_items": found_ser.data,
            "total_results": lost_items.count() + found_items.count()
        })


class LostFoundMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        lost_item_id = request.data.get('lost_item_id')
        found_item_id = request.data.get('found_item_id')
        match_confidence = request.data.get('match_confidence', 0.0)

        try:
            lost_item = LostItem.objects.get(pk=lost_item_id)
            found_item = FoundItem.objects.get(pk=found_item_id)
        except (LostItem.DoesNotExist, FoundItem.DoesNotExist):
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        match = LostFoundMatch.objects.create(
            lost_item=lost_item,
            found_item=found_item,
            match_confidence=match_confidence,
            matched_by=request.user,
            status='pending'
        )
        ser = LostFoundMatchSerializer(match)
        return Response({"ok": True, "match": ser.data}, status=status.HTTP_201_CREATED)


# Analytics API Views
class TrackPageVisitView(APIView):
    """Track a page visit for analytics."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        page_name = request.data.get('page_name')
        if not page_name:
            return Response({"error": "page_name is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Create page visit record
        visit = PageVisit.objects.create(
            user=request.user,
            page_name=page_name,
            session_id=request.data.get('session_id', ''),
            ip_address=request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR')),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )

        # Update or create analytics record for today
        analytics, created = MonetizationAnalytics.get_or_create_today(page_name)

        # Increment visit counts
        analytics.total_visits += 1
        if request.user.is_authenticated:
            # Simple unique visitor tracking (in production, use session-based tracking)
            analytics.unique_visitors += 1
        analytics.save()

        return Response({"ok": True, "visit_id": visit.id})


class MonetizationAnalyticsView(APIView):
    """Get analytics data for monetization pages."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get analytics for all monetization pages
        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)

        # Define monetization pages
        monetization_pages = [
            'OnlineTransactions',
            'AccommodationAgents',
            'Marketing',
            'Library',
            'CampusMap',
            'ServiceGuide',
            'CommunityAds',
            'Blogs',
            'LostFound'
        ]

        analytics_data = []

        # Check if there's actual analytics data in the database
        try:
            today = timezone.now().date()
            last_7_days = today - timedelta(days=7)

            # Try to get real analytics data first
            real_data = MonetizationAnalytics.objects.filter(
                date__gte=last_7_days,
                date__lt=today
            ).values('page_name').annotate(
                total_visits=models.Sum('total_visits')
            )

            if real_data.exists():
                # Return real analytics data
                for item in real_data:
                    trends = MonetizationAnalytics.calculate_7day_trends(item['page_name'])
                    analytics_data.append({
                        'page_name': item['page_name'],
                        'visits_count': item['total_visits'] or 0,
                        'trend_percentage': trends['change_percentage'],
                        'has_data': True
                    })
            else:
                # Return empty array when no data is available
                # This will trigger the frontend to show fallback buttons
                pass

        except Exception as e:
            # If there's any error, return empty array to show fallback buttons
            print(f"Error fetching analytics data: {e}")
            pass

        # If no real data, return empty array to show fallback buttons
        # The frontend will handle this gracefully by showing regular buttons

        return Response({
            "analytics": analytics_data,
            "date": today,
            "last_7_days": last_7_days
        })


class PageVisitListView(APIView):
    """Get list of page visits for analytics."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page_name = request.GET.get('page_name')
        limit = int(request.GET.get('limit', 100))

        queryset = PageVisit.objects.all().order_by('-visited_at')

        if page_name:
            queryset = queryset.filter(page_name=page_name)

        visits = queryset[:limit]
        serializer = PageVisitSerializer(visits, many=True)

        return Response({"visits": serializer.data})


class MonetizationDashboardView(APIView):
    """Get dashboard data for monetization analytics."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)

        # Get total visits across all monetization pages for the last 7 days
        total_visits = MonetizationAnalytics.objects.filter(
            date__gte=last_7_days,
            date__lt=today
        ).aggregate(
            total_visits=models.Sum('total_visits'),
            unique_visitors=models.Sum('unique_visitors'),
            link_clicks=models.Sum('link_clicks'),
            likes=models.Sum('likes'),
            replies=models.Sum('replies'),
            reposts=models.Sum('reposts')
        )

        # Get top performing pages
        top_pages = MonetizationAnalytics.objects.filter(
            date__gte=last_7_days,
            date__lt=today
        ).values('page_name').annotate(
            total_visits=models.Sum('total_visits')
        ).order_by('-total_visits')[:5]

        return Response({
            "total_visits": total_visits['total_visits'] or 0,
            "unique_visitors": total_visits['unique_visitors'] or 0,
            "total_engagement": {
                "link_clicks": total_visits['link_clicks'] or 0,
                "likes": total_visits['likes'] or 0,
                "replies": total_visits['replies'] or 0,
                "reposts": total_visits['reposts'] or 0,
            },
            "top_pages": list(top_pages),
            "date_range": {
                "from": last_7_days,
                "to": today
            }
        })


class AnalyticsSummaryView(APIView):
    """Get summary analytics for a specific page."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page_name = request.GET.get('page_name')
        if not page_name:
            return Response({"error": "page_name parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)

        # Get analytics for the specific page
        analytics = MonetizationAnalytics.objects.filter(
            page_name=page_name,
            date__gte=last_7_days,
            date__lt=today
        ).order_by('date')

        if not analytics:
            return Response({
                "page_name": page_name,
                "has_data": False,
                "message": "No analytics data available for this page"
            })

        # Calculate totals
        totals = analytics.aggregate(
            total_visits=models.Sum('total_visits'),
            unique_visitors=models.Sum('unique_visitors'),
            link_clicks=models.Sum('link_clicks'),
            likes=models.Sum('likes'),
            replies=models.Sum('replies'),
            reposts=models.Sum('reposts'),
            new_followers=models.Sum('new_followers')
        )

        # Calculate average engagement rate
        avg_engagement = analytics.aggregate(
            avg_engagement=models.Avg('engagement_rate')
        )

        return Response({
            "page_name": page_name,
            "has_data": True,
            "summary": {
                "total_visits": totals['total_visits'] or 0,
                "unique_visitors": totals['unique_visitors'] or 0,
                "engagement": {
                    "link_clicks": totals['link_clicks'] or 0,
                    "likes": totals['likes'] or 0,
                    "replies": totals['replies'] or 0,
                    "reposts": totals['reposts'] or 0,
                    "new_followers": totals['new_followers'] or 0,
                    "avg_engagement_rate": round(avg_engagement['avg_engagement'] or 0, 2)
                }
            },
            "daily_breakdown": MonetizationAnalyticsSerializer(analytics, many=True).data
        })
# Analytics API Views
class TrackPageVisitView(APIView):
    """Track a page visit for analytics."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        page_name = request.data.get('page_name')
        session_id = request.data.get('session_id', '')
        user_agent = request.data.get('user_agent', '')

        if not page_name:
            return Response({"error": "page_name is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get client IP address
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR')
        if ip_address:
            ip_address = ip_address.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')

        # Create page visit record
        visit = PageVisit.objects.create(
            user=request.user if request.user.is_authenticated else None,
            page_name=page_name,
            session_id=session_id,
            ip_address=ip_address,
            user_agent=user_agent
        )

        # Update or create analytics record for today
        analytics, created = MonetizationAnalytics.get_or_create_today(page_name)

        # Update visit counts
        analytics.total_visits += 1
        if request.user.is_authenticated:
            analytics.unique_visitors += 1
        analytics.save()

        ser = PageVisitSerializer(visit)
        return Response({"ok": True, "visit": ser.data}, status=status.HTTP_201_CREATED)


class MonetizationAnalyticsView(APIView):
    """Get daily analytics data for monetization pages."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page_name = request.GET.get('page_name')  # Optional filter
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')

        queryset = MonetizationAnalytics.objects.all()

        if page_name:
            queryset = queryset.filter(page_name=page_name)

        if date_from:
            queryset = queryset.filter(date__gte=date_from)

        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        # Order by date descending to get most recent first
        queryset = queryset.order_by('-date')
        ser = MonetizationAnalyticsSerializer(queryset, many=True)

        return Response({"analytics": ser.data})


class MonetizationDashboardView(APIView):
    """Get daily dashboard statistics for all monetization pages."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all unique page names
        page_names = [
            'OnlineTransactions', 'AccommodationAgents', 'Marketing',
            'Library', 'CampusMap', 'Blogs', 'LostFound'
        ]

        dashboard_data = []

        for page_name in page_names:
            # Get today's analytics record
            today = date.today()
            try:
                analytics = MonetizationAnalytics.objects.get(
                    page_name=page_name,
                    date=today
                )
            except MonetizationAnalytics.DoesNotExist:
                # Create empty record if no data exists
                analytics = MonetizationAnalytics(
                    page_name=page_name,
                    date=today,
                    total_visits=0,
                    unique_visitors=0,
                    engagement_rate=0.0,
                    link_clicks=0,
                    profile_visits=0,
                    likes=0,
                    replies=0,
                    reposts=0,
                    new_followers=0,
                    visit_change_percentage=0.0
                )
                analytics.save()

            # Format data for daily dashboard display
            dashboard_data.append({
                'page_name': page_name,
                'visits_count': analytics.total_visits,
                'trend_percentage': analytics.visit_change_percentage,
                'engagement_rate': round(analytics.engagement_rate, 1),
                'profile_visits': analytics.profile_visits,
                'link_clicks': analytics.link_clicks,
                'new_followers': analytics.new_followers,
                'replies': analytics.replies,
                'likes': analytics.likes,
                'reposts': analytics.reposts
            })

        return Response({"dashboard": dashboard_data})


class AnalyticsSummaryView(APIView):
    """Get summary statistics for all monetization pages."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        last_7_days = today - timedelta(days=7)

        # Get total visits for all pages in last 7 days
        total_visits = MonetizationAnalytics.objects.filter(
            date__gte=last_7_days
        ).aggregate(
            total_visits=models.Sum('total_visits'),
            unique_visitors=models.Sum('unique_visitors')
        )

        # Get page-specific data
        page_stats = MonetizationAnalytics.objects.filter(
            date=today
        ).values('page_name').annotate(
            visits=models.Sum('total_visits')
        ).order_by('-visits')[:10]

        return Response({
            "summary": {
                "total_visits_7days": total_visits['total_visits'] or 0,
                "unique_visitors_7days": total_visits['unique_visitors'] or 0,
                "top_pages": list(page_stats)
            }
        })


# Service Guide API Views
class ServiceGuideListCreateView(APIView):
    """List and create service guides."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        service_type = request.GET.get('service_type', '')
        verified_only = request.GET.get('verified_only', 'false').lower() == 'true'
        search = request.GET.get('search', '')

        queryset = ServiceGuide.objects.filter(is_active=True)

        if service_type:
            queryset = queryset.filter(service_type=service_type)

        if verified_only:
            queryset = queryset.filter(is_verified=True)

        if search:
            queryset = queryset.filter(
                Q(service_name__icontains=search) |
                Q(description__icontains=search) |
                Q(department__icontains=search)
            )

        queryset = queryset.order_by('-created_at')
        guides = queryset[:50]

        # Include document count for each guide
        guides_data = []
        for guide in guides:
            guide_data = {
                'id': guide.id,
                'service_name': guide.service_name,
                'service_type': guide.service_type,
                'department': guide.department,
                'description': guide.description,
                'contact_person': guide.contact_person,
                'contact_email': guide.contact_email,
                'contact_phone': guide.contact_phone,
                'location': guide.location,
                'operating_hours': guide.operating_hours,
                'website_url': guide.website_url,
                'is_verified': guide.is_verified,
                'views': guide.views,
                'created_at': guide.created_at,
                'updated_at': guide.updated_at,
                'document_count': guide.documents.filter(is_current=True).count()
            }
            guides_data.append(guide_data)

        return Response({
            "service_guides": guides_data,
            "total_count": queryset.count()
        })

    def post(self, request):
        """Create a new service guide."""
        payload = request.data.dict() if hasattr(request.data, 'dict') else dict(request.data)

        service_guide = ServiceGuide.objects.create(
            service_name=payload.get('service_name', ''),
            service_type=payload.get('service_type', ''),
            department=payload.get('department', ''),
            description=payload.get('description', ''),
            contact_person=payload.get('contact_person', ''),
            contact_email=payload.get('contact_email', ''),
            contact_phone=payload.get('contact_phone', ''),
            location=payload.get('location', ''),
            operating_hours=payload.get('operating_hours', {}),
            website_url=payload.get('website_url', ''),
            is_verified=payload.get('is_verified', False),
            search_keywords=payload.get('search_keywords', []),
            metadata=payload.get('metadata', {})
        )

        return Response({
            "ok": True,
            "service_guide": {
                'id': service_guide.id,
                'service_name': service_guide.service_name,
                'service_type': service_guide.service_type,
                'department': service_guide.department,
                'description': service_guide.description,
                'contact_person': service_guide.contact_person,
                'contact_email': service_guide.contact_email,
                'contact_phone': service_guide.contact_phone,
                'location': service_guide.location,
                'operating_hours': service_guide.operating_hours,
                'website_url': service_guide.website_url,
                'is_verified': service_guide.is_verified,
                'views': service_guide.views,
                'created_at': service_guide.created_at,
                'updated_at': service_guide.updated_at
            }
        }, status=status.HTTP_201_CREATED)


class ServiceGuideDetailView(APIView):
    """Get, update, or delete a specific service guide."""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            guide = ServiceGuide.objects.get(pk=pk, is_active=True)
        except ServiceGuide.DoesNotExist:
            return Response({"error": "Service guide not found"}, status=status.HTTP_404_NOT_FOUND)

        # Increment view count
        guide.views += 1
        guide.save()

        # Get current documents
        documents = guide.documents.filter(is_current=True).order_by('-created_at')

        return Response({
            "service_guide": {
                'id': guide.id,
                'service_name': guide.service_name,
                'service_type': guide.service_type,
                'department': guide.department,
                'description': guide.description,
                'contact_person': guide.contact_person,
                'contact_email': guide.contact_email,
                'contact_phone': guide.contact_phone,
                'location': guide.location,
                'operating_hours': guide.operating_hours,
                'website_url': guide.website_url,
                'is_verified': guide.is_verified,
                'views': guide.views,
                'created_at': guide.created_at,
                'updated_at': guide.updated_at
            },
            "documents": [{
                'id': doc.id,
                'title': doc.title,
                'description': doc.description,
                'document_file': doc.document_file.url if doc.document_file else None,
                'file_size': doc.file_size,
                'version': doc.version,
                'created_at': doc.created_at
            } for doc in documents]
        })

    def post(self, request, pk):
        """Update service guide or perform actions."""
        try:
            guide = ServiceGuide.objects.get(pk=pk)
        except ServiceGuide.DoesNotExist:
            return Response({"error": "Service guide not found"}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action')

        if action == 'verify':
            guide.is_verified = True
            guide.save()
            return Response({"ok": True, "is_verified": True})

        elif action == 'toggle_active':
            guide.is_active = not guide.is_active
            guide.save()
            return Response({"ok": True, "is_active": guide.is_active})

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)


class ServiceDocumentUploadView(APIView):
    """Upload documents for service guides."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        service_guide_id = request.data.get('service_guide_id')
        title = request.data.get('title', '')
        description = request.data.get('description', '')
        version = request.data.get('version', '1.0')
        document_file = request.FILES.get('document_file')

        if not all([service_guide_id, title, document_file]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            service_guide = ServiceGuide.objects.get(pk=service_guide_id)
        except ServiceGuide.DoesNotExist:
            return Response({"error": "Service guide not found"}, status=status.HTTP_404_NOT_FOUND)

        # Mark existing documents as not current
        ServiceDocument.objects.filter(
            service_guide=service_guide,
            is_current=True
        ).update(is_current=False)

        # Create new document
        file_size = document_file.size
        document = ServiceDocument.objects.create(
            service_guide=service_guide,
            title=title,
            description=description,
            document_file=document_file,
            file_size=file_size,
            version=version,
            is_current=True,
            uploaded_by=request.user,
            processing_status='pending'
        )

        return Response({
            "ok": True,
            "document": {
                'id': document.id,
                'title': document.title,
                'description': document.description,
                'file_size': document.file_size,
                'version': document.version,
                'created_at': document.created_at
            }
        }, status=status.HTTP_201_CREATED)


class ServiceGuideSearchView(APIView):
    """AI-powered search for service guides."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q', '')
        service_type = request.GET.get('service_type', '')

        if not query:
            return Response({"error": "Search query is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all active service guides
        queryset = ServiceGuide.objects.filter(is_active=True)

        if service_type:
            queryset = queryset.filter(service_type=service_type)

        guides = list(queryset)

        # Simple AI-like search based on keywords and content
        relevant_guides = []
        relevant_documents = []

        for guide in guides:
            # Search in guide content
            guide_relevance = 0
            search_terms = query.lower().split()

            for term in search_terms:
                if (term in guide.service_name.lower() or
                    term in guide.description.lower() or
                    term in guide.department.lower() or
                    term in str(guide.search_keywords).lower()):
                    guide_relevance += 1

            if guide_relevance > 0:
                relevant_guides.append({
                    'guide': guide,
                    'relevance_score': guide_relevance
                })

            # Search in documents
            for doc in guide.documents.filter(is_current=True):
                doc_relevance = 0
                for term in search_terms:
                    if (term in doc.title.lower() or
                        term in doc.description.lower() or
                        term in doc.extracted_text.lower()):
                        doc_relevance += 1

                if doc_relevance > 0:
                    relevant_documents.append({
                        'document': doc,
                        'relevance_score': doc_relevance
                    })

        # Sort by relevance
        relevant_guides.sort(key=lambda x: x['relevance_score'], reverse=True)
        relevant_documents.sort(key=lambda x: x['relevance_score'], reverse=True)

        # Create search record
        search_record = ServiceGuideSearch.objects.create(
            query=query,
            response=f"Found {len(relevant_guides)} relevant guides and {len(relevant_documents)} documents",
            confidence_score=min(0.95, len(relevant_guides) * 0.1 + len(relevant_documents) * 0.05),
            user=request.user
        )

        # Add relevant documents to search record
        for doc_info in relevant_documents[:5]:  # Limit to top 5
            search_record.relevant_documents.add(doc_info['document'])

        return Response({
            "query": query,
            "results": {
                "guides": [{
                    'id': guide_info['guide'].id,
                    'service_name': guide_info['guide'].service_name,
                    'service_type': guide_info['guide'].service_type,
                    'description': guide_info['guide'].description,
                    'contact_email': guide_info['guide'].contact_email,
                    'relevance_score': guide_info['relevance_score']
                } for guide_info in relevant_guides[:10]],  # Limit to top 10
                "documents": [{
                    'id': doc_info['document'].id,
                    'title': doc_info['document'].title,
                    'service_guide': doc_info['document'].service_guide.service_name,
                    'file_url': doc_info['document'].document_file.url if doc_info['document'].document_file else None,
                    'relevance_score': doc_info['relevance_score']
                } for doc_info in relevant_documents[:5]]
            },
            "search_id": search_record.id,
            "total_results": len(relevant_guides) + len(relevant_documents)
        })


class ServiceGuideAnalyticsView(APIView):
    """Get analytics for service guides."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        service_guide_id = request.GET.get('service_guide_id')
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')

        queryset = ServiceGuideAnalytics.objects.all()

        if service_guide_id:
            queryset = queryset.filter(service_guide_id=service_guide_id)

        if date_from:
            queryset = queryset.filter(date__gte=date_from)

        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        queryset = queryset.order_by('-date')

        return Response({
            "analytics": [{
                'service_guide_id': analytics.service_guide.id,
                'service_guide_name': analytics.service_guide.service_name,
                'date': analytics.date,
                'views': analytics.views,
                'searches': analytics.searches,
                'document_downloads': analytics.document_downloads,
                'unique_visitors': analytics.unique_visitors,
                'avg_confidence_score': analytics.avg_confidence_score
            } for analytics in queryset[:30]]
        })

    
