"""setsNreps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework import routers
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import include

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)


urlpatterns = [
    path(r'^api/', include(router.urls)),
    path(r'^', include(router.urls)),
    path('admin/', admin.site.urls),

    path('api/muscle_groups/', views.MuscleGroupList.as_view()),
    path('api/exercises/', views.ExerciseList.as_view()),
    path('api/session/new-workout/', views.new_workout),
    path('api/set/new-set/', views.new_set),
    path('api/sessions/', views.SessionList.as_view()),
    path('api/sets/', views.SetList.as_view()),

    path(r'^api/session/(?P<pk>[0-9]+)/$', views.SessionDetail.as_view()),
    path(r'^api/sets/(?P<pk>[0-9]+)/$', views.SetDetail.as_view()),

    path('api/emptyworkout', views.EmptyWorkout.as_view()),
    path('api-token-auth/', obtain_auth_token),

]
