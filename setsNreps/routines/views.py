from rest_framework import generics

from routines.models import MuscleGroup
from routines.models import Exercise
from routines.models import Session
from routines.models import Set
from routines.serializers.serializers import MuscleGroupSerializer, ExerciseSerializer, SessionSerializer, SetSerializer


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