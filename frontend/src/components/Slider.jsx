import React, { useContext } from 'react'
import { SliderdataContext } from '../context/SliderdataContext';

const Slider = () => {

  const {sliderdata, isLoading, error} = useContext(SliderdataContext);

  if (isLoading){
    return <div>Loading....</div>
  }
  return (
    <>
      {sliderdata?.map((movie)=>(
        <div key={movie.id} className='flex justify-around'>
          <div className='flex flex-col justify-center items-center text-amber-100'>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
          <img src = {`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className='w-full h-screen object-cover brightness-50'/>

        </div>
      ))}
    </>
  )
}

export default Slider