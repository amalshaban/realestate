import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar.jsx'
import '/src/modules/UsersModule/RealEstateAgents/AgentPannel.css'
import { AuthContext } from '../../../AuthModule/context/AuthContext';
import profileimg from '../../../../assets/imgs/profile.png';
import { useContext } from 'react';
import AgentList from '../AgentList/AgentList.jsx';

export default function AgentPannel() {
  let { loginData } = useContext(AuthContext);
  let photo = loginData?.Photo || "";
  let photoLink = photo === "" ? profileimg : `https://realstate.niledevelopers.com/images/${photo}`;
const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !collapsed) setCollapsed(true);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  return (
    <div style={{ display: "flex" }}>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{
          marginLeft: collapsed ? '80px' : '250px',
          transition: 'margin-left 1s ease',
          padding: '20px',
          width: '100%',
        }}
        className="container-fluid"
      >
        <div className="row">
          <div className="pannel-nav p-1 d-flex flex-column flex-md-row justify-content-between w-100">
            <div className="search-side w-75">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span className="ms-1">Search</span>
            </div>
            <div className="icons-side w-100 d-flex justify-content-end">
              <i className="fa-regular fa-bell"></i>
              <i className="fa-regular fa-envelope"></i>
              {photoLink && <img className="profile" src={photoLink} alt="Profile" />}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="agent-list p-2">
            <AgentList />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <p>xxxxxxxxxxxxxx</p>
          </div>
        </div>
      </div>
    </div>
  );
}
