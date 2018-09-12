from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.utils import json
from rest_framework import viewsets
from api.models import MuscleGroup
from api.models import Exercise
from api.models import Session
from api.models import Set
from api.serializers.serializers import (
    MuscleGroupSerializer,
    ExerciseSerializer,
    SessionSerializer,
    SetSerializer,
    UserSerializer,
    GroupSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class MuscleGroupList(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer

class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class SessionList(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class SessionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class EmptyWorkout(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    # def perform_create(self, serializer):
    #     print(self.request.user)
    #     serializer.save(user=self.request.user)

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

@csrf_exempt
@api_view(http_method_names=['POST'])
def new_set(request):
    # import pdb; pdb.set_trace()
    # Get all the params from the post body
    session_id = request.data.get('session_id')
    exercise_id = request.data.get('exercise_id')
    reps = request.data.get('reps', 1)
    previous = request.data.get('previous', 1)
    set_number = request.data.get('set_number')
    weight = request.data.get('weight')

    # Create a new Set from the post body data
    new_set = Set(
        session_id=session_id,
        weight=weight,
        exercise_id=exercise_id,
        reps=reps,
        set_number=set_number,
        previous=previous
    )
    new_set.save()
    return HttpResponse(json.dumps(SetSerializer(new_set).data))

class SetList(generics.ListCreateAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer


class SetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

