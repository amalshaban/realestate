import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../SharedModule/NavBar/NavBar.jsx';

export default function HomeSeekerLayout() {
  console.log('🔴 HomeSeekerLayout LOADED');
  
  return (
    <>
      <NavBar />
      <div className="pannel-container">
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
}
