from rest_framework import serializers
from api.models import MuscleGroup, Exercise, Session, Set

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'name',)

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'muscle_groups',)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id', 'notes', 'name', 'weight', 'warmup', 'complete', 'user')

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ('id', 'notes', 'warmup', 'exercise', 'previous', 'weight', 'reps', 'reps', 'complete')