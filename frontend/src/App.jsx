import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/HomePage'
import About from './Pages/About'
import Career from './Pages/Career'
import Contact from './Pages/Contact'
import PageNotFound from './Pages/PageNotFound'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Properties from './Pages/Properties'
import Signin from './Pages/Signin'
import Signup from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import FAQ from './Pages/FAQ'


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/careers' element={<Career />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/properties' element={<Properties />} />

        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/booking' element={<h1 className='text-center text-3xl mt-20'>Booking Page Coming Soon...</h1>} />
        <Route path ='/faq' element={<FAQ/>} />


        {/* 404 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App