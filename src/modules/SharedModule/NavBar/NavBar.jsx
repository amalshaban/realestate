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
import Home from '../Home/Home';
export default function NavBar() {

    let { loginData } = useContext(AuthContext);
    let { logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  
  const navigate = useNavigate();
  
  const handlelogout = () =>{
    logOut();
    navigate("/home");
  }
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    }
     
      const [activeTab, setActiveTab] = useState('home'); 
    
      const handleTabClick = (tabId) => {
        setActiveTab(tabId);
      };



   
  const navigatetoauth =()=>{
    navigate('/auth/join');
  }

  const navigateToHome = () => {
    console.log('Home button clicked');
    console.log('Current path:', window.location.hash);
    window.location.href = '#/';
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
const role = loginData?.role || 'anonymous';


let photoLink;
if (photo === "") {
  photoLink = profileimg; 
} else {
  photoLink = `https://realstate.niledevelopers.com/images/${photo}`;
}


console.log(role);
  console.log(`${photo}`);



  const handleClick = () => { 
    if(role === 'Normal')
    navigate('/homeSeekerLayout'); 
   else if(role === 'Agent')
    navigate('/agentlayout/overview');
    
};
  return (
   
    <>

 <nav className="navbar bg-transparent navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">LOGO</Link>
    <img className="navbar-brand"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  {/* رابط الهوم - تم تغيير المسار لـ "/" ليتناسب مع index: true */}
  <li className="nav-item">
    <button 
      type="button"
      onClick={navigateToHome}
      className="nav-link" 
      style={{ 
        border: 'none', 
        background: 'transparent', 
        cursor: 'pointer'
      }}
    >
      <i className="fa-solid fa-house me-2"></i>
      Home
    </button>
  </li>

  {/* رابط العقارات */}
  <li className="nav-item dropdown">
    <button 
      className="nav-link dropdown-toggle" 
      onClick={() => navigate('/properties/viewproperties')} 
      role="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    >
      Properties
    </button>
    <ul className="dropdown-menu">
      <li><Link className="dropdown-item" to="/properties/one">one</Link></li>
      <li><Link className="dropdown-item" to="/properties/two">two</Link></li>
      <li><hr className="dropdown-divider"/></li>
      <li><Link className="dropdown-item" to="/properties/three">three</Link></li>
    </ul>
  </li>

  {/* رابط الشركاء - تحويله لـ span أو div لتجنب الـ href */}
  <li className="nav-item dropdown">
    <span 
      className="nav-link dropdown-toggle" 
      role="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
      style={{ cursor: 'pointer' }}
    >
      Our Parteners
    </span>
    <ul className="dropdown-menu">
      <li><button className="dropdown-item border-0 bg-transparent">one</button></li>
      <li><button className="dropdown-item border-0 bg-transparent">two</button></li>
      <li><hr className="dropdown-divider"/></li>
      <li><button className="dropdown-item border-0 bg-transparent">three</button></li>
    </ul>
  </li>

  {/* تواصل معنا - تحويله لـ Link أو Span */}
  <li className="nav-item">
    <Link to="/contact" className="nav-link">Contact Us</Link>
  </li>

  {/* تغيير اللغة - استخدام أزرار (Buttons) لأنها عمليات وليست روابط */}
  <li className="nav-item dropdown">
    <span 
      className="nav-link dropdown-toggle" 
      role="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
      style={{ cursor: 'pointer' }}
    >
      {t('language')}
    </span>
    <ul className="dropdown-menu">
      <li>
        <button 
          onClick={() => changeLanguage('en')} 
          className="dropdown-item border-0 bg-transparent"
        >
          English
        </button>
      </li>
      <li>
        <button 
          onClick={() => changeLanguage('ar')} 
          className="dropdown-item border-0 bg-transparent"
        >
          العربيه
        </button>
      </li>
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
           <button className="btn btn-outline-info px-3" onClick={handlelogout} >LogOut</button>
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
