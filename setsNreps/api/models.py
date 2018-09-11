from django.db import models

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
    complete = models.BooleanField(default=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return f' warmup: {self.name}, complete: {self.complete}'

class Set(models.Model):
    notes = models.TextField(max_length=255, null=True, blank=True)
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE)
    previous = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    warmup = models.BooleanField(default=True)
    complete = models.BooleanField(default=True)
    reps = models.PositiveIntegerField()
    order = models.PositiveIntegerField()
    session = models.ForeignKey('Session', on_delete=models.CASCADE)

    def __str__(self):
        return f' warmup: self.notes, {self.warmup}, self.name, previous: {self.previous}, weight: {self.weight}, reps: {self.reps}, complete: {self.complete}'


