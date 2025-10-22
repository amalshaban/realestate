import React, {  useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search.jsx";
// import cardimg from "../../../assets/imgs/7da51552e8fc95cb3bd8bf2bf2d6ce580258031a.jpg";
import UserLocation from "../../../../public/userLocation/UserLocation.jsx";
import ContactBar from "../ContactBar/ContactBar.jsx";
import Services from "../Services/Services.jsx";
import Footer from "../Footer/Footer.jsx";
// import { Card, CardMedia, IconButton, Box } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { LOCATIONS_URLs, USERS_URLs } from "../../../constants/EndPoints.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import MultiStepForm from "../../AuthModule/AgentRegProccess/MultiStepForm.jsx";


// import { useTranslation } from 'react-i18next';



export default function Home() {


  

  // const { t, i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // }

  
  const [activeTab, setActiveTab] = useState('home'); // State to manage the active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };


  return (
    <>
    
    
    {/* <div>
      <button className="" onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
      <p>{t('home')}</p>
    </div> */}

{/* <UserLocation/> */}
      <ContactBar/>
  
               <NavBar />
    
   
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
         style={activeTab === 'home' ? { borderBottom: '2px solid #0088BD', color:'#0088BD' } : {}}
  
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            id="home-tab"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected={activeTab === 'home'}
            onClick={() => handleTabClick('home')} 
          >
            Buy
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            id="profile-tab"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === 'profile'}
            onClick={() => handleTabClick('profile')} // Handle click with React state
          >
            Rent
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Search />
        </div>
        <div
          className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
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
            <a href="" className="">
            See All
          </a>
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