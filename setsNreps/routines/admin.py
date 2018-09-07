from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Session)
admin.site.register(models.Exercise)
admin.site.register(models.Set)
admin.site.register(models.User)