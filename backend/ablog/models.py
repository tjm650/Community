from django.db import models
from django.contrib.auth.models import AbstractUser
from api.models import User, CommunityDirectory

def upload_post_images(instance, filename):
    path = f'ablog/Blogs{instance.sender}'
    extension = filename.split('.')[-1]
    if extension:
        path = path + '.' + extension
        return path
    
    
# Create your models here.   
class Bloger(models.Model):
    sender = models.ForeignKey(
        User,
        related_name='blog_sender',
        on_delete=models.CASCADE
    )
    image = models.ImageField( upload_to= upload_post_images, blank=True, null=True, max_length=255)
    description = models.TextField(max_length=1500)
    tags = models.ManyToManyField(User, related_name="tags", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    service = models.ForeignKey(
        CommunityDirectory,
        related_name='dept_name',
        on_delete=models.CASCADE,
    )
    interactions = models.ManyToManyField( 
        User,
        related_name='blog_interactions', 
        
    )
    shared = models.ManyToManyField( 
        User,
        related_name='shared_interaction',
    )

    def __str__(self):
        return  self.sender.username + ' -> ' + self.description
    

    
   
 
     
    
 