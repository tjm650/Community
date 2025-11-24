from django.urls import path

from . import consumers



websocket_urlpatterns = [
    path('api/', consumers.ChatConsumers.as_asgi()),
]
 