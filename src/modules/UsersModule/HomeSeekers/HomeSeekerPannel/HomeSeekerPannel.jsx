import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function HomeSeekerPannel() {
  return (
    <div className="container-fluid my-4">
      <h2 className="mb-4 text-primary">🏠 Home Seeker Dashboard</h2>
      <p>Welcome to your dashboard! Use the navigation to view your visit requests.</p>

      <div className="mb-4">
        <Link to="visitrequestuser" className="btn btn-primary">
          <i className="fa-solid fa-calendar-check me-2"></i>
          View Visit Requests
        </Link>
      </div>

      <Outlet/>
    </div>
  );
}