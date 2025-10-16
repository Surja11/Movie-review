import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useParams } from 'react-router-dom'

const Movies = () => {
  const [page, setPage] = useState(1)
  const {category} = useParams()
  
  let route;

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

  const {data:movies, isLoading, error} = useQuery({ queryKey:[ `movies_${category}`], 
  queryFn: async()=>{
    const res = await axios.get(route)
    return res.data.results
  }})

  const pageHandler = (selectedPage)=>{
    setPage(selectedPage)
  }

  const dynamicPage = Math.ceil(movies?.length/18)

  if(isLoading) return <div className='text-amber-100'>Loading...</div>
  if(error) return <div className='text-amber-100'> Error fetching data</div>

  return (
    <div className='w-full bg-gradient-to-br from-purple-950 via-black to-purple-950 min-h-screen p-4'>
    <h1 className='text-2xl text-center text-amber-100'>  {category === "popular" ? "All Movies" : category.charAt(0).toUpperCase() + category.slice(1)}</h1>

    <div className="flex flex-wrap justify-center items-center">

      {movies?.slice(page*18-18, page*18).map(movie => (
       <MovieCard movie = {movie} key={movie.id}/>
      ))}


    </div>

    <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
    </div>
  )
}

export default Movies