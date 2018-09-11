from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.utils import json

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

class SessionDetail(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class EmptyWorkout(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)

@csrf_exempt
@api_view(http_method_names=['POST'])
def new_workout(request):
    print(request.user)
    workout_name = request.POST.get('name')
    if workout_name is None:
        workout_name = 'New Workout'
    new_session = Session(name=workout_name, user=request.user)
    new_session.save()
    return HttpResponse(json.dumps(SessionSerializer(new_session).data))

class SetList(generics.ListCreateAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

