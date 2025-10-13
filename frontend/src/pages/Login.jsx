import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
  
  <div className="w-screen min-h-screen bg-gradient-to-tl from-purple-950 via-black to-purple-950 flex flex-col items-center"><LoginForm route="/api/token/" method="login"/>
  </div>)
}

export default Login