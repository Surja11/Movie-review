import React from 'react'
import LoginForm from '../components/LoginForm'

const Register = () => {
 return (
  
  <div className="w-screen min-h-screen bg-gradient-to-tl from-purple-950 via-black to-purple-950 flex flex-col items-center">
 <LoginForm route="/register/" method="register"/>
 </div>
)}

export default Register