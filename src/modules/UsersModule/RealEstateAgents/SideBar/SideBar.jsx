import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '/src/modules/UsersModule/RealEstateAgents/AgentPannel.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthModule/context/AuthContext';

export default function SideBar({ collapsed, setCollapsed }) {
  const toggleSidebar = () => setCollapsed(!collapsed);
const navigate = useNavigate();
    let { logOut } = useContext(AuthContext);
 const handleLogout = () => {
    logOut(); 
    navigate("/home");
  };
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
          <MenuItem onClick={() => navigate('overview')}><i className="fa-solid fa-grip"></i> Overview </MenuItem>
          <MenuItem onClick={() => navigate('propertieslist')}><i className="fa-solid fa-house-chimney"></i> Properties </MenuItem>
          <MenuItem><i className="fa-solid fa-file-signature"></i> Contract </MenuItem>
          <MenuItem><i className="fa-solid fa-envelope"></i> Messages </MenuItem>
        </div>

        <div className="submenu2">
          <MenuItem><i className="fa-solid fa-flag"></i> Reports </MenuItem>
          <MenuItem><i className="fa-solid fa-gear"></i> Settings </MenuItem>
        </div>

        <div className="text-danger">
          <MenuItem  onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> LogOut </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
}
