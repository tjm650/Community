from django.http import JsonResponse
from django.core.cache import cache
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

class QuercusRateLimitMiddleware:
    """Rate limiting middleware for Quercus AI endpoints with enhanced configuration"""

    def __init__(self, get_response):
        self.get_response = get_response

        # Load rate limits from settings or use defaults
        self.rate_limits = getattr(settings, 'QUERCUS_RATE_LIMITS', {
            'AI_GENERATE': {'requests': 20, 'window_minutes': 60},
            'IMAGE_ANALYZE': {'requests': 5, 'window_minutes': 60},
            'DOCUMENT_ANALYZE': {'requests': 10, 'window_minutes': 60},
            'STUDY_PLAN': {'requests': 15, 'window_minutes': 60},
            'CAREER_GUIDANCE': {'requests': 10, 'window_minutes': 60},
            'CONVERSATION_EXPORT': {'requests': 5, 'window_minutes': 60},
        })

    def __call__(self, request):
        # Only apply rate limiting to Quercus endpoints
        if not request.path.startswith('/api/quercus/'):
            return self.get_response(request)

        # Get endpoint type from URL
        endpoint = self._get_endpoint_type(request.path)

        if endpoint and self._is_rate_limited(request.user, endpoint):
            return JsonResponse({
                'success': False,
                'error': 'Rate limit exceeded',
                'message': f'Too many requests. Please try again later.',
                'retry_after': self._get_retry_after(request.user, endpoint)
            }, status=429)

        response = self.get_response(request)
        return response

    def _get_endpoint_type(self, path):
        """Extract endpoint type from request path"""
        if '/ai/generate/' in path:
            return 'ai_generate'
        elif '/image/analyze/' in path:
            return 'image_analyze'
        elif '/document/analyze/' in path:
            return 'document_analyze'
        elif '/study/plan/' in path:
            return 'study_plan'
        elif '/career/guidance/' in path:
            return 'career_guidance'
        return None

    def _is_rate_limited(self, user, endpoint):
        """Check if user has exceeded rate limit"""
        if not user.is_authenticated:
            return False

        cache_key = f"quercus_rate_limit:{user.id}:{endpoint}"
        current_time = timezone.now()

        # Get or create rate limit data
        rate_data = cache.get(cache_key)

        if rate_data is None:
            # First request in window
            rate_data = {
                'count': 1,
                'window_start': current_time,
                'requests': []
            }
            cache.set(cache_key, rate_data, self.rate_limits[endpoint]['window_minutes'] * 60)
            return False

        # Check if we're in a new window
        window_start = rate_data['window_start']
        window_duration = timedelta(minutes=self.rate_limits[endpoint]['window_minutes'])

        if current_time - window_start > window_duration:
            # New window started
            rate_data = {
                'count': 1,
                'window_start': current_time,
                'requests': [current_time]
            }
            cache.set(cache_key, rate_data, self.rate_limits[endpoint]['window_minutes'] * 60)
            return False

        # Check if limit exceeded
        max_requests = self.rate_limits[endpoint]['requests']
        if rate_data['count'] >= max_requests:
            return True

        # Increment counter
        rate_data['count'] += 1
        rate_data['requests'].append(current_time)

        # Keep only recent requests (sliding window)
        cutoff_time = current_time - window_duration
        rate_data['requests'] = [req_time for req_time in rate_data['requests'] if req_time > cutoff_time]

        cache.set(cache_key, rate_data, self.rate_limits[endpoint]['window_minutes'] * 60)
        return False

    def _get_retry_after(self, user, endpoint):
        """Get retry after time in seconds"""
        cache_key = f"quercus_rate_limit:{user.id}:{endpoint}"
        rate_data = cache.get(cache_key)

        if rate_data:
            window_start = rate_data['window_start']
            window_duration = timedelta(minutes=self.rate_limits[endpoint]['window_minutes'])
            retry_time = window_start + window_duration
            remaining_seconds = int((retry_time - timezone.now()).total_seconds())
            return max(remaining_seconds, 0)

        return 60