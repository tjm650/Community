from django.urls import path
from .views import (
    AccommodationListCreateView,
    AccommodationDetailView,
    SignedUploadUrlView,
    LostItemListCreateView,
    FoundItemListCreateView,
    LostItemDetailView,
    FoundItemDetailView,
    LostFoundSearchView,
    LostFoundMatchView,
    TrackPageVisitView,
    MonetizationAnalyticsView,
    MonetizationDashboardView,
    AnalyticsSummaryView,
    ServiceGuideListCreateView,
    ServiceGuideDetailView,
    ServiceDocumentUploadView,
    ServiceGuideSearchView,
    ServiceGuideAnalyticsView,
)

urlpatterns = [
    # accommodations
    path('accommodations', AccommodationListCreateView.as_view(), name='accommodations_list_create'),
    path('accommodations/<int:pk>', AccommodationDetailView.as_view(), name='accommodations_detail'),
    path('upload-url', SignedUploadUrlView.as_view(), name='amonetization_upload_url'),

    # lost and found
    path('lost-items', LostItemListCreateView.as_view(), name='lost_items_list_create'),
    path('lost-items/<int:pk>', LostItemDetailView.as_view(), name='lost_items_detail'),
    path('found-items', FoundItemListCreateView.as_view(), name='found_items_list_create'),
    path('found-items/<int:pk>', FoundItemDetailView.as_view(), name='found_items_detail'),
    path('lost-found/search', LostFoundSearchView.as_view(), name='lost_found_search'),
    path('lost-found/match', LostFoundMatchView.as_view(), name='lost_found_match'),

    # analytics
    path('analytics/track-visit', TrackPageVisitView.as_view(), name='track_page_visit'),
    path('analytics/data', MonetizationAnalyticsView.as_view(), name='monetization_analytics'),
    path('analytics/dashboard', MonetizationDashboardView.as_view(), name='monetization_dashboard'),
    path('analytics/summary', AnalyticsSummaryView.as_view(), name='analytics_summary'),

    # service guides
    path('service-guides', ServiceGuideListCreateView.as_view(), name='service_guides_list_create'),
    path('service-guides/<int:pk>', ServiceGuideDetailView.as_view(), name='service_guides_detail'),
    path('service-guides/<int:pk>/upload-document', ServiceDocumentUploadView.as_view(), name='service_document_upload'),
    path('service-guides/search', ServiceGuideSearchView.as_view(), name='service_guide_search'),
    path('service-guides/analytics', ServiceGuideAnalyticsView.as_view(), name='service_guide_analytics'),
]


