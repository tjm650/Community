from django.db import models

# Create your models here.
# file: consumer_view/notification_view.py
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.core.serializers import serialize
from django.utils import timezone
import json
from asgiref.sync import async_to_sync

from api.models import CommunityDirectory, User
from auserpost.models import Post


# UPDATE_TYPES = [
#     ('PostLike', 'PostLike'),
#     ('PostComment', 'PostComment'),
#     ('FOR', 'Forumn')
# ]


class Notif_user_post_liked(models.Model):
    interactor = models.ForeignKey(
        User, related_name="auserpost_who_liked", on_delete=models.CASCADE
    )
    notif_type = models.CharField(max_length=50, default="")
    description = models.TextField()
    post = models.ForeignKey(
        Post, related_name="auserpost_liked", on_delete=models.CASCADE
    )
    red = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.interactor.username + "notifId: " + self.id
    
    
class Notif_user_post_commented(models.Model):
    interactor = models.ForeignKey(
        User, related_name="auserpost_who_commented", on_delete=models.CASCADE
    )
    notif_type = models.CharField(max_length=50, default="")
    description = models.TextField()
    post = models.ForeignKey(
        Post, related_name="auserpost_commented", on_delete=models.CASCADE
    )
    red = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.interactor.username + "notifId: " + self.notif_type


class Notif_user(models.Model):
    NOTIFICATION_TYPES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('message', 'Message'),
        ('blog', 'Blog'),
        ('user_post', 'User Post'),
        ('service_post', 'Service Post'),
        ('accommodation', 'Accommodation'),
    )
    
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notif_user_recipient')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notif_user_sender")
    notif_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    description = models.TextField()
    related_id = models.PositiveIntegerField()  
    is_read = models.BooleanField(default=False)
    content_type = models.CharField(max_length=50)  
    extra_data = models.JSONField(default=dict)  
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return f"{self.sender.username} -> {self.recipient.username}: {self.notif_type}"
    
