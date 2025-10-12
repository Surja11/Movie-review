import React from 'react'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SingleMovie from './pages/SingleMovie'
import UserProfile from './pages/UserProfile'
import UserReviews from './pages/UserReviews'
import Login from './pages/Login'
import Register from './pages/Register'
import { QueryClient ,QueryClientProvider} from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { SliderdataContext, SliderdataProvider } from './context/SliderdataContext'

const App = () => {

  const client = new QueryClient();
  return (
    <QueryClientProvider client = {client}>
      <SliderdataProvider>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/movies" element = {<Movies/>}/>
        <Route path = "/movies/:id" element = {<SingleMovie/>}/>

        
          <Route path = "/user/:id" element = {
            <ProtectedRoute>
            <UserProfile/>
            </ProtectedRoute>}/>  


      
          <Route path = "/UserReviews" element= {
            <ProtectedRoute>
            <UserReviews/>
            </ProtectedRoute>
            }/>
        
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        {/* <Route path = "/logout" element = {<Logout/>}/> */}
      </Routes>
      
      </BrowserRouter>

      </SliderdataProvider>
     
    </QueryClientProvider>
    
  )
}

export default App