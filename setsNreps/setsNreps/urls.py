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
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import include, url

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    url('api/users/create-account', views.CreateAccount.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'^', include(router.urls)),
    url('admin/', admin.site.urls),

    url('api/muscle_groups/', views.MuscleGroupList.as_view()),
    url('api/exercises/', views.ExerciseList.as_view()),
    url('api/session/new-workout/', views.new_workout),
    url('api/set/new-set/', views.new_set),
    url('api/sessions/', views.SessionList.as_view()),
    url(r'^api/sets/(?P<pk>[0-9]+)/$', views.SetDetail.as_view()),
    url(r'^api/sets/$', views.SetList.as_view()),

    url('api/set/table-friendly-set-list/', views.table_friendly_set_list),
    url(r'^api/new-set-from-existing/$', views.new_set_from_existing),

    url(r'^api/session/(?P<pk>[0-9]+)/$', views.SessionDetail.as_view()),
    url(r'^api/session/copy/(?P<pk>[0-9]+)/$', views.copy_session),

    url('api/emptyworkout', views.EmptyWorkout.as_view()),
    url('api/api-token-auth/', obtain_auth_token),

    # re_path(‘.*’, TemplateView.as_view(template_name=‘index.html’)),
]
