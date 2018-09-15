from django.db import models
from django.conf import settings
# from django.contrib.auth.models import get_user_model

from django.contrib.auth.models import User

class MuscleGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    muscle_groups = models.ManyToManyField(MuscleGroup)

    def __str__(self):
        return self.name

class Session(models.Model):
    notes = models.TextField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=100)
    complete = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f' id: {self.id},warmup: {self.name}, complete: {self.complete}'

class Set(models.Model):
    notes = models.TextField(max_length=255, null=True, blank=True)
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE)
    previous = models.IntegerField()
    weight = models.IntegerField()
    warmup = models.BooleanField(default=True)
    complete = models.BooleanField(default=True)
    reps = models.IntegerField()
    set_number = models.IntegerField(null=True, blank=True)
    session = models.ForeignKey('Session', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'previous: {self.previous}, weight: {self.weight}, reps: {self.reps}, complete: {self.complete}'


