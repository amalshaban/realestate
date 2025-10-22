import React from 'react'
import Footer from "/src/modules/SharedModule/Footer/Footer.jsx";
import NavBar from "/src/modules/SharedModule/NavBar/NavBar.jsx";
import ContactBar from "/src/modules/SharedModule/ContactBar/ContactBar.jsx";
import LogIn from '../LogIn/LogIn';
import welcome from "./welcome.svg"

import "/src/modules/AuthModule/auth.css"
import { Link, Links, Outlet } from 'react-router-dom';


export default function Join() {


  return (
    <>
    <ContactBar/>
  
<div className="main-content">

  <div className="auth-nav">
     <NavBar/>
  </div>
  <div className="container w-75  auth-content">
    <div className="row">
      <div className="col-md-6">
        <div className="left-auth">
          <img className='mx-3' src={welcome}/>
     
      
     </div>
      
      </div>
       <div className="col-md-6">
        <div className="auth-right">
        <Outlet />
           </div>
       </div>
    </div>
  </div>

</div>
    <Footer/>
    </>
  )
}
