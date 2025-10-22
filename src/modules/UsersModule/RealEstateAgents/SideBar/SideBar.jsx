import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '/src/modules/UsersModule/RealEstateAgents/AgentPannel.css';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthModule/context/AuthContext';

export default function SideBar({ collapsed, setCollapsed }) {
  const toggleSidebar = () => setCollapsed(!collapsed);

 let { logOut } = useContext(AuthContext);
 
  return (
    <Sidebar
      collapsed={collapsed}
     className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 1000,
       
        backgroundColor: '#fff',
      }}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <h3 className='text-center px-1 py-4'> LOGO </h3>
      </div>

      <Menu className='sidebar-menu'>
        <div className="submenu1">
          <MenuItem><i className="fa-solid fa-grip"></i> Overview </MenuItem>
          <MenuItem><i className="fa-solid fa-house-chimney"></i> Property </MenuItem>
          <MenuItem><i className="fa-solid fa-file-signature"></i> Contract </MenuItem>
          <MenuItem><i className="fa-solid fa-envelope"></i> Messages </MenuItem>
        </div>

        <div className="submenu2">
          <MenuItem><i className="fa-solid fa-flag"></i> Reports </MenuItem>
          <MenuItem><i className="fa-solid fa-gear"></i> Settings </MenuItem>
        </div>

        <div className="text-danger">
          <MenuItem><i className="fa-solid fa-right-from-bracket" onClick={logOut}></i> LogOut </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
}
