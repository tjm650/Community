from django.urls import path
from . import views

app_name = 'quercus'

urlpatterns = [
    # Main AI assistant endpoint
    path('ai/generate/', views.QuercusAIView.as_view(), name='ai_generate'),

    # Conversation management
    path('conversations/', views.QuercusConversationView.as_view(), name='conversations'),
    path('conversations/create/', views.QuercusConversationView.as_view(), name='conversation_create'),

    # AI settings
    path('settings/', views.QuercusSettingsView.as_view(), name='settings'),

    # Campus information
    path('campus/info/', views.QuercusCampusInfoView.as_view(), name='campus_info'),

    # Study planning
    path('study/plan/', views.QuercusStudyPlanView.as_view(), name='study_plan'),

    # Career guidance
    path('career/guidance/', views.QuercusCareerGuidanceView.as_view(), name='career_guidance'),

    # Image analysis
    path('image/analyze/', views.QuercusImageAnalysisView.as_view(), name='image_analyze'),

    # Conversation management
    path('conversations/<str:conversation_id>/summary/', views.QuercusConversationSummaryView.as_view(), name='conversation_summary'),

    # Document analysis
    path('document/analyze/', views.QuercusDocumentAnalysisView.as_view(), name='document_analyze'),

    # Advanced conversation features
    path('conversations/<str:conversation_id>/insights/', views.QuercusConversationInsightsView.as_view(), name='conversation_insights'),
    path('conversations/export/', views.QuercusConversationExportView.as_view(), name='conversation_export'),

    # Analytics and monitoring
    path('analytics/', views.QuercusAnalyticsView.as_view(), name='analytics'),

    # AI-powered suggestions
    path('suggestions/', views.QuercusSuggestionsView.as_view(), name='suggestions'),
]