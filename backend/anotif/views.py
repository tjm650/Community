from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

from .models import Notif, Notif_like
from .serializers import NotifSerializer

# Create your views here.
class NotifViewSet(viewsets.ModelViewSet):
    queryset = Notif.objects.all().prefetch_related('likes').distinct()
    serializer_class = NotifSerializer
   # event_queryset = Event.objects.all()
    
    def create(self, request, *args, **kwargs):
        sender = request.data['sender']
        name = request.data['name']
        update_type = request.data['update_type']
        description = request.data['description']
        image = request.data['image']
        likes = request.data['likes']

        Notif.objects.create(
         sender=sender, 
         name=name, 
         update_type=update_type, 
         description=description, 
         image=image,
         likes=likes
         )
        return   Response("Notif Created Successfully", status=status.HTTP_200_OK)

class ToggleLikeView(viewsets.ModelViewSet):
    queryset = Notif_like.objects.all().prefetch_related('user').distinct()
    def create(self, request, *args, **kwargs):
        user = request.data['user']
        post = request.data['post']
        updated = request.data['updated']
        created = request.data['created']
        

        Notif_like.objects.create(
         user=user, 
         post=[post], 
         updated=updated, 
         created=created,
         )
        
        return   Response("NotifLike Created Successfully", status=status.HTTP_200_OK)
        