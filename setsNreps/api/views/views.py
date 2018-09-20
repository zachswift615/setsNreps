import datetime
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group
from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework import status
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

class CreateAccount(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(http_method_names=['POST'])
def copy_session(request, pk=None):
    if pk is None:
        return Response(json.dumps({}), status=status.HTTP_400_BAD_REQUEST)
    existing_session = Session.objects.get(pk=pk)
    if existing_session.user_id != request.user.id:
        return Response(json.dumps({}), status=status.HTTP_403_FORBIDDEN)
    # remove primary key and save to copy to a new session
    existing_session.pk = None
    existing_session.save()

    #rename variable bc it makes a new session
    new_session = existing_session
    new_session.date_created = datetime.datetime.utcnow()
    new_session.complete = False
    new_session.name = new_session.name + " (Copy)"
    new_session.save()
    sets_for_existing_session = Set.objects.filter(session_id=pk).all()
    for session_set in sets_for_existing_session:
        session_set.pk = None
        session_set.complete = False
        session_set.session_id = new_session.id
        session_set.save()

    return Response(SessionSerializer(new_session).data)

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
    queryset = Exercise.objects.order_by('name').all()
    serializer_class = ExerciseSerializer


class SessionList(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_queryset(self):
        if self.request.user:
            return Session.objects.filter(user_id=self.request.user.id).order_by('-date_created').all()


class SessionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_queryset(self):
        if self.request.user:
            return Session.objects.filter(user_id=self.request.user.id).order_by('-date_created').all()


class EmptyWorkout(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


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

    def get_queryset(self):
        queryset = Set.objects.all()
        session_id = self.request.query_params.get('session_id', None)
        if session_id is not None:
            queryset = queryset.filter(session_id=session_id)
        return queryset


class SetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, partial=True, **kwargs)


@csrf_exempt
@api_view(http_method_names=['GET'])
def table_friendly_set_list(request):
    table_friendly_sets = []

    session_id = int(request.query_params.get('session_id'))
    sets_for_workout = Set.objects.filter(session_id=session_id).order_by('date_created').all()

    for set in sets_for_workout:
        # check if there's already a top leve dict for this exercise
        set_detail_dict_exists = False
        for detail_dict in table_friendly_sets:
            if set.exercise.name == detail_dict['exercise_name']:
                set_detail_dict_exists = True

        if not set_detail_dict_exists:
            set_detail_dict = {
                'exercise_id': set.exercise.id,
                'exercise_name': set.exercise.name,
                'sets': [

                ],

            }
            table_friendly_sets.append(set_detail_dict)

    for set_detail_dict in table_friendly_sets:
        for set in sets_for_workout:
            if set_detail_dict['exercise_name'] == set.exercise.name:
                set_detail_dict['sets'].append({
                    'weight': set.weight,
                    'reps': set.reps,
                    'session_id': set.session_id,
                    'previous': set.previous,
                    'set_number': set.set_number,
                    'notes': set.notes,
                    'exercise_id': set.exercise_id,
                    'complete': set.complete,
                    'warmup': set.warmup,
                    'id': set.id
                })
    # TODO: sort the exercises and the sets with the oldest at the top
    return Response(table_friendly_sets)


def format_error_response(message):
    return json.dumps({
        'status': 'error',
        'message': message
    })


@csrf_exempt
@api_view(http_method_names=['POST'])
def new_set_from_existing(request):
    body = json.loads(request.body)
    exercise_id = int(body.get('exercise_id'))
    session_id = int(body.get('session_id'))

    if exercise_id is None:
        return Response(format_error_response('missing required field exercise_id'), status=status.HTTP_406_NOT_ACCEPTABLE)

    most_recent_exercise_set = Set.objects.filter(
        warmup=False, complete=True, session__user_id=request.user.id,
        exercise=exercise_id).order_by('-date_created').all()

    if most_recent_exercise_set:
        most_recent_exercise_set = most_recent_exercise_set[0]

        most_recent_is_from_same_workout = most_recent_exercise_set.session_id == session_id

        if most_recent_is_from_same_workout:
            # find other sets in the workout to determine the set number for this one
            new_set_number = most_recent_exercise_set.set_number + 1
        else:
            new_set_number = 1

        new_set = Set(
            date_created=datetime.datetime.utcnow(),
            exercise_id=exercise_id,
            set_number=new_set_number,
            weight=most_recent_exercise_set.weight,
            reps=most_recent_exercise_set.reps,
            warmup=False,
            previous=1,
            complete=False,
            session_id=session_id)
    else:
        new_set = Set(
            date_created=datetime.datetime.utcnow(),
            exercise_id=exercise_id,
            set_number=1,
            previous=1,
            weight=0,
            reps=0,
            session_id=session_id,
            warmup=False,
            complete=False
        )
    new_set.save()
    return Response(SetSerializer(new_set).data)