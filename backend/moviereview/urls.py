from django.urls import path
from .views import *

urlpatterns = [
  path('me/', me, name="me"),
  path('register/',RegisterView.as_view(), name = "register"),
  path('movies/', get_movies, name='get_movies'), 
  path('trending_movies/', get_trending_movies, name="trending_movies"),
  path('top_rated/',get_toprated_movies,name="top_rated" ),
  path('movies/<id>/',get_particular_movie, name = "get_particular_movie"),
  path("search_movies/", search_movies, name="search_movies" ),
  path('get_casts/<int:id>/', get_casts, name = "get_casts"),
  path('filter_movies/', filter_movies, name="filter_movies"),
  path('reviews/user/<int:id>/',get_user_reviews,name ="userreviews")
]