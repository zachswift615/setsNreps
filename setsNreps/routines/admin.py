from django.contrib import admin

# Register your models here.
from .models import Session, Exercise, Set, User, MuscleGroup

admin.site.register(Session)
admin.site.register(Exercise)
admin.site.register(Set)
admin.site.register(User)
admin.site.register(MuscleGroup)