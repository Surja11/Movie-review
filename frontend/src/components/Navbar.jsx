import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-purple-950 via-black to-purple-950 text-amber-100 px-6 py-3 border-b border-gray-700 shadow-md">
    
      <div className="flex space-x-6 justify-center items-center">
        <NavLink to="/" className='cursor-pointer hover:scale-105 transition'>
        <span className='text-2xl'>🍿</span>
        <span className="text-3xl font-semibold text-[#C71585]">C</span>
        <span className="font-sans font-semibold text-xl cursor-pointer
       text-[#EAB8E4] transition">ine</span>
       <span className="font-sans font-semibold text-3xl text-[#C71585]"
      >V</span>
      <span className="font-sans font-semibold text-xl text-[#EAB8E4]"
      >iew</span>
       </NavLink>
       <div className='flex space-x-5 justify-center items-center pt-2'>
      <NavLink
  to="/"
  className={({ isActive }) =>
    `text-[18px] font-semibold cursor-pointer relative transition ${
      isActive ? 'text-[#EAB8E4] after:w-full' : 'hover:text-[#EAB8E4] after:w-0 hover:after:w-full'
    } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-[#EAB8E4] after:transition-all`
  }
>
  Home
</NavLink>

        <NavLink
  to="/movies"
  className={({ isActive }) =>
    `text-[18px] font-semibold cursor-pointer relative transition ${
      isActive ? 'text-[#EAB8E4] after:w-full' : 'hover:text-[#EAB8E4] after:w-0 hover:after:w-full'
    } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-[#EAB8E4] after:transition-all`
  }
>
  All Movies
</NavLink>
</div>
      </div>

    <div className="flex items-center justify-center space-x-2">
       <input
          type="text"
          placeholder="Search Movies..."
          className="px-3 py-2 rounded bg-transparent border border-amber-100 text-amber-100 placeholder-amber-100 outline-none focus:ring-1 focus:ring-amber-100"
        />
        <button className="px-3 py-2 bg-amber-100 text-purple-900 font-semibold rounded hover:bg-[#EAB8E4]  hover:text-blackdf transition">
          Search
        </button>
      </div>
    </div>
  )
}

export default Navbar
