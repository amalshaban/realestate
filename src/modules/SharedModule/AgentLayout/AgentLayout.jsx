import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function AgentLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        
        </div>
  )
}
