import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import MovieCard from '../components/MovieCard'

const Movies = () => {

  const {data:movies, isLoading, error} = useQuery({ queryKey:["movies"], 
  queryFn: async()=>{
    const res = await axios.get('http://127.0.0.1:8000/movies/' )
    return res.data.results
  }})
   
  if(isLoading) return <div className='text-amber-100'>Loading...</div>
  if(error) return <div className='text-amber-100'> Error fetching data</div>

  return (
    <div className='w-full bg-gradient-to-br from-purple-950 via-black to-purple-950 min-h-screen p-4'>
    <h1 className='text-2xl text-center text-amber-100'>All Movies</h1>

    <div className="flex flex-wrap justify-center items-center">

      {movies?.slice(0,10).map(movie => (
       <MovieCard movie = {movie} key={movie.id}/>
      ))}


    </div>
    </div>
  )
}

export default Movies