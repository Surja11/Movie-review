import React from 'react'
import Carousel from '../components/Carousel'
import MidSection from '../components/MidSection'

const Home = () => {
  return (
    <div className='w-full  bg-gradient-to-tl from-purple-950 via-black to-purple-950'>
      <Carousel/>
      <MidSection/>
    </div>
  )
}

export default Home