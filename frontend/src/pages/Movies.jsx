import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useLocation, useParams } from 'react-router-dom'
import Filter from '../components/Filter'

const Movies = () => {
  const [page, setPage] = useState(1)
  const {category} = useParams()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get("query")
  const country = queryParams.get("country")
  const genre = queryParams.get("genre")
  const year = queryParams.get("year")
  
  let route;
  let queryKey
  if (query){
    route = `http://127.0.0.1:8000/search_movies/?query=${encodeURIComponent(query)}`
    queryKey = ["search_movies", query]

  }else if(category === "filter"||country||genre||year){
    const filterParams = new URLSearchParams()
    if (country) filterParams.append('country', country)
    if (genre) filterParams.append('genre', genre)
    if (year) filterParams.append('year', year)
    
    route = `http://127.0.0.1:8000/filter_movies/?${filterParams.toString()}`
    queryKey = ["filter_movies", country, genre, year]
  }
  else{

  switch(category){
    case "popular":
      route = `http://127.0.0.1:8000/movies/`
      break;
    case "trending":
      route=`http://127.0.0.1:8000/trending_movies/`
      break;
    case "top_rated":
      route=`http://127.0.0.1:8000/top_rated/`
      break;
    default:
      route = `http://127.0.0.1:8000/movies/`;
  }
  queryKey = ["movies", category]
  }
  const {data:movies, isLoading, error} = useQuery({
  queryKey: queryKey,

  queryFn: async()=>{
    const res = await axios.get(route)
    return res.data.results
  }})

  const pageHandler = (selectedPage)=>{
    setPage(selectedPage)
  }

  const dynamicPage = Math.ceil(movies?.length/18)

  if(isLoading) return <div className='text-amber-100 w-full bg-gradient-to-br from-purple-950 via-black to-purple-950 h-screen text-center'>Loading...</div>
  if(error) return <div className='text-amber-100 w-full bg-gradient-to-br from-purple-950 via-black to-purple-950 h-screen text-center'> Error fetching data</div>

  return (
    <div className='w-full bg-gradient-to-br from-purple-950 via-black to-purple-950 min-h-screen p-4'>
    <h1 className='text-2xl text-center text-amber-100'>  {category 
    ? (category === "popular" ? "All Movies" : category.charAt(0).toUpperCase() + category.slice(1))
    : "Search Results"}</h1>

    <Filter/>
    <div className="flex flex-wrap justify-center items-center">

      {movies?.slice(page*18-18, page*18).map(movie => (
       <MovieCard movie = {movie} key={movie.id}/>
      ))}


    </div>
{movies &&
    <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
}</div>
  )
}

export default Movies