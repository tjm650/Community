from django.db import models

from api.models import User


def upload_post_images(instance, filename):
    path = f"auserpost/Posts{instance.sender}"
    extension = filename.split(".")[-1]
    if extension:
        path = path + "." + extension
        return path


# Create your models here.
class Post(models.Model):
    sender = models.ForeignKey(
        User, related_name="post_sender", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to=upload_post_images, blank=True, null=True)
    description = models.TextField()
    interactions = models.ManyToManyField( 
        User,
        related_name='post_interactions',
    )
    likes = models.ManyToManyField(
        User,
        related_name="post_likes",
    )
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.sender.username + "postId: " + self.description


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    description = models.TextField()
    interactions = models.ManyToManyField( 
        User,
        related_name='comment_interactions',
    )
    likes = models.ManyToManyField(User, related_name="comment_likes", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"Comment by {self.sender.username} on {self.post.id}"

    class Meta:
        ordering = ["-created"]
