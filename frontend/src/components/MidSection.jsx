import React from 'react'
import api from '../api'
import MovieCard from './MovieCard'
import { useQuery } from '@tanstack/react-query'

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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading trending movies</div>

  return (
    <div>
      <h1 className="text-3xl text-amber-100 text-center font-semibold">Trending</h1>
      <div className="flex flex-wrap gap-4 m-5 w-[90%] items-center justify-evenly">
        {trendingMovies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MidSection
