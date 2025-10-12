from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
  list_display = ('id', 'username', 'email', 'role')

admin.site.register(Review)
admin.site.register(Comment)