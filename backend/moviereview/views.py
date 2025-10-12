from django.shortcuts import render
import os
import requests
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from dotenv import load_dotenv
from rest_framework import generics
from .serializers import *
from django.core.cache import cache

load_dotenv()

# Create your views here.

class RegisterView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([AllowAny])
def get_movies(request):

  cached_data = cache.get("tmdb_popular_movies")
  if cached_data:
    return Response(cached_data, status=status.HTTP_200_OK)
  

  TMDB_BEARER = os.getenv('TMDB_BEARER')
  url = "https://api.themoviedb.org/3/movie/popular"
  headers = {
    "accept": "application/json",
      "Authorization": f"Bearer {TMDB_BEARER}"
  }
  response = requests.get(url, headers=headers)
  
  data = response.json()
  cache.set("tmdb_popular_movies", data, timeout=60*60*60)

  if response.status_code != 200:
    return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)
  return Response(data, status=status.HTTP_200_OK)