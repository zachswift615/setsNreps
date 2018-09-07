from rest_framework import generics

from routines.models import MuscleGroup
from routines.serializers.serializers import MuscleGroupSerializer


class MuscleGroupList(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer
