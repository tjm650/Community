from django.contrib import admin
from .models import AppFeedback, AppReport, AppNotif

# Register your models here.
admin.site.register(AppNotif)
admin.site.register(AppReport)
admin.site.register(AppFeedback)
# admin.site.register(Notif_like)