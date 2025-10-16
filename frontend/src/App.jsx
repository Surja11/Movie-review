import React, { useContext, useEffect } from 'react'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SingleMovie from './pages/SingleMovie'
import UserProfile from './pages/UserProfile'
import Reviews from './pages/Reviews'
import Login from './pages/Login'
import Register from './pages/Register'
import { QueryClient ,QueryClientProvider} from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { SliderdataContext, SliderdataProvider } from './context/SliderdataContext'
import { AuthContext } from './context/AuthContext'


export const Logout = ()=>{
  const {checkAuth} = useContext(AuthContext)

  useEffect(()=>{
    localStorage.clear();
    checkAuth();
  },[checkAuth])

  return <Navigate to="/login"/>
}

export const RegisterAndLogout=()=>{
  localStorage.clear()
  return <Register/> 
}

const App = () => {



  const client = new QueryClient();


  return (
    <QueryClientProvider client = {client}>
      <SliderdataProvider>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/movies/:category" element = {<Movies />}/>
        <Route path="/movies" element={<Navigate to="/movies/popular" replace />} />
        <Route path="/movies/search" element={<Movies />} />
        <Route path = "/movie/:id" element = {<SingleMovie/>}/>


        
          <Route path = "/user/:id" element = {
            <ProtectedRoute>
            <UserProfile/>
            </ProtectedRoute>}/>  


      
          <Route path = "/Reviews" element= {
            <ProtectedRoute>
            <Reviews/>
            </ProtectedRoute>
            }/>
        
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<RegisterAndLogout/>}/>
        <Route path = "/logout" element = {<Logout/>}/>
      </Routes>
      
      </BrowserRouter>

      </SliderdataProvider>
     
    </QueryClientProvider>
    
  )
}

export default App