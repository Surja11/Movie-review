import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <div className='text-amber-100 border-0 rounded-xl  hover:scale-105 hover:shadow transition-all hover:shadow-purple-500 cursor-pointer p-2 m-4 flex flex-col justify-center items-center w-60' onClick={()=>{
      navigate(`/movies/${movie.id}`);
    }}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='rounded-xl w-50'/>
      <h2>{movie.title}</h2>
     
        <span>Rating: {movie.vote_average}</span>

     

    </div>
  )
}

export default MovieCard