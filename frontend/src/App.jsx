import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ChatBot from './Components/ChatBot'

import Home from './Pages/HomePage'
import Properties from './Pages/Properties'
import PropertyDetail from './Pages/PropertyDetail'
import Agents from './Pages/Agents'
import AgentDetail from './Pages/AgentDetail'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Career from './Pages/Career'
import FAQ from './Pages/FAQ'
import Signin from './Pages/Signin'
import Signup from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Profile from './Pages/Profile'
import PageNotFound from './Pages/PageNotFound'

import AdminLayout from './Pages/Admin/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminProperties from './Pages/Admin/AdminProperties'
import AdminAgents from './Pages/Admin/AdminAgents'
import AdminUsers from './Pages/Admin/AdminUsers'

import SellerLayout from './Pages/Seller/SellerLayout'
import SellerDashboard from './Pages/Seller/SellerDashboard'
import SellerProperties from './Pages/Seller/SellerProperties'


const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<PublicLayout><Home /></PublicLayout>} />
        <Route path='/properties' element={<PublicLayout><Properties /></PublicLayout>} />
        <Route path='/properties/:id' element={<PublicLayout><PropertyDetail /></PublicLayout>} />
        <Route path='/agents' element={<PublicLayout><Agents /></PublicLayout>} />
        <Route path='/agents/:id' element={<PublicLayout><AgentDetail /></PublicLayout>} />
        <Route path='/about' element={<PublicLayout><About /></PublicLayout>} />
        <Route path='/contact' element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path='/careers' element={<PublicLayout><Career /></PublicLayout>} />
        <Route path='/faq' element={<PublicLayout><FAQ /></PublicLayout>} />

        {/* Auth routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* Profile (any logged-in user) */}
        <Route path='/profile' element={
          <ProtectedRoute>
            <PublicLayout><Profile /></PublicLayout>
          </ProtectedRoute>
        } />

        {/* Seller routes */}
        <Route path='/seller' element={
          <ProtectedRoute sellerOnly>
            <SellerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SellerDashboard />} />
          <Route path='properties' element={<SellerProperties />} />
        </Route>

        {/* Admin routes */}
        <Route path='/admin' element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path='properties' element={<AdminProperties />} />
          <Route path='agents' element={<AdminAgents />} />
          <Route path='users' element={<AdminUsers />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ChatBot />
    </AuthProvider>
  )
}

export default App