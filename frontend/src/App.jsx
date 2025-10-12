import React from 'react'
import Home from './pages/Home'
import Movies from './pages/Movies'
import { QueryClient ,QueryClientProvider} from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

const App = () => {

  const client = new QueryClient();
  return (
    <QueryClientProvider client = {client}>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/movies" element = {<Movies/>}/>
      </Routes>
      
      </BrowserRouter>
     
    </QueryClientProvider>
    
  )
}

export default App