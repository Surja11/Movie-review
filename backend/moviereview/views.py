from django.shortcuts import render,get_object_or_404
import os
import requests
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from dotenv import load_dotenv
from rest_framework import generics
from .serializers import *
from django.core.cache import cache
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
load_dotenv()


# Create your views here.

# to check if user is authenticated
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
def me(request):
    if not request.user.is_authenticated:
        return Response({"authenticated": False, "user": None}, status=status.HTTP_200_OK)
    
    serializer = RegisterSerializer(request.user)
    return Response({"authenticated": True, "user": serializer.data}, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

  

@api_view(['GET'])
@authentication_classes([])
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


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_trending_movies(request):
    cached_data = cache.get("Trending_movies")
    if cached_data:
        return Response(cached_data, status=status.HTTP_200_OK)

    url = "https://api.themoviedb.org/3/trending/movie/day"
    TMDB_BEARER = os.getenv('TMDB_BEARER')
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_BEARER}"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)

    data = response.json()
    cache.set("Trending_movies", data, timeout=60*60)

    return Response(data, status=status.HTTP_200_OK)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_toprated_movies(request):
    cached_data = cache.get("Toprated_movies")
    if cached_data:
        return Response(cached_data, status=status.HTTP_200_OK)

    url = "https://api.themoviedb.org/3/movie/top_rated"
    TMDB_BEARER = os.getenv('TMDB_BEARER')
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_BEARER}"
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)

    data = response.json()
    cache.set("Toprated_movies", data, timeout=60*60)

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_casts(request, id):
    cached_data = cache.get(f"Casts_{id}")
    if cached_data:
        return Response(cached_data)

    url = f"https://api.themoviedb.org/3/movie/{id}/credits"
    TMDB_BEARER = os.getenv('TMDB_BEARER')
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_BEARER}"
    }

    try:
        response = requests.get(url, headers=headers)
        print("Response:", response.text)

        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    data = response.json()
    cache.set(f"Casts_{id}", data, timeout=60*60)

    return Response(data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_particular_movie(request,id):
  cached_movie = cache.get(f"movie_{id}")
  if cached_movie:
     return Response(cached_movie, status=status.HTTP_200_OK)

  TMDB_BEARER = os.getenv('TMDB_BEARER')
  url = f"https://api.themoviedb.org/3/movie/{id}"
  headers = {
      "accept" : "application/json",
      "Authorization" : f"Bearer {TMDB_BEARER}"
   }
  response = requests.get(url,headers = headers )
  data = response.json()
  

  if (response.status_code != 200):
      return Response({"error": "Failed to fetch data from TMDB"}, status=response.status_code)

  cache.set(f"movie_{id}", data, timeout = 60*60*60) 
  return Response(data, status = status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def search_movies(request):
    query = request.query_params.get('query')
    if not query:
      return get_movies()

    TMDB_BEARER = os.getenv('TMDB_BEARER')
    url = f"https://api.themoviedb.org/3/search/movie?query={query}&language=en-US&page=1"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_BEARER}"
    }

    try:
        response = requests.get(url, headers=headers)
    
    except:
        return Response({"error": "Error fetching"}, status=500)

    data = response.json()
    return Response(data)
    


class ReviewViewSet(viewsets.ViewSet):
   
   @permission_classes([AllowAny])
   def list(self, request):
      movie_id = request.query_params.get('movie_id')
      if movie_id:
         reviews = Review.objects.filter(movie_id = movie_id)
         serializer = ReviewSerializer(reviews, many = True)
         return Response(serializer.data, status = status.HTTP_200_OK)
      return Response({'error': "movie_id not provided"}, status=status.HTTP_400_BAD_REQUEST)
      
   @permission_classes([IsAuthenticated])
   def create(self, request):
      serializer = ReviewSerializer(data = request.data, context = {'request': request})
      if serializer.is_valid():
         serializer.save(user = request.user)
         return Response({"message":"Review Added"}, status = status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   @permission_classes([AllowAny])
   def retrieve(self, request, pk = None):
      review = get_object_or_404(Review,pk = pk)
      serializer = ReviewSerializer(review)
      return Response(serializer.data, status= status.HTTP_200_OK)
   
   @permission_classes([IsAuthenticated])
   def partial_update(self, request, pk = None):
      review = get_object_or_404(Review,pk = pk,user= request.user)
      serializer = ReviewSerializer(review, data = request.data, context= {'request':request},partial = True)
      if serializer.is_valid():
         serializer.save()
         return Response({"message":"Updated review"},status = status.HTTP_200_OK)
      return Response({"message":"Error"}, status = status.HTTP_400_BAD_REQUEST)
   
   @permission_classes([IsAuthenticated])
   def destroy(self, request, pk):
      review = get_object_or_404(Review, pk = pk , user = request.user)
      review.delete()
      return Response({"message":"Deleted successfully"},status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes ([AllowAny])
def filter_movies(request):
    genre = request.query_params.get('genre')
    year = request.query_params.get('year')
    country = request.query_params.get('country')

    TMDB_BEARER = os.getenv('TMDB_BEARER')

    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
    "language": "en-US",
    "sort_by": "popularity.desc",
    }

    if genre:
        params["with_genres"] = genre
    if year:
        params["primary_release_year"] = year
    if country:
        params["with_origin_country"] = country

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_BEARER}"
}

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    return Response(data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_reviews(request, id =None):
    try:
        user = request.user
        reviews = Review.objects.filter(user=user)
        serializer = ReviewSerializer(reviews, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)