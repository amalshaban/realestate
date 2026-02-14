import React, {   useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Search from "../Search/Search.jsx";
// import cardimg from "../../../assets/imgs/7da51552e8fc95cb3bd8bf2bf2d6ce580258031a.jpg";
import UserLocation from "../../../../public/userLocation/UserLocation.jsx";
import Services from "../Services/Services.jsx";
import Footer from "../Footer/Footer.jsx";
// import { Card, CardMedia, IconButton, Box } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { LOCATIONS_URLs, USERS_URLs } from "../../../constants/EndPoints.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import MultiStepForm from "../../AuthModule/AgentRegProccess/MultiStepForm.jsx";
import { AuthorizedToken } from "../../../constants/Validations.js";



// import { useTranslation } from 'react-i18next';



export default function Home() {

  
  // Check auth
  const token = sessionStorage.getItem("token");
  console.log('Home - Token exists:', !!token);

  return (
    <>
    
    
    {/* <div>
      <button className="" onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
      <p>{t('home')}</p>
    </div> */}

{/* <UserLocation/> */}
   
   
{/* slider section */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
        
  
        <div className="slidersection">
          <div className="col-md-8 col-sm-12 mx-auto">
                 <div className="slidertext">
              <h1 className="">
                <span className="">Discover</span> high-potential
                projects, Showcase your properties, and{" "}
                <span className="">Connect</span> with serious
                partners.
              </h1>
              {/* <p className="pt-3">
                A smart real estate platform connecting investors, developers,
                and professionals all in one powerful ecosystem.
              </p> */}
         
            </div>

          </div>
       <div className="col-md-8 col-sm-12 mx-auto">
         <div className="searchsection">
             <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="text-primary"
            id="home-tab"
            type="button"
            role="tab"
            aria-controls="home"
            
          >
            Buy
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
          className="text-primary"
            id="profile-tab"
            type="button"
            role="tab"
            aria-controls="profile"Handle click with React state
          >
            Rent
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Search />
        </div>
        <div
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
         <h1 className=""> Content of Rent </h1>
        </div>
      </div>
            </div>
       </div>
           
          </div>




{/* 
          <div className="col-md-4 overlap-img">
            <img className="h-100 w-100" src={slider} />
          </div> */}
        </div>
      </div>
      </div>

    
    
    
    
    
    
    <Services/>
    
    
    
    
      <div className="container-fluid-no-padding">
      <div className="newproperties">
        <div className="row">
          <div className="col-md-6">
          <h3 className="headertxtstyle">New Properties</h3>
          </div>
          <div className=" col-md-6 text-end">  
            <Link to="/properties/viewproperties" className="">
            See All
          </Link>
          </div>
        </div>
        <div className="">
          <p className="">
          Find your perfect home from thousands of wonderful options
          </p>
        </div>
     

          <div className="row">
               

    
          </div>

          
      </div>
        
        </div>
 
  


    <Footer/>

    

    </>
  );
  }