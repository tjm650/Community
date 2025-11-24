from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from django.db.models import Q, Count, Avg, F
from django.utils import timezone
from django.core.paginator import Paginator
from django.http import Http404
import json
import logging
from datetime import datetime, timedelta
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User, UserPreference, UserAnalytics, CommunityDirectory, Message, Notification, UserSession
from .serializers import (
    UserSerializer, CommunityDirectorySerializer, MessageSerializer, NotificationSerializer,
    AdminPostSerializer, AdminCommentSerializer, AdminMessageSerializer, AdminNotificationSerializer
)
from auserpost.models import Post, Comment
from amessages.models import Message as MessageModel

logger = logging.getLogger(__name__)
 
class BaseAPIView(APIView):
    """Base API view with common functionality"""
    
    def handle_exception(self, exc):
        """Custom exception handler for better error responses"""
        if isinstance(exc, ValidationError):
            return Response({
                'error': 'Validation Error',
                'details': exc.messages
            }, status=status.HTTP_400_BAD_REQUEST)
        
        logger.error(f"API Error: {str(exc)}")
        return Response({
            'error': 'Internal Server Error',
            'message': 'Something went wrong. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserSignIn(BaseAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return Response({
                    'error': 'Missing credentials',
                    'message': 'Username and password are required'
                }, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=username, password=password)
            
            if user is None:
                return Response({
                    'error': 'Invalid credentials',
                    'message': 'Username or password is incorrect'
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            if not user.is_active:
                return Response({
                    'error': 'Account disabled',
                    'message': 'Your account has been disabled'
                }, status=status.HTTP_403_FORBIDDEN)
            
            # Update user analytics
            analytics, created = UserAnalytics.objects.get_or_create(user=user)
            analytics.total_logins += 1
            analytics.last_login = timezone.now()
            analytics.save()
            
            # Update online status
            user.is_online = True
            user.last_seen = timezone.now()
            user.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Create or update session
            session_id = str(refresh.access_token)
            UserSession.objects.filter(user=user, is_active=True).update(is_active=False)
            UserSession.objects.create(
                user=user,
                session_id=session_id,
                device_info=request.META.get('HTTP_USER_AGENT', ''),
                ip_address=request.META.get('REMOTE_ADDR'),
                expires_at=timezone.now() + timedelta(days=7)
            )
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                },
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return Response({
                'error': 'Login failed',
                'message': 'An error occurred during login'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserSignUp(BaseAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = json.loads(request.body)
            
            # Validate required fields
            required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
            for field in required_fields:
                if not data.get(field):
                    return Response({
                        'error': 'Missing required field',
                        'message': f'{field} is required'
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if user already exists
            if User.objects.filter(username=data['username']).exists():
                return Response({
                    'error': 'Username taken',
                    'message': 'This username is already taken'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if User.objects.filter(email=data['email']).exists():
                return Response({
                    'error': 'Email taken',
                    'message': 'This email is already registered'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create user
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name']
            )
            
            # Create user preferences
            UserPreference.objects.create(user=user)
            
            # Create user analytics
            UserAnalytics.objects.create(user=user)
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                },
                'message': 'Account created successfully'
            }, status=status.HTTP_201_CREATED)
            
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Signup error: {str(e)}")
            return Response({
                'error': 'Signup failed',
                'message': 'An error occurred during signup'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserLogout(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Update user status
            user = request.user
            user.is_online = False
            user.last_seen = timezone.now()
            user.save()
            
            # Deactivate sessions
            UserSession.objects.filter(user=user, is_active=True).update(is_active=False)
            
            # Blacklist refresh token if provided
            data = json.loads(request.body) if request.body else {}
            refresh_token = data.get('refresh')
            
            if refresh_token:
                try:
                    token = RefreshToken(refresh_token)
                    token.blacklist()
                except TokenError:
                    pass  # Token might already be invalid
            
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            return Response({
                'error': 'Logout failed',
                'message': 'An error occurred during logout'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfile(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username=None):
        try:
            if username:
                user = User.objects.get(username=username)
            else:
                user = request.user
            
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({
                'error': 'User not found',
                'message': 'The requested user does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Profile fetch error: {str(e)}")
            return Response({
                'error': 'Profile fetch failed',
                'message': 'An error occurred while fetching profile'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request):
        try:
            user = request.user
            data = json.loads(request.body)
            
            # Update allowed fields
            allowed_fields = [
                'first_name', 'last_name', 'bio', 'profession', 
                'prof_initial', 'program', 'service_name', 'cell',
                'location', 'website', 'theme_preference', 'language'
            ]
            
            for field in allowed_fields:
                if field in data:
                    setattr(user, field, data[field])
            
            user.save()

            return Response({
                'user': UserSerializer(user).data,
                'message': 'Profile updated successfully'
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Profile update error: {str(e)}")
            return Response({
                'error': 'Profile update failed',
                'message': 'An error occurred while updating profile'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserPreferences(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            preferences, created = UserPreference.objects.get_or_create(user=request.user)
            return Response({
                'preferences': {
                    'email_notifications': preferences.email_notifications,
                    'push_notifications': preferences.push_notifications,
                    'sms_notifications': preferences.sms_notifications,
                    'profile_visibility': preferences.profile_visibility,
                    'show_online_status': preferences.show_online_status,
                    'allow_messages_from': preferences.allow_messages_from,
                    'auto_play_videos': preferences.auto_play_videos,
                    'show_trending_content': preferences.show_trending_content,
                    'content_language': preferences.content_language,
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Preferences fetch error: {str(e)}")
            return Response({
                'error': 'Preferences fetch failed',
                'message': 'An error occurred while fetching preferences'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request):
        try:
            data = json.loads(request.body)
            preferences, created = UserPreference.objects.get_or_create(user=request.user)
            
            # Update preferences
            for field, value in data.items():
                if hasattr(preferences, field):
                    setattr(preferences, field, value)
            
            preferences.save()
            
            return Response({
                'message': 'Preferences updated successfully'
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Preferences update error: {str(e)}")
            return Response({
                'error': 'Preferences update failed',
                'message': 'An error occurred while updating preferences'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserAnalyticsView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            analytics, created = UserAnalytics.objects.get_or_create(user=request.user)
            
            return Response({
                'analytics': {
                    'total_logins': analytics.total_logins,
                    'last_login': analytics.last_login,
                    'total_session_time': analytics.total_session_time,
                    'average_session_time': analytics.average_session_time,
                    'posts_created': analytics.posts_created,
                    'comments_made': analytics.comments_made,
                    'likes_given': analytics.likes_given,
                    'likes_received': analytics.likes_received,
                    'connections_made': analytics.connections_made,
                    'messages_sent': analytics.messages_sent,
                    'messages_received': analytics.messages_received,
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Analytics fetch error: {str(e)}")
            return Response({
                'error': 'Analytics fetch failed',
                'message': 'An error occurred while fetching analytics'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserCommunities(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            communities = CommunityDirectory.objects.filter(
                Q(creator=user) | Q(followers=user)
            ).distinct()
            
            serializer = CommunityDirectorySerializer(communities, many=True)
            return Response({
                'communities': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"User communities fetch error: {str(e)}")
            return Response({
                'error': 'Communities fetch failed',
                'message': 'An error occurred while fetching communities'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserConnections(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            # This is a placeholder - implement actual connection logic
            return Response({
                'connections': [],
                'followers': [],
                'following': []
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"User connections fetch error: {str(e)}")
            return Response({
                'error': 'Connections fetch failed',
                'message': 'An error occurred while fetching connections'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CommunityDirectoryView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            limit = min(int(request.GET.get('limit', 20)), 100)
            category = request.GET.get('category')
            search = request.GET.get('search')
            
            queryset = CommunityDirectory.objects.filter(is_active=True)
            
            if category:
                queryset = queryset.filter(category=category)
            
            if search:
                queryset = queryset.filter(
                    Q(username__icontains=search) |
                    Q(directory_status1__icontains=search) |
                    Q(bio__icontains=search)
                )
            
            # Order by featured first, then by creation date
            queryset = queryset.order_by('-is_featured', '-created')
            
            paginator = Paginator(queryset, limit)
            communities = paginator.get_page(page)
            
            serializer = CommunityDirectorySerializer(communities, many=True)
            
            return Response({
                'communities': serializer.data,
                'pagination': {
                    'current_page': page,
                    'total_pages': paginator.num_pages,
                    'total_count': paginator.count,
                    'has_next': communities.has_next(),
                    'has_previous': communities.has_previous(),
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Communities fetch error: {str(e)}")
            return Response({
                'error': 'Communities fetch failed',
                'message': 'An error occurred while fetching communities'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class NotificationView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            limit = min(int(request.GET.get('limit', 20)), 100)
            unread_only = request.GET.get('unread_only', 'false').lower() == 'true'
            
            queryset = Notification.objects.filter(recipient=request.user)
            
            if unread_only:
                queryset = queryset.filter(is_read=False)
            
            paginator = Paginator(queryset, limit)
            notifications = paginator.get_page(page)
            
            serializer = NotificationSerializer(notifications, many=True)
            
            return Response({
                'notifications': serializer.data,
                'pagination': {
                    'current_page': page,
                    'total_pages': paginator.num_pages,
                    'total_count': paginator.count,
                    'has_next': notifications.has_next(),
                    'has_previous': notifications.has_previous(),
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Notifications fetch error: {str(e)}")
            return Response({
                'error': 'Notifications fetch failed',
                'message': 'An error occurred while fetching notifications'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request):
        try:
            data = json.loads(request.body)
            notification_ids = data.get('notification_ids', [])
            mark_all = data.get('mark_all', False)
            
            if mark_all:
                Notification.objects.filter(
                    recipient=request.user,
                    is_read=False
                ).update(is_read=True, read_at=timezone.now())
            elif notification_ids:
                Notification.objects.filter(
                    id__in=notification_ids,
                    recipient=request.user
                ).update(is_read=True, read_at=timezone.now())
            
            return Response({
                'message': 'Notifications marked as read'
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Notification update error: {str(e)}")
            return Response({
                'error': 'Notification update failed',
                'message': 'An error occurred while updating notifications'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            query = request.GET.get('q', '').strip()
            search_type = request.GET.get('type', 'all')  # all, users, communities, posts
            page = int(request.GET.get('page', 1))
            limit = min(int(request.GET.get('limit', 20)), 100)
            
            if not query or len(query) < 2:
                return Response({
                    'error': 'Invalid search query',
                    'message': 'Search query must be at least 2 characters long'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            results = {
                'users': [],
                'communities': [],
                'posts': []
            }
            
            if search_type in ['all', 'users']:
                users = User.objects.filter(
                    Q(username__icontains=query) |
                    Q(first_name__icontains=query) |
                    Q(last_name__icontains=query) |
                    Q(bio__icontains=query)
                ).filter(is_active=True)[:limit]
                results['users'] = UserSerializer(users, many=True).data
            
            if search_type in ['all', 'communities']:
                communities = CommunityDirectory.objects.filter(
                    Q(username__icontains=query) |
                    Q(directory_status1__icontains=query) |
                    Q(bio__icontains=query)
                ).filter(is_active=True)[:limit]
                results['communities'] = CommunityDirectorySerializer(communities, many=True).data
            
            return Response({
                'query': query,
                'results': results,
                'total_results': sum(len(v) for v in results.values())
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Search error: {str(e)}")
            return Response({
                'error': 'Search failed',
                'message': 'An error occurred during search'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TrendingView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            # This is a placeholder - implement actual trending logic
            trending_data = {
                'trending': [
                    {'id': 1, 'title': 'Trending Topic 1', 'type': 'topic'},
                    {'id': 2, 'title': 'Trending Topic 2', 'type': 'topic'},
                    {'id': 3, 'title': 'Trending Topic 3', 'type': 'topic'},
                ]
            }
            
            return Response(trending_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Trending fetch error: {str(e)}")
            return Response({
                'error': 'Trending fetch failed',
                'message': 'An error occurred while fetching trending data'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Legacy views for backward compatibility
class UserSignInLegacy(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        return UserSignIn().post(request)

class UserSignUpLegacy(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        return UserSignUp().post(request)

class UserLogoutLegacy(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        return UserLogout().post(request)

class UserUpdateAgreement(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            user = request.user
            user.agreement = data.get('agreement', False)
            user.save()

            return Response({
                'message': 'Agreement updated successfully',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Agreement update error: {str(e)}")
            return Response({
                'error': 'Agreement update failed',
                'message': 'An error occurred while updating agreement'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CompleteSignupDetails(BaseAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            user = request.user
            
            # Update user details
            allowed_fields = ['bio', 'profession', 'prof_initial', 'program', 'service_name', 'cell']
            for field in allowed_fields:
                if field in data:
                    setattr(user, field, data[field])
            
            user.save()
            
            return Response({
                'message': 'Details completed successfully',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response({
                'error': 'Invalid JSON',
                'message': 'Request body must be valid JSON'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Complete details error: {str(e)}")
            return Response({
                'error': 'Complete details failed',
                'message': 'An error occurred while completing details'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Admin views for admin panel
class AdminUsersView(BaseAPIView):
    permission_classes = [IsAuthenticated]  # In production, add admin-only permission

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = min(int(request.GET.get('page_size', 20)), 100)
            search = request.GET.get('search', '').strip()
            verified = request.GET.get('verified')
            is_active = request.GET.get('is_active')
            is_suspended = request.GET.get('is_suspended')
            created_after = request.GET.get('created_after')
            created_before = request.GET.get('created_before')

            queryset = User.objects.all()

            if search:
                queryset = queryset.filter(
                    Q(username__icontains=search) |
                    Q(first_name__icontains=search) |
                    Q(last_name__icontains=search) |
                    Q(email__icontains=search)
                )

            if verified is not None:
                queryset = queryset.filter(verified=verified.lower() == 'true')

            if is_active is not None:
                queryset = queryset.filter(is_active=is_active.lower() == 'true')

            if is_suspended is not None:
                queryset = queryset.filter(is_suspended=is_suspended.lower() == 'true')

            if created_after:
                queryset = queryset.filter(date_joined__gte=created_after)

            if created_before:
                queryset = queryset.filter(date_joined__lte=created_before)

            paginator = Paginator(queryset, page_size)
            users = paginator.get_page(page)

            serializer = UserSerializer(users, many=True)

            return Response({
                'count': paginator.count,
                'next': f'?page={users.next_page_number}' if users.has_next() else None,
                'previous': f'?page={users.previous_page_number}' if users.has_previous() else None,
                'results': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Admin users fetch error: {str(e)}")
            return Response({
                'error': 'Failed to fetch users',
                'message': 'An error occurred while fetching users'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            data = json.loads(request.body)
            # Create user logic here
            return Response({
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Admin user create error: {str(e)}")
            return Response({
                'error': 'Failed to create user',
                'message': 'An error occurred while creating user'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminUserDetailView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin user detail error: {str(e)}")
            return Response({
                'error': 'Failed to fetch user'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body)

            # Update user fields
            for field in ['verified', 'is_active', 'is_suspended', 'first_name', 'last_name', 'email']:
                if field in data:
                    setattr(user, field, data[field])

            user.save()
            serializer = UserSerializer(user)
            return Response({
                'user': serializer.data,
                'message': 'User updated successfully'
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin user update error: {str(e)}")
            return Response({
                'error': 'Failed to update user'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({
                'message': 'User deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin user delete error: {str(e)}")
            return Response({
                'error': 'Failed to delete user'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminPostsView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = min(int(request.GET.get('page_size', 20)), 100)
            search = request.GET.get('search', '').strip()
            sender = request.GET.get('sender')
            created_after = request.GET.get('created_after')
            created_before = request.GET.get('created_before')

            queryset = Post.objects.all().order_by('-created')

            if search:
                queryset = queryset.filter(description__icontains=search)

            if sender:
                queryset = queryset.filter(sender_id=sender)

            if created_after:
                queryset = queryset.filter(created__gte=created_after)

            if created_before:
                queryset = queryset.filter(created__lte=created_before)

            paginator = Paginator(queryset, page_size)
            posts = paginator.get_page(page)

            serializer = AdminPostSerializer(posts, many=True)

            return Response({
                'count': paginator.count,
                'next': f'?page={posts.next_page_number}' if posts.has_next() else None,
                'previous': f'?page={posts.previous_page_number}' if posts.has_previous() else None,
                'results': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Admin posts fetch error: {str(e)}")
            return Response({
                'error': 'Failed to fetch posts'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminPostDetailView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            post.delete()
            return Response({
                'message': 'Post deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response({
                'error': 'Post not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin post delete error: {str(e)}")
            return Response({
                'error': 'Failed to delete post'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminMessagesView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = min(int(request.GET.get('page_size', 20)), 100)
            search = request.GET.get('search', '').strip()
            sender = request.GET.get('sender')
            created_after = request.GET.get('created_after')
            created_before = request.GET.get('created_before')

            queryset = MessageModel.objects.all().order_by('-created')

            if search:
                queryset = queryset.filter(description__icontains=search)

            if sender:
                queryset = queryset.filter(sender_id=sender)

            if created_after:
                queryset = queryset.filter(created__gte=created_after)

            if created_before:
                queryset = queryset.filter(created__lte=created_before)

            paginator = Paginator(queryset, page_size)
            messages = paginator.get_page(page)

            serializer = AdminMessageSerializer(messages, many=True)

            return Response({
                'count': paginator.count,
                'next': f'?page={messages.next_page_number}' if messages.has_next() else None,
                'previous': f'?page={messages.previous_page_number}' if messages.has_previous() else None,
                'results': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Admin messages fetch error: {str(e)}")
            return Response({
                'error': 'Failed to fetch messages'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminMessageDetailView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, message_id):
        try:
            message = MessageModel.objects.get(id=message_id)
            message.delete()
            return Response({
                'message': 'Message deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except MessageModel.DoesNotExist:
            return Response({
                'error': 'Message not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin message delete error: {str(e)}")
            return Response({
                'error': 'Failed to delete message'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminNotificationsView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = min(int(request.GET.get('page_size', 20)), 100)
            search = request.GET.get('search', '').strip()
            sender = request.GET.get('sender')
            update_type = request.GET.get('update_type')
            created_after = request.GET.get('created_after')
            created_before = request.GET.get('created_before')

            queryset = Notification.objects.all().order_by('-created')

            if search:
                queryset = queryset.filter(description__icontains=search)

            if sender:
                queryset = queryset.filter(sender_id=sender)

            if update_type:
                queryset = queryset.filter(update_type=update_type)

            if created_after:
                queryset = queryset.filter(created__gte=created_after)

            if created_before:
                queryset = queryset.filter(created__lte=created_before)

            paginator = Paginator(queryset, page_size)
            notifications = paginator.get_page(page)

            serializer = AdminNotificationSerializer(notifications, many=True)

            return Response({
                'count': paginator.count,
                'next': f'?page={notifications.next_page_number}' if notifications.has_next() else None,
                'previous': f'?page={notifications.previous_page_number}' if notifications.has_previous() else None,
                'results': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Admin notifications fetch error: {str(e)}")
            return Response({
                'error': 'Failed to fetch notifications'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminNotificationDetailView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, notification_id):
        try:
            notification = Notification.objects.get(id=notification_id)
            notification.delete()
            return Response({
                'message': 'Notification deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except Notification.DoesNotExist:
            return Response({
                'error': 'Notification not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Admin notification delete error: {str(e)}")
            return Response({
                'error': 'Failed to delete notification'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
