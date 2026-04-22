import React from 'react';
import { Outlet } from 'react-router-dom';
import AgentNav from '../AgentNav/AgentNav.jsx';
import AgentSideBar    from '../AgentSideBar/AgentSideBar.jsx';
// import AgentRightPanel from './AgentRightPanel/AgentRightPanel.jsx';
import '../../RealEstateAgents/AgentPannel.css';

export default function AgentPannel() {
  return (
    <>
      
       <>
      <AgentNav />
      <div className="container-fluid px-0 agent-panel-page">
        <div className="row g-0 h-100">
          <div className="col-md-3 agent-panel-sidebar">
            <AgentSideBar  />
          </div>
          <div className="col-md-6 agent-panel-content">
            <Outlet />
          </div>
          <div className="col-md-3 agent-panel-right">
            {/* <AgentRightPanel /> */}right
          </div>
        </div>
      </div>
    </>
    
    </>
  );
}