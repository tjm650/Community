import uuid
import decimal
import base64
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Q, Count

# Only import models/serializers that still exist. Legacy models (Listing, Transaction,
# Subscription, Badge) were removed; handlers below will either persist to the new
# models (Marketing, LibraryMarketing, Accommodation, LostItem, FoundItem) or emit safe in-memory payloads
# so clients relying on socket events don't crash.
from amonetization.models import (
    Accommodation,
    OnlineTransaction,
    LostItem,
    FoundItem,
    LostFoundMatch,
    LostFoundReward,
    PageVisit,
    MonetizationAnalytics
)
from amonetization.serializers import (
    AccommodationSerializer,
    OnlineTransactionSerializer,
    LostItemSerializer,
    FoundItemSerializer,
    LostFoundMatchSerializer,
    LostFoundRewardSerializer,
    MonetizationAnalyticsSerializer
)
from rest_framework import status


def receive_monetization_accommodations(consumer, data):
    """Send a paginated list of accommodations over the websocket.

    Supports `page` (0-based) and returns `next` containing the next page
    number or `null` when there are no more pages.
    """
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    qs_all = Accommodation.objects.all().order_by("-created_at")
    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]
    print("ACCOMMODATIONS", qs.count(), total, start, end)

    serialized = AccommodationSerializer(qs, many=True)

    next_page = page + 1 if total > end else None

    payload = {"accommodations": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.accommodations", payload)
    
    
    
def receive_monetization_tx(consumer, data):
    
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    qs_all = OnlineTransaction.objects.filter(active=True).order_by("-created_at")
    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]
    print("OnlineTransactionsAgents", qs.count(), total, start, end)

    serialized = OnlineTransactionSerializer(qs, many=True)

    next_page = page + 1 if total > end else None

    payload = {"tx": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.tx", payload)


def _paginate_queryset(qs, page, page_size):
    total = qs.count()
    start = page * page_size
    end = (page + 1) * page_size
    return qs[start:end], total, start, end


def receive_monetization_marketing(consumer, data):
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    from amonetization.models import Marketing
    from amonetization.serializers import MarketingSerializer

    qs_all = Marketing.objects.filter(active=True).order_by("-created_at")
    qs, total, start, end = _paginate_queryset(qs_all, page, page_size)
    serialized = MarketingSerializer(qs, many=True)
    next_page = page + 1 if total > end else None
    payload = {"marketing": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.marketing", payload)


def receive_monetization_library(consumer, data):
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    from amonetization.models import LibraryMarketing
    from amonetization.serializers import LibraryMarketingSerializer

    qs_all = LibraryMarketing.objects.filter(active=True).order_by("-created_at")
    qs, total, start, end = _paginate_queryset(qs_all, page, page_size)
    serialized = LibraryMarketingSerializer(qs, many=True)
    next_page = page + 1 if total > end else None
    payload = {"library": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.library", payload)


def receive_monetization_campusmap(consumer, data):
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    from amonetization.models import CampusMap
    from amonetization.serializers import CampusMapSerializer

    qs_all = CampusMap.objects.filter(active=True).order_by("-created_at")
    qs, total, start, end = _paginate_queryset(qs_all, page, page_size)
    serialized = CampusMapSerializer(qs, many=True)
    next_page = page + 1 if total > end else None
    payload = {"campusmap": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.campusmap", payload)


def receive_monetization_create_accommodation(consumer, data):
    """Create an Accommodation record from websocket payload.

    Expected fields: title, description, price, currency, phone, geo_lat, geo_lng,
    imageBase64, imageFilename
    """
    user = consumer.scope["user"]
    userId = consumer.scope.get("userId")
    title = data.get("title")
    description = data.get("description")
    price = data.get("price")
    currency = data.get("currency", "USD")
    phone = data.get("phone")
    geo_lat = data.get("geo_lat")
    geo_lng = data.get("geo_lng")
    image_b64 = data.get("imageBase64")
    image_filename = data.get("imageFilename")

    # Lazy import to avoid module level circular imports
    from django.core.files.base import ContentFile

    acc = Accommodation.objects.create(
        sender=user,
        title=title or "",
        description=description or "",
        price=price or 0,
        currency=currency,
        phone=phone or "",
        geo_lat=geo_lat if geo_lat is not None else None,
        geo_lng=geo_lng if geo_lng is not None else None,
    )

    if image_b64 and image_filename:
        try:
            decoded = ContentFile(base64.b64decode(image_b64), name=image_filename)
            acc.image = decoded
            acc.save()
        except Exception:
            # ignore image save errors but keep the accommodation
            pass

    ser = AccommodationSerializer(acc)
    # Emit created listing so clients can replace optimistic entries
    consumer.send_group(user.username, "monetization.create_accommodation", ser.data)


def receive_monetization_create_tx(consumer, data):
    user = consumer.scope["user"]
    description = data.get("description")
    method = data.get("method")
    metadata = data.get("metadata", {})
    geo_lat  = data.get("geo_lat"),
    geo_lng = data.get("geo_lng")

    # Lazy import to avoid module level circular imports
    from django.core.files.base import ContentFile

    acc = OnlineTransaction.objects.create(
    provider=user,
    provider_location = "",
    method = method,
    description = description or "",
    metadata = metadata or {},
    active = True,
    geo_lat=geo_lat if geo_lat is not None else None,
    geo_lng=geo_lng if geo_lng is not None else None,

    )


    ser = OnlineTransactionSerializer(acc)
    # Emit created listing so clients can replace optimistic entries
    consumer.send_group(user.username, "monetization.create_tx_agent", ser.data)


# Lost and Found WebSocket Handlers
def receive_monetization_lost_items(consumer, data):
    """Send a paginated list of lost items over the websocket."""
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    qs_all = LostItem.objects.all().order_by("-created_at")
    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]

    serialized = LostItemSerializer(qs, many=True)
    next_page = page + 1 if total > end else None

    payload = {"lost_items": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.lost_items", payload)


def receive_monetization_found_items(consumer, data):
    """Send a paginated list of found items over the websocket."""
    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    qs_all = FoundItem.objects.all().order_by("-created_at")
    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]

    serialized = FoundItemSerializer(qs, many=True)
    next_page = page + 1 if total > end else None

    payload = {"found_items": serialized.data, "next": next_page}
    consumer.send_group(user.username, "monetization.found_items", payload)


def receive_monetization_create_lost_item(consumer, data):
    """Create a LostItem record from websocket payload."""
    user = consumer.scope["user"]
    title = data.get("title")
    description = data.get("description")
    category = data.get("category")
    location = data.get("location")
    date_lost = data.get("date_lost")
    images = data.get("images", [])
    reward_offered = data.get("reward_offered")
    currency = data.get("currency", "USD")
    contact_info = data.get("contact_info", {})
    is_premium = data.get("is_premium", False)

    lost_item = LostItem.objects.create(
        reporter=user,
        title=title or "",
        description=description or "",
        category=category or "",
        location=location or "",
        date_lost=date_lost,
        images=images,
        reward_offered=reward_offered,
        currency=currency,
        contact_info=contact_info,
        is_premium=is_premium,
        reported_by=user,
    )

    ser = LostItemSerializer(lost_item)
    consumer.send_group(user.username, "monetization.create_lost_item", ser.data)


def receive_monetization_create_found_item(consumer, data):
    """Create a FoundItem record from websocket payload."""
    user = consumer.scope["user"]
    title = data.get("title")
    description = data.get("description")
    category = data.get("category")
    location = data.get("location")
    date_found = data.get("date_found")
    images = data.get("images", [])
    contact_info = data.get("contact_info", {})
    is_premium = data.get("is_premium", False)

    found_item = FoundItem.objects.create(
        reporter=user,
        title=title or "",
        description=description or "",
        category=category or "",
        location=location or "",
        date_found=date_found,
        images=images,
        contact_info=contact_info,
        is_premium=is_premium,
        reported_by=user,
    )

    ser = FoundItemSerializer(found_item)
    consumer.send_group(user.username, "monetization.create_found_item", ser.data)


def receive_monetization_lost_found_search(consumer, data):
    """Search lost and found items."""
    user = consumer.scope.get("user")
    query = data.get("query", "")
    category = data.get("category", "")

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

    lost_ser = LostItemSerializer(lost_items[:20], many=True)
    found_ser = FoundItemSerializer(found_items[:20], many=True)

    payload = {
        "lost_items": lost_ser.data,
        "found_items": found_ser.data,
        "total_results": lost_items.count() + found_items.count()
    }
    consumer.send_group(user.username, "monetization.lost_found_search", payload)


# AI Service WebSocket Handlers
def receive_service_guide_ai_search(consumer, data):
    """Handle AI-powered service guide search."""
    from amonetization.ai_service import ai_service
    from amonetization.models import ServiceGuideSearch

    user = consumer.scope.get("user")
    query = data.get("query", "")

    if not query:
        payload = {
            "error": "Query is required",
            "query": query
        }
        consumer.send_group(user.username, "service_guide.ai_search", payload)
        return

    try:
        # Process search using AI service
        search_results = ai_service.process_search(query)

        # Log the search
        ServiceGuideSearch.objects.create(
            user=user if user.is_authenticated else None,
            query=query,
            intent=search_results['intent']['intent'],
            confidence=search_results['intent']['confidence'],
            results_count=len(search_results['services']) + len(search_results['documents'])
        )

        # Format services for response
        services_data = []
        for item in search_results['services']:
            service = item['service']
            services_data.append({
                'id': service.id,
                'service_name': service.service_name,
                'service_type': service.service_type,
                'department': service.department,
                'description': service.description,
                'contact_person': service.contact_person,
                'contact_email': service.contact_email,
                'contact_phone': service.contact_phone,
                'location': service.location,
                'website_url': service.website_url,
                'is_verified': service.is_verified,
                'relevance_score': item['relevance_score']
            })

        # Format documents for response
        documents_data = []
        for item in search_results['documents']:
            doc = item['document']
            documents_data.append({
                'id': doc.id,
                'title': doc.title,
                'description': doc.description,
                'service_guide': doc.service_guide.service_name,
                'service_guide_id': doc.service_guide.id,
                'file_url': doc.file_url,
                'relevance_score': item['relevance_score']
            })

        payload = {
            "query": query,
            "intent": search_results['intent']['intent'],
            "confidence": search_results['intent']['confidence'],
            "response": search_results['response'],
            "services": services_data,
            "documents": documents_data,
            "total_results": len(services_data) + len(documents_data)
        }

        consumer.send_group(user.username, "service_guide.ai_search", payload)

    except Exception as e:
        payload = {
            "error": str(e),
            "query": query
        }
        consumer.send_group(user.username, "service_guide.ai_search", payload)


def receive_service_guide_list(consumer, data):
    """Send paginated list of service guides."""
    from amonetization.models import ServiceGuide
    from amonetization.serializers import ServiceGuideSerializer

    user = consumer.scope.get("user")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))
    service_type = data.get("service_type", "all")

    qs_all = ServiceGuide.objects.filter(is_active=True, is_verified=True).order_by("-created_at")

    # Filter by service type if specified
    if service_type != "all":
        qs_all = qs_all.filter(service_type=service_type)

    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]

    serialized = ServiceGuideSerializer(qs, many=True)
    next_page = page + 1 if total > end else None

    payload = {
        "service_guides": serialized.data,
        "next": next_page,
        "total": total,
        "service_type": service_type
    }
    consumer.send_group(user.username, "service_guide.list", payload)


def receive_service_guide_documents(consumer, data):
    """Send documents for a specific service guide."""
    from amonetization.models import ServiceDocument
    from amonetization.serializers import ServiceDocumentSerializer

    user = consumer.scope.get("user")
    service_guide_id = data.get("service_guide_id")
    page = int(data.get("page", 0))
    page_size = int(data.get("page_size", 10))

    if not service_guide_id:
        payload = {"error": "Service guide ID is required"}
        consumer.send_group(user.username, "service_guide.documents", payload)
        return

    qs_all = ServiceDocument.objects.filter(
        service_guide_id=service_guide_id,
        service_guide__is_verified=True,
        service_guide__is_active=True
    ).order_by("-created_at")

    total = qs_all.count()
    start = page * page_size
    end = (page + 1) * page_size
    qs = qs_all[start:end]

    serialized = ServiceDocumentSerializer(qs, many=True)
    next_page = page + 1 if total > end else None

    payload = {
        "documents": serialized.data,
        "next": next_page,
        "total": total,
        "service_guide_id": service_guide_id
    }
    consumer.send_group(user.username, "service_guide.documents", payload)


# Analytics WebSocket Handlers
def receive_analytics_dashboard(consumer, data):
    """Send analytics dashboard data over websocket."""
    user = consumer.scope.get("user")

    # Get all monetization pages
    pages = [
        'accommodations', 'marketing', 'library', 'campusmap',
        'lost_items', 'found_items', 'online_transactions'
    ]

    dashboard_data = []
    for page_name in pages:
        # Get visits for this page in the last 7 days
        seven_days_ago = date.today() - timedelta(days=7)
        visits = PageVisit.objects.filter(
            page_name=page_name,
            visited_at__date__gte=seven_days_ago
        )

        # Calculate trend (compare with previous 7 days)
        fourteen_days_ago = date.today() - timedelta(days=14)
        previous_visits = PageVisit.objects.filter(
            page_name=page_name,
            visited_at__date__gte=fourteen_days_ago,
            visited_at__date__lt=seven_days_ago
        )

        current_count = visits.count()
        previous_count = previous_visits.count()
        trend = 0
        if previous_count > 0:
            trend = ((current_count - previous_count) / previous_count) * 100

        dashboard_data.append({
            'page_name': page_name,
            'visits_count': current_count,
            'trend_percentage': round(trend, 1),
            'unique_visitors': visits.values('session_id').distinct().count()
        })

    payload = {"dashboard": dashboard_data}
    consumer.send_group(user.username, "analytics.dashboard", payload)


def receive_analytics_summary(consumer, data):
    """Send analytics summary data over websocket."""
    user = consumer.scope.get("user")

    # Calculate 7-day summary
    seven_days_ago = date.today() - timedelta(days=7)
    visits = PageVisit.objects.filter(visited_at__date__gte=seven_days_ago)

    total_visits = visits.count()
    unique_visitors = visits.values('session_id').distinct().count()

    # Get top pages
    page_stats = visits.values('page_name').annotate(
        count=Count('id')
    ).order_by('-count')[:5]

    top_pages = []
    for stat in page_stats:
        top_pages.append({
            'page_name': stat['page_name'],
            'visit_count': stat['count']
        })

    summary = {
        'total_visits_7days': total_visits,
        'unique_visitors_7days': unique_visitors,
        'top_pages': top_pages
    }

    payload = {"summary": summary}
    consumer.send_group(user.username, "analytics.summary", payload)


def receive_analytics_track_visit(consumer, data):
    """Track a page visit via websocket."""
    user = consumer.scope.get("user")
    page_name = data.get("page_name")
    session_id = data.get("session_id", "")
    user_agent = data.get("user_agent", "")

    if not page_name:
        return

    # Create or update visit record
    visit, created = PageVisit.objects.get_or_create(
        page_name=page_name,
        session_id=session_id,
        user_agent=user_agent,
        visited_at__date=date.today(),
        defaults={
            'visited_at': timezone.now(),
            'ip_address': consumer.scope.get('client', [''])[0] if consumer.scope.get('client') else None
        }
    )

    if not created:
        # Update timestamp for existing visit
        visit.visited_at = timezone.now()
        visit.save()

    # Update or create analytics record
    analytics, _ = MonetizationAnalytics.objects.get_or_create(
        page_name=page_name,
        date=date.today(),
        defaults={'visit_count': 0, 'unique_visitors': 0}
    )

    # Recalculate analytics
    today_visits = PageVisit.objects.filter(
        page_name=page_name,
        visited_at__date=date.today()
    )
    analytics.visit_count = today_visits.count()
    analytics.unique_visitors = today_visits.values('session_id').distinct().count()
    analytics.save()

    payload = {"visit": {
        'id': visit.id,
        'page_name': visit.page_name,
        'session_id': visit.session_id,
        'visited_at': visit.visited_at.isoformat()
    }}
    consumer.send_group(user.username, "analytics.visit_tracked", payload)
