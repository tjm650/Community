from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Authentication endpoints
    path('signin', views.UserSignIn.as_view(), name='signin'),
    path('signout', views.UserLogout.as_view(), name='signout'),
    path('signup', views.UserSignUp.as_view(), name='signup'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile and preferences
    path('user/profile', views.UserProfile.as_view(), name='user_profile'),
    path('user/preferences', views.UserPreferences.as_view(), name='user_preferences'),
    path('user/analytics', views.UserAnalyticsView.as_view(), name='user_analytics'),
    path('user/communities', views.UserCommunities.as_view(), name='user_communities'),
    path('user/connections', views.UserConnections.as_view(), name='user_connections'),
    
    # Search and discovery
    path('search', views.SearchView.as_view(), name='search'),
    path('trending', views.TrendingView.as_view(), name='trending'),
    
    # Communities
    path('communities', views.CommunityDirectoryView.as_view(), name='communities'),
    
    # Notifications
    path('notifications', views.NotificationView.as_view(), name='notifications'),


    # Legacy endpoints for backward compatibility
    path('agreement', views.UserUpdateAgreement.as_view(), name='agreement'),
    path('completedetails', views.CompleteSignupDetails.as_view(), name='completedetails'),
    
    # Admin endpoints
    path('admin/users/', views.AdminUsersView.as_view(), name='admin_users'),
    path('admin/users/<int:user_id>/', views.AdminUserDetailView.as_view(), name='admin_user_detail'),
    path('admin/posts/', views.AdminPostsView.as_view(), name='admin_posts'),
    path('admin/posts/<int:post_id>/', views.AdminPostDetailView.as_view(), name='admin_post_detail'),
    path('admin/messages/', views.AdminMessagesView.as_view(), name='admin_messages'),
    path('admin/messages/<int:message_id>/', views.AdminMessageDetailView.as_view(), name='admin_message_detail'),
    path('admin/notifications/', views.AdminNotificationsView.as_view(), name='admin_notifications'),
    path('admin/notifications/<int:notification_id>/', views.AdminNotificationDetailView.as_view(), name='admin_notification_detail'),

    # Admin
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   