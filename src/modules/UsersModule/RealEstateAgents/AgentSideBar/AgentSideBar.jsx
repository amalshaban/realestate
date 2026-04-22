import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../RealEstateAgents/AgentPannel.css';


// ─── Constants ────────────────────────────────────────────────────────────────
const SIDEBAR_LINKS = [
  { label: 'Property Info', to: '/agentpannel/addproperty/property-info', icon: 'fa-solid fa-list-ul'        },
  { label: 'Media Assets',  to: '/agentpannel/addproperty/media-assets',  icon: 'fa-regular fa-image'        },
  { label: 'Ejar Settings', to: '/agentpannel/addproperty/ejar-settings', icon: 'fa-solid fa-pen-to-square'  },
  { label: 'Verification',  to: '/agentpannel/addproperty/verification',  icon: 'fa-solid fa-shield-halved'  },
  { label: 'Review',        to: '/agentpannel/addproperty/review',        icon: 'fa-solid fa-rocket'         },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AgentSidebar() {
  return (
    <div className="agent-sidebar">

      {/* ── Header ── */}
      <div>
        <h5 className="ap-sidebar-title">Create Listing</h5>
        <p className="ap-sidebar-subtitle">High-End Editorial Mode</p>
      </div>

      {/* ── Links ── */}
      <ul className="ap-sidebar-links">
        {SIDEBAR_LINKS.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => `ap-sidebar-link ${isActive ? 'active' : ''}`}
            >
              <i className={link.icon} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* ── Bottom ── */}
      <div className="ap-sidebar-bottom">
        <NavLink
          to="/agentpannel/help"
          className={({ isActive }) => `ap-sidebar-link ${isActive ? 'active' : ''}`}
        >
          <i className="fa-regular fa-circle-question" />
          Help Center
        </NavLink>
        <button className="ap-save-draft-btn">Save Draft</button>
      </div>

    </div>
  );
}