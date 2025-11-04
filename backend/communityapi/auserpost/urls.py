from django.contrib import admin
from django.urls import path, include
from .views import PostViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

# PostList, PostDetails, post_list, post_details


router = DefaultRouter()
router.register('Post', PostViewSet, basename='Post')
urlpatterns = [
    path('', include(router.urls)),
    # path('sign/', Sign.as_view()),
    # path('sign/<int:id>', Sign.as_view()),
    # path('posts', PostListList.as_view()),
    # path('posts/<int:id>', PostDetails.as_view()),
    path('admin/', admin.site.urls),
    # path('posts', post_list),
    # path('posts/<int:pk>', post_details),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
            
