from rest_framework import serializers
from routines.models import MuscleGroup

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('name', 'id',)

# class ExerciseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
#
# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
#
# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ('id', 'title', 'code', 'linenos', 'language', 'style')