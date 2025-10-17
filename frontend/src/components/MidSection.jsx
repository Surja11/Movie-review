import React from 'react'
import api from '../api'
import MovieCard from './MovieCard'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

const MidSection = () => {
  const { data: trendingMovies, isLoading, error } = useQuery({
    queryKey: ["Trending"],
    queryFn: async () => {
      try {
        const res = await api.get('/trending_movies/');
        return res.data?.results || [];
      } catch (err) {
        console.error(err);
        return [];
      }
    }
  })

  const { data: topRatedMovies } = useQuery({
    queryKey: ["TopRated"],
    queryFn: async () => {
      try {
        const res = await api.get('/top_rated/');
        return res.data?.results || [];
      } catch (err) {
        console.error(err);
        return [];
      }
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading  movies</div>

  return (
    <div>
      <div className='flex items-end space-x-40 justify-between mt-5'> 
        <div className='flex-1'></div><h1 className="text-3xl text-amber-100 text-center font-semibold flex-1">Trending</h1>
        <div className='flex-1 flex justify-end cursor pointer px-14'> <NavLink to='/movies/trending' className='text-amber-100'>See more</NavLink></div>

      
      </div>
     
      <div className="flex flex-wrap gap-4 m-5 w-[90%] items-center justify-evenly">
        {(trendingMovies

          ||[]
        ).slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className='flex items-end space-x-40 justify-between mt-5'> 
        <div className='flex-1'></div><h1 className="text-3xl text-amber-100 text-center font-semibold ">Top Rated</h1>
        <div className='flex-1 flex justify-end cursor pointer px-14'> <NavLink to='/movies/top_rated' className='text-amber-100'>See more</NavLink></div>

      
      </div>
     
      <div className="flex flex-wrap gap-4 mt-5 w-[90%] items-center justify-evenly">
        {(topRatedMovies||[]).slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MidSection
