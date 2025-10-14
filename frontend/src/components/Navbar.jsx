import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, checkAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    checkAuth(); 
    navigate("/login");
  };

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
            to="/movies"
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
          className="px-3 py-2 rounded bg-transparent border border-amber-100 text-amber-100 placeholder-amber-100 outline-none focus:ring-1 focus:ring-amber-100"
        />
        <button className="px-3 py-2 bg-amber-100 text-purple-900 font-semibold rounded hover:bg-[#EAB8E4]  hover:text-blackdf transition brightness-80">
          Search
        </button>
      </div>  

        {isAuthenticated ? (
          <select
            className="px-3 py-2 rounded bg-transparent border border-amber-100 text-amber-100 outline-none"
            onChange={(e) => {
              if (e.target.value === "logout") {
                navigate("/logout")
              }
            }}
          >
            <option value="profile">{user?.username || user?.email || "Profile"}</option>
            <option value="logout">Logout</option>
          </select>
        ) : (
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
