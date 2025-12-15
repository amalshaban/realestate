import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import SignUp from '../../AuthModule/SignUp/SignUp';
import LogIn from '../../AuthModule/LogIn/LogIn';
import img1 from "../../../assets/imgs/Maskgroup1.png"
import img2 from "../../../assets/imgs/Maskgroup2.png"
import img3 from "../../../assets/imgs/Maskgroup3.png"
import img4 from "../../../assets/imgs/Maskgroup4.png"
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { AuthContext } from '../../AuthModule/context/AuthContext';
import profileimg  from '../../../assets/imgs/profile.png'
export default function NavBar() {

  


    let { loginData } = useContext(AuthContext);
    let { logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    }
   const handleClick = () => { 
    navigate('/auth/signup', { replace: true }); 
    window.location.reload();
};

     
      const [activeTab, setActiveTab] = useState('home'); 
    
      const handleTabClick = (tabId) => {
        setActiveTab(tabId);
      };


  const navigate = useNavigate();
  const navigatetoauth =()=>{
    navigate('/auth/join');
  }
//   const handleClickSeeker = () => { 
//     navigate('/auth/signup', { replace: true }); 
//     window.location.reload();
// };
//  const handleClickAgent = () => { 
//     navigate('/auth/signupagent', { replace: true }); 
//     window.location.reload();
// };
console.log(loginData);

     const name = loginData?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || 'Guest';
 // const userId = loginData?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  let photo = loginData?.Photo || "";
  //const role = loginData?.role || 'anonymous';


let photoLink;
if (photo === "") {
  photoLink = profileimg; 
} else {
  photoLink = `https://realstate.niledevelopers.com/images/${photo}`;
}


  console.log(`${photo}`);
  return (
   
    <>

 <nav className="navbar bg-transparent navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">LOGO</a>
    <img className="navbar-brand"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">{t('home')}</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {t('properties')}
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">one</a></li>
            <li><a className="dropdown-item" href="#">two</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">three</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Our Parteners
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">one</a></li>
            <li><a className="dropdown-item" href="#">two</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">three</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-disabled="true">Contact Us</a>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {t('language')}
          </a>
          <ul className="dropdown-menu">
            <li><a onClick={() => changeLanguage('en')} className="dropdown-item" href="#">English</a></li>
            <li><a onClick={() => changeLanguage('ar')} className="dropdown-item" href="#">العربيه</a></li>
          </ul>
        </li>
      </ul>

      <div className="d-flex">
       
      {/* <i className="fa-regular fa-heart my-auto mx-2"></i> */}
    
      <div>
       
      {loginData ?
        <div> 
         Welcome,  <button onClick={handleClick}>{name} </button>
          { <img className='profile' src={photoLink} alt="Profile" />}
           <button className="btn btn-outline-info px-3" onClick={logOut} >LogOut</button>
        </div>
        :
        <div className="">
              <i className="fa-regular fa-heart mx-2"></i>
              <button type='button' onClick={navigatetoauth} className="btn btn-info px-3" 
              >Join Us</button>
        </div>
       
      }
    </div>
      </div>
    </div>
  </div>
</nav>

  <div>
    
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Welcome to Homi !</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <LogIn/>
              <Link >Not a Member ?</Link>
                 <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                          id="home-tab"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected={activeTab === 'home'}
                          onClick={() => handleTabClick('home')} 
                        >
                          Sign Up
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
                          onClick={() => handleTabClick('profile')} 
                        >
                          New Account
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
                        <SignUp />
                      </div>
                      <div
                        className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="container registerpannel">
                          <h5 className="">Happy to join our community!</h5>
                          <p className="">Please select your account type to start your journey with us</p>
                          <div className="row my-2">
                            <div className="col-md-6 col-sm-6">
                                <button className=" border-0"
  // onClick= {handleClickAgent}
>
  <img src={img1} alt="" className="p-3" />
</button>
                              <h6 className="">Marketing Agency</h6>
                            </div>
                            <div className="col-md-6 col-sm-6">
                               <Link>
                              <img src={img2} alt="" className="p-3" />
                              </Link>
                              <h6 className="">Photographer</h6>
                            </div>
                            </div>
                             <div className="row">
                            <div className="col-md-6 col-sm-6"> <Link>
                              <img src={img3} alt="" className="p-3" />
                              </Link>
                              <h6 className="">Developer</h6>
                            </div>
                            <div className="col-md-6 col-sm-6">
                               <button className=" border-0"
  // onClick= {handleClickSeeker}
>
  <img src={img4} alt="" className="p-3" />
</button>
                                                    
                              <h6 className="">Property Seeker</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}
