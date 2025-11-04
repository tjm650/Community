from django.contrib import admin
from .models import Message, TagedMessage

# Register your models here.
admin.site.register(Message)
admin.site.register(TagedMessage)
# admin.site.register(Notif_like)