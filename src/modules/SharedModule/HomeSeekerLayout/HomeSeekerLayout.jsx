import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import SideBarUser from '../../UsersModule/HomeSeekers/SideBarUser/SideBarUser'
import UserNav from '../../UsersModule/HomeSeekers/UserNav/UserNav';

export default function HomeSeekerLayout() {
 const [collapsed, setCollapsed] = useState(false);

  return (
   <div style={{ display: 'flex' }}>
        <SideBarUser collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <div
          style={{
            marginLeft: collapsed ? '80px' : '250px',
            transition: 'margin-left 0.3s ease',
            padding: '20px',
            width: '100%',
          }}
          className="container-fluid"
        >
          <UserNav />
          <div className="row mt-3">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  )
}
