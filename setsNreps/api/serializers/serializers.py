from rest_framework import serializers
from django.contrib.auth.models import User, Group
from api.models import MuscleGroup, Exercise, Session, Set
from rest_framework.validators import UniqueValidator



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


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
        fields = ('id', 'notes', 'name', 'date_created', 'complete', 'user')

class SetSerializer(serializers.ModelSerializer):
    # exercise_id = serializers.PrimaryKeyRelatedField(read_only=True)
    # session_id = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Set
        fields = (
            'id',
            'notes',
            'warmup',
            'exercise_id',
            'previous',
            'weight',
            'reps',
            'session_id',
            'date_created',
            'complete'
        )