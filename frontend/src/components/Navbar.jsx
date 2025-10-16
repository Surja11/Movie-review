import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, checkAuth } = useContext(AuthContext);
  const [search , setSearch] = useState("")

  

  const handleSearch = (e)=>{
      e.preventDefault();
      if (search.trim()){
        navigate(`/movies/search?query=${encodeURIComponent(search)}`);
        setSearch("");
      }
  }

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-purple-950 via-black to-purple-950 text-amber-100 px-6 py-3 border-gray-700 shadow-md">
      <div className="flex space-x-6 justify-center items-center">
        <NavLink to="/" className="cursor-pointer hover:scale-105 transition">
          <span className="text-2xl">🍿</span>
          <span className="text-3xl font-semibold text-[#c71585]">C</span>
          <span className="font-sans font-semibold text-xl cursor-pointer text-[#EAB8E4] transition">ine</span>
          <span className="font-sans font-semibold text-3xl text-[#C71585]">V</span>
          <span className="font-sans font-semibold text-xl text-[#eab8e4]">iew</span>
        </NavLink>

        <div className="flex space-x-5 justify-center items-center pt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[18px] font-semibold cursor-pointer relative transition ${
                isActive ? "text-[#EAB8E4] after:w-full" : "hover:text-[#EAB8E4] after:w-0 hover:after:w-full"
              } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-[#EAB8E4] after:transition-all`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies/popular"
            className={({ isActive }) =>
              `text-[18px] font-semibold cursor-pointer relative transition ${
                isActive ? "text-[#EAB8E4] after:w-full" : "hover:text-[#EAB8E4] after:w-0 hover:after:w-full"
              } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-[#EAB8E4] after:transition-all`
            }
          >
            All Movies
          </NavLink>
        </div>
      </div>


      <div className="flex items-center justify-center space-x-2">

      <div className="flex items-center justify-center space-x-2">
       <input
          type="text"
          placeholder="Search Movies..."
          className="px-3 py-2 rounded bg-transparent border border-amber-100 text-amber-100 placeholder-amber-100 outline-none focus:ring-1 focus:ring-amber-100" value={search} onChange={(e)=>{setSearch(e.target.value)}}
        />
        <button className="px-3 py-2 bg-amber-100 text-purple-900 font-semibold rounded hover:bg-[#EAB8E4]  hover:text-blackdf transition brightness-80" onClick={handleSearch}>
          Search
        </button>
      </div>  

        {isAuthenticated ? (
  <div className="relative group">
    <button className="px-3 py-2 rounded bg-transparent border border-amber-100 text-amber-100 outline-none flex items-center">
      {user?.username || user?.email || "Profile"} ▼
    </button>
    <div className="absolute right-0 mt-2 w-30 bg-[#341539] border border-amber-100 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <button
        onClick={() => navigate(`/user/${user.id}`)}
        className="block w-full text-left px-2 py-2 text-amber-100 hover:bg-purple-900"
      >
        Profile
      </button>
      <button
        onClick={() => navigate("/logout")}
        className="block w-full text-left px-2 py-2 text-amber-100 hover:bg-purple-900"
      >
        Logout
      </button>
    </div>
  </div>
)  : (
          <div className="flex justify-between space-x-2">
            <NavLink
              to="/login"
              className="bg-[#c71585] text-amber p-2 rounded hover:bg-[#eab8e4] hover:text-black transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-[#c71585] text-amber-100 p-2 rounded hover:bg-[#eab8e4] hover:text-black transition"
            >
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
