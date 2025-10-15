from django.urls import path
from .views import *

urlpatterns = [
  path('me/', me, name="me"),
  path('register/',RegisterView.as_view(), name = "register"),
  path('movies/', get_movies, name='get_movies'), 
  path('trending_movies/', get_trending_movies, name="trending_movies"),
  path('movies/<id>/',get_particular_movie, name = "get_particular_movie")
]