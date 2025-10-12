from django.urls import path
from .views import *

urlpatterns = [
  path('register/',RegisterView.as_view(), name = "register"),
  path('movies/', get_movies, name='get_movies'), 
]