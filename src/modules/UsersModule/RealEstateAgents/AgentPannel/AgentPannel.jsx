import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import SideBar from '../SideBar/SideBar.jsx';
import '/src/modules/UsersModule/RealEstateAgents/AgentPannel.css';
import AgentNav from '../AgentNav/AgentNav.jsx';
import NavBar from '../../../SharedModule/NavBar/NavBar.jsx';

export default function AgentPannel() {
 

  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
  }, []);

  return (
    <div style={{ display: "flex" }}>
    
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{
          marginLeft: collapsed ? '80px' : '250px',
          transition: 'margin-left 0.3s ease',
          padding: '20px',
          width: '100%',
        }}
        className="container-fluid"
      >
      <AgentNav/>

        <div className="row mt-3">
          <div className="col-12">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}
