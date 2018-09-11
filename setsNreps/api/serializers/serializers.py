from rest_framework import serializers
from api.models import MuscleGroup, Exercise, Session, Set

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'name',)

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'muscle_groups')

class SessionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('_user')

    def _user(self, obj):
        request = getattr(self.context, 'request', None)
        if request:
            return request.user
    class Meta:
        model = Session
        fields = ('id', 'notes', 'name', 'complete', 'user')

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ('id', 'notes', 'warmup', 'exercise', 'previous', 'weight', 'reps', 'reps', 'complete')