import React from 'react'
import { Outlet } from 'react-router-dom'
import ContactBar from '../ContactBar/ContactBar'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function PropertyLayout() {
  return (
    <>
         <ContactBar/>
         <NavBar/>

          <Outlet/>

            
          <Footer/>
    </>
  )
}
