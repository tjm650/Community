from django.contrib import admin
from .models import Notif_user_post_liked, Notif_user_post_commented, Notif_user

# Register your models here.
admin.site.register(Notif_user_post_liked)
admin.site.register(Notif_user_post_commented)
admin.site.register(Notif_user)
