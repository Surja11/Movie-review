import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

const LoginForm = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

    try{
    const res = await api.post(route, {username, email, password, password2})

      if (method === "login"){
        localStorage.setItem(ACCESS_TOKEN,res.daata.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
      }
      else{
        navigate("/login")
      }

    }catch(error){
      alert(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="mt-12">
    <h1 className="text-center font-semibold text-2xl m-3 text-amber-100">{name}</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg shadow-purple-900 border-2 border-purple-900">
      

      <div className="flex flex-col mx-5 my-3">
        <label className="m-1 text-amber-100">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="bg-amber-100 w-[90%
  ] m-1 p-1 rounded brightness-90 focus:border-2 text-purple-950"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>

      {method === "register" && (
        <div className="flex flex-col mb-3 mx-5">
          <label className="m-1 text-amber-100">Email</label>
          <input
            type="email"
            placeholder="Enter your username" className="w-[90%
  ] m-1 p-1 focus:border-2 rounded bg-amber-100 brightness-90 text-purple-950"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
      )}

      <div className="flex flex-col mb-3 mx-5">
        <label className="m-1 text-amber-100">Password</label>
        <input
          type="password"
          placeholder="Enter your password" className="w-[90%
  ] m-1 p-1 focus:border-2 rounded bg-amber-100 brightness-90 text-purple-950"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      {method === "register" && (
        <div className="flex flex-col">
          <label className="m-1 text-amber-100">Retype Password</label>
          <input
            type="password"
            placeholder="Enter your password again" className="w-[90%
  ] m-1 p-1 focus:border-2 text-purple-950 rounded bg-amber-100 brightness-90"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
      )}

      <button type="submit" className="p-2 rounded-2xl bg-amber-100 mt-6 px-4 brightness-90 text-purple-950 font-semibold hover:bg-[#eab8e4]
      " disabled={loading}>
        {loading? "Loading...":name}
      </button>
       {method==="login" ? (
          <p className='text-center text-amber-100 mt-2'>Don't have an account? <NavLink to="/register" className='text-blue-500 underline'>Register</NavLink></p>
        ) : (
          <p className='text-center text-amber-100 mt-2'>Already have an account? <NavLink to="/login" className='text-blue-500 underline'>Login</NavLink></p>
        )}
    </form>
    </div>
  );
};

export default LoginForm;
