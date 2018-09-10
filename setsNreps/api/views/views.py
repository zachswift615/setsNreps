from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

from api.models import MuscleGroup
from api.models import Exercise
from api.models import Session
from api.models import Set
from api.serializers.serializers import MuscleGroupSerializer, ExerciseSerializer, SessionSerializer, SetSerializer


class MuscleGroupList(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class SessionList(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class SetList(generics.ListCreateAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer
