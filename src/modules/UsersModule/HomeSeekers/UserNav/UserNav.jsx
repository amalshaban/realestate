import React, { useContext } from 'react'
import { AuthContext } from '../../../AuthModule/context/AuthContext';
import profileimg from '../../../../assets/imgs/profile.png';

export default function UserNav() {




 const { loginData } = useContext(AuthContext);

  const photo = loginData?.Photo || "";
  const photoLink = photo === "" 
    ? profileimg 
    : `https://realstate.niledevelopers.com/images/${photo}`;


  return (
    <div>

        <div className="container-fluid">

              <div className="row">
          <div className="pannel-nav p-1 d-flex flex-column flex-md-row justify-content-between w-100">
            <div className="search-side w-75">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span className="ms-1">Search</span>
            </div>
            <div className="icons-side w-100 d-flex justify-content-end">
              <i className="fa-regular fa-bell"></i>
              <i className="fa-regular fa-envelope"></i>
              {photoLink && (
                <img className="profile" src={photoLink} alt="Profile" />
              )}
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}
