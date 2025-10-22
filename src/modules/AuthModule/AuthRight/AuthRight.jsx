import React, { useState } from 'react'
import LogIn from '../LogIn/LogIn'
import img1 from "../../../assets/imgs/Maskgroup1.png"
import img2 from "../../../assets/imgs/Maskgroup2.png"
import img3 from "../../../assets/imgs/Maskgroup3.png"
import img4 from "../../../assets/imgs/Maskgroup4.png"

import "/src/modules/AuthModule/auth.css"
import { Link } from 'react-router-dom'

export default function AuthRight() {
  
     const options = [
      { to: "/auth/join/signup", img: img4, label: "Property Seeker" },
      { to: "/auth/join/signupagent", img: img1, label: "Marketing Agency" },
      { to: "/auth/join/signupagent", img: img2, label: "Photographer" },
      { to: "/auth/join/signupagent", img: img3, label: "Developer" },
    ];
   const [show, setShow] = useState(false);
  
    const toggleShow = () => {
      setShow(prev => !prev);
    };

  return (
    <>
    
        <h1 className="text-center p-3">LOGO</h1>
    <div className="">
      <div style={{ opacity: show ? '0' : '1' }}  className="">
        <LogIn/>
      </div>
      <div className="container">
      <div style={{ opacity: show ? '1' : '0' }} className="row g-4 position-relative">
   
        {options.map((option, index) => (
          <div className="col-sm-3 col-md-6  text-center " key={index}>
            <Link to={option.to}  className="icon-card d-flex flex-column align-items-center p-4  position-relative">
                <img src={option.img} alt={option.label} className="img-fluid icon-img" />
                <span className="icon-label-fly">{option.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div> 
    <p onClick={toggleShow}  style={{ opacity: show ? '0' : '1' }} className="text-danger">Not a User?</p>
    </div>    
    </>
  )
}
