from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

# Health check view
def health_check(request):
    return JsonResponse({"status": "healthy", "service": "Django Backend"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),  # Add this line
    path('api/', include('api.urls')),
    path('ablog/', include('ablog.urls')),
    path('app_notif/', include('app_notif.urls')),
    path('asearch/', include('asearch.urls')),
    path('auserpost/', include('auserpost.urls')),
    path('ausernotif/', include('ausernotif.urls')),
    path('afollows/', include('afollows.urls')),
    path('anotif/', include('anotif.urls')),
    path('amessages/', include('amessages.urls')),
    path('amonetization/', include('amonetization.urls')),
    path('community/', include('community.urls')),
    path('quercus/', include('quercus.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
