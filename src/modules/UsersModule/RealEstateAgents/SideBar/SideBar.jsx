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
    <div 
      className={`custom-sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? '80px' : '250px',
        backgroundColor: '#fff',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        transition: 'width 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      <div className="toggle-btn" onClick={toggleSidebar} style={{ cursor: 'pointer', borderBottom: '1px solid #e0e0e0' }}>
        <h3 className='text-center px-1 py-4' style={{ margin: 0 }}> 
          {collapsed ? 'L' : 'LOGO'} 
        </h3>
      </div>

      <div className="sidebar-menu" style={{ padding: '20px 0' }}>
        <div className="submenu1">
          <div className="sidebar-menu-item" onClick={() => navigate('overview')}>
            <i className="fa-solid fa-grip"></i>
            {!collapsed && <span>Overview</span>}
          </div>
          <div className="sidebar-menu-item" onClick={() => navigate('propertieslist')}>
            <i className="fa-solid fa-house-chimney"></i>
            {!collapsed && <span>Properties</span>}
          </div>
          <div className="sidebar-menu-item">
            <i className="fa-solid fa-file-signature"></i>
            {!collapsed && <span>Contract</span>}
          </div>
          <div className="sidebar-menu-item">
            <i className="fa-solid fa-envelope"></i>
            {!collapsed && <span>Messages</span>}
          </div>
        </div>

        <div className="submenu2" style={{ marginTop: '2rem' }}>
          <div className="sidebar-menu-item">
            <i className="fa-solid fa-flag"></i>
            {!collapsed && <span>Reports</span>}
          </div>
          <div className="sidebar-menu-item">
            <i className="fa-solid fa-gear"></i>
            {!collapsed && <span>Settings</span>}
          </div>
        </div>

        <div className="text-danger" style={{ marginTop: '0.2rem' }}>
          <div className="sidebar-menu-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            {!collapsed && <span>LogOut</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
