# search_view.py
from django.db.models import Q, Count, Exists, OuterRef, Value, CharField
from django.utils import timezone
from datetime import timedelta

# from .models import (
#     User,
#     BlogPost,
#     UserPost,
#     ServicePost,
#     Accommodation,
#     SearchTrend
# )

# from asearch.serializers import (
#     SearchSerializer,
#     BlogSearchSerializer,
#     UserPostSerializer,
#     ServicePostSerializer,
#     AccommodationSerializer,
#     TrendingSerializer
# )

from api.serializers import UserSerializer


from ablog.serializers import BlogSerializer
from auserpost.serializers import PostSerializer
from anotif.serializers import NotifSerializer
from asearch.serializers import TrendingSerializer

from api.models import User
from ablog.models import Bloger
from auserpost.models import Post
from anotif.models import Notif
from asearch.models import SearchTrend


# In your Django settings or a constants file
COMMON_WORDS = {
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "of",
    "to",
    "in",
    "on",
    "at",
    "for",
    "with",
    "by",
    "as",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
}


def build_search_query(raw_query, search_fields):
    """
    Processes raw search query to:
    1. Remove common words
    2. Split into meaningful terms
    3. Build Q objects for each term
    """
    # Split query into words and filter out common ones
    search_terms = [
        term
        for term in raw_query.lower().split()
        if term not in COMMON_WORDS and len(term) > 2
    ]

    if not search_terms:
        return Q()  # Return empty Q object if no valid terms

    # Start with an empty Q object
    query = Q()

    # Build OR conditions for each search term across all fields
    for term in search_terms:
        term_query = Q()
        for field in search_fields:
            term_query |= Q(**{f"{field}__icontains": term})
        query &= term_query  # Using AND between terms

    return query


def receive_app_search(consumer, data):
    # user = consumer.scope['user']
    user = consumer.scope["user"]
    raw_query = data.get("query", "").strip()

    if not raw_query or len(raw_query) < 3:
        return

    # Process query and build search conditions
    user_query = build_search_query(
        raw_query, ["username", "first_name", "last_name", "email"]
    )
    blog_query = build_search_query(raw_query, ["description", "service__username"])
    post_query = build_search_query(
        raw_query, ["sender__first_name", "sender__last_name", "description"]
    )
    notif_query = build_search_query(raw_query, ["service__username", "description"])

    # Track search query for trending
    track_search_query(raw_query)

    # Search across all models
    results = []

    # Search Users
    users = (
        User.objects.filter(user_query)
        .exclude(id=user.id)
        .annotate(
            type=Value("user", output_field=CharField())
            # type='user'
        )[:5]
    )  # Limit to 5 results per type

    # Search Blog Posts
    blogs = Bloger.objects.filter(blog_query).annotate(
        type=Value("blog", output_field=CharField())
        # type='blog'
    )[:5]

    # Search User Posts
    user_posts = Post.objects.filter(post_query).annotate(
        type=Value("user_post", output_field=CharField())
        # type='user_post'
    )[:5]

    # Search Service Posts
    service_posts = Notif.objects.filter(notif_query).annotate(
        type=Value("notif", output_field=CharField())
        # type='notif'
    )[:5]

    # # Search Accommodation
    # accommodations = Accommodation.objects.filter(
    #     Q(title__icontains=query) |
    #     Q(description__icontains=query) |
    #     Q(location__icontains=query)
    # ).annotate(
    #     type='accommodation'
    # )[:5]

    serialized_users = UserSerializer(users, many=True, context={"user": user}).data
    serialized_blogs = BlogSerializer(blogs, many=True, context={"user": user}).data
    serialized_posts = PostSerializer(
        user_posts, many=True, context={"user": user}
    ).data
    serialized_notifs = NotifSerializer(
        service_posts, many=True, context={"user": user}
    ).data

    # Serialize all results
    # serialized_results = []
    # serialized_users = serialized_results.extend(
    #     UserSerializer(users, many=True, context={"user": user}).data
    # )
    # serialized_blogs = serialized_results.extend(
    #     BlogSerializer(blogs, many=True, context={"user": user}).data
    # )
    # serialized_posts = serialized_results.extend(
    #     PostSerializer(user_posts, many=True, context={"user": user}).data
    # )
    # serialized_notifs = serialized_results.extend(
    #     NotifSerializer(service_posts, many=True, context={"user": user}).data
    # )
    # serialized_results.extend(AccommodationSerializer(accommodations, many=True).data)

    data = {
        "search_users": serialized_users,
        "search_blogs": serialized_blogs,
        "search_posts": serialized_posts,
        "search_notifs": serialized_notifs,
    }

    # Send combined results
    consumer.send_group(consumer.username, "app.search", data)


def receive_app_trending(consumer, data):
    # Get trending searches from the last 7 days
    trending_searches = (
        SearchTrend.objects.filter(created_at__gte=timezone.now() - timedelta(days=7))
        .values("query")
        .annotate(count=Count("query"))
        .filter(count__gt=10)
        .order_by("-count")[:10]
    )  # Top 10 trending

    serialized = TrendingSerializer(trending_searches, many=True)
    consumer.send_group(consumer.username, "app.trending", serialized.data)


def track_search_query(query):
    # Create or update search trend record
    SearchTrend.objects.create(query=query)
