from django.db import models

from api.models import User
from afollows.models import Connection

def upload_messages_images(instance, filename):
    path = f'amessage/Messages{instance.sender}'
    extension = filename.split('.')[-1]
    if extension:
        path = path + '.' + extension
        return path

# Create your models here.
class Message(models.Model): 
    connection = models.ForeignKey(
        Connection,
        related_name='messages',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User,
        related_name='my_messages',
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to=upload_messages_images, blank=True, null=True)
    red = models.BooleanField(default=False)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.username + ' ' + self.description
    
class TagedMessage(models.Model):
    message = models.ForeignKey(Message, related_name="taged_message", on_delete=models.CASCADE)
    connection = models.ForeignKey(
        Connection,
        related_name='taged_messages_connection',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.message}Taged a message"

    class Meta:
        ordering = ["-created"]
 
    
    
