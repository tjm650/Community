from django.contrib import admin
from .models import Notif, Comment, Poll

# Register your models here.
admin.site.register(Notif)
admin.site.register(Comment)
admin.site.register(Poll)
# admin.site.register(Notif_like)