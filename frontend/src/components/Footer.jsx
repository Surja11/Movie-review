import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[150px] bg-gradient-to-r from-black via-black to-purple-950 flex justify-around items-center border-t border-purple-900 shadow-purple-500'>
    <p className='text-amber-100 brightness-75 mr-10'>
      &copy; 2025 CineView.</p>
    <p className='italic text-amber-300 brightness-75 ml-10' >Where stories meet opinion - powered by movie lovers</p>
    </div>
  )
}

export default Footer