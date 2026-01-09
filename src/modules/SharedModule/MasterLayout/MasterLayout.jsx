import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import ContactBar from '../ContactBar/ContactBar'

export default function MasterLayout() {
  console.log('MasterLayout rendered');
  return (
    <>
    <ContactBar/>
    <NavBar/>
    <Outlet/>
    </>
  )
}
