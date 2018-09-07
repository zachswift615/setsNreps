from rest_framework import generics

from routines.models import MuscleGroup
from routines.models import Exercise
from routines.serializers.serializers import MuscleGroupSerializer, ExerciseSerializer


class MuscleGroupList(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer