from django.db import models
from api.models import User

# Create your models here.
def upload_images(instance, filename):
    path = f'community/{instance.username}'
    extension = filename.split('.')[-1]
    if extension:
        path = path + '.' + extension
        return path
    
class GroupCon(models.Model):
    name = models.CharField(max_length=225)
    creator = models.ForeignKey(
        User,
        related_name='create_connection',
        on_delete=models.CASCADE
    )
    users = models.ManyToManyField(
        User,
        related_name='receive_join',
    )
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name 
    
    
class GroupChat(models.Model):
    connection = models.ForeignKey(
        GroupCon,
        related_name='group_chats',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User,
        related_name='client_chats',
        on_delete=models.CASCADE
    )
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.username + ' ' + self.text
    
