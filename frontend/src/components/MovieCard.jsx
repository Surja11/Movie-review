import React, { useState } from 'react'

const MovieCard = ({ movie }) => {
  return (
    <div className='text-amber-100 border-0 rounded-xl  hover:scale-105 hover:shadow transition-all hover:shadow-purple-500 cursor-pointer p-2 m-4 flex flex-col justify-center items-center w-60'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='rounded-xl w-50'/>
      <h2>{movie.title}</h2>
     
        <span>Rating: {movie.vote_average}</span>

        <button className='bg-purple-950 p-1 rounded text-amber-100 border border-purple-700 m-1'>Reviews</button>
        
     

    </div>
  )
}

export default MovieCard