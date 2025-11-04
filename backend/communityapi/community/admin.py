from django.contrib import admin
from .models import User, GroupCon, GroupChat


# Register your models here.

admin.site.register(GroupChat)
admin.site.register(GroupCon)
