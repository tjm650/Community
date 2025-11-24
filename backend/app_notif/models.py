from django.db import models
from api.models import User, CommunityDirectory

def upload_post_images(instance, filename):
    path = f"app_notif/Notif{instance.sender}"
    extension = filename.split(".")[-1]
    if extension:
        path = path + "." + extension
        return path
    
def upload_report_images(instance, filename):
    path = f"app_notif/Report{instance.sender}"
    extension = filename.split(".")[-1]
    if extension:
        path = path + "." + extension
        return path
    

# Create your models here.
class AppNotif(models.Model):
    sender = models.ForeignKey(
        CommunityDirectory, related_name="app_notif_sender", on_delete=models.CASCADE
    )
    
    sender_user = models.ForeignKey(
        User, related_name="app_notif_sender", on_delete=models.CASCADE
    )
    receiver = models.ManyToManyField(
        User, related_name="app_notif_receiver"
    )
    image = models.ImageField(upload_to=upload_post_images, blank=True, null=True)
    
    subject = models.TextField()
    description = models.TextField()
    
    interactions = models.ManyToManyField( 
        User,
        related_name='app_notif_interactions',
    )
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.username + "appNotifId: " + self.description
     
  
  
class AppFeedback(models.Model):
    sender = models.ForeignKey(
        User, related_name="app_feedback_sender", on_delete=models.CASCADE
    )
    attendand = models.ManyToManyField(
        User, related_name="app_feedback_attandand"
    )
    image = models.ImageField(upload_to=upload_report_images, blank=True, null=True)
    red_by = models.ManyToManyField(
        User, related_name="app_feedback_red_by"
    )
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.username + "appfeedbackId: " + self.description



  
    
class AppReport(models.Model):
    sender = models.ForeignKey(
        User, related_name="app_report_sender", on_delete=models.CASCADE
    )
    attendand = models.ManyToManyField(
        User, related_name="app_report_attandand"
    )
    image = models.ImageField(upload_to=upload_report_images, blank=True, null=True)
    red_by = models.ManyToManyField(
        User, related_name="app_report_red_by"
    )
    subject = models.TextField()
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.username + "appReportId: " + self.description
    
    
    
    
