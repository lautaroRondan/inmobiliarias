import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { Header } from '../Components/Header/Header'
import Property from '../Components/Property/Property'
import Home from '../Components/Home/Home'

const MyRoutes = () => {
  return (
    <div className='layout'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/property/:id' element={<Property />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default MyRoutes