"""setsNreps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import include, re_path
from django.views.generic import TemplateView

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    re_path(r'^api/users/create-account/?$', views.CreateAccount.as_view()),
    # re_path(r'^api/', include(router.urls)),
    # re_path(r'^', include(router.urls)),
    re_path(r'^admin/', admin.site.urls),

    re_path(r'^api/muscle_groups/?$', views.MuscleGroupList.as_view()),
    re_path(r'^api/exercises/?$', views.ExerciseList.as_view()),
    re_path(r'^api/session/new-workout/?$', views.new_workout),
    re_path(r'^api/set/new-set/?$', views.new_set),
    re_path(r'^api/sessions/?$', views.SessionList.as_view()),
    re_path(r'^api/sets/(?P<pk>[0-9]+)/?$', views.SetDetail.as_view()),
    re_path(r'^api/sets/?$', views.SetList.as_view()),

    re_path(r'^api/set/table-friendly-set-list/?$', views.table_friendly_set_list),
    re_path(r'^api/new-set-from-existing/?$', views.new_set_from_existing),

    re_path(r'^api/session/(?P<pk>[0-9]+)/?$', views.SessionDetail.as_view()),
    re_path(r'^api/session/copy/(?P<pk>[0-9]+)/?$', views.copy_session),

    re_path(r'^api/emptyworkout/?$', views.EmptyWorkout.as_view()),
    re_path(r'^api/api-token-auth/?$', obtain_auth_token),

    # re_path('.*', TemplateView.as_view(template_name='index.html')),
]
