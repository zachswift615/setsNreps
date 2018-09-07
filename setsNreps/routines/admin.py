from django.contrib import admin

# Register your models here.
from .models import Session, Exercise, Set, MuscleGroup

admin.site.register(Session)
admin.site.register(Exercise)
admin.site.register(Set)
admin.site.register(MuscleGroup)