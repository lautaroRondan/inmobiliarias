import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { Header } from '../Components/Header/Header'
import Search from '../Components/Search/Search'
import Property from '../Components/Property/Property'

const MyRoutes = () => {
  return (
    <div className='layaot'>
    <BrowserRouter>
     <Header/>
      
        <Routes>
          <Route path='/' element={<Search/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/property/:id' element={<Property/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default MyRoutes
