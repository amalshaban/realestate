import React from 'react';
import { Outlet } from 'react-router-dom';
import PurchaseRequestsUser from '../PurchaseRequestsUser/PurchaseRequestsUser';
import RentalRequestsUser from '../RentalRequestsUser/RentalRequestsUser';
import VisitRequestUser from '../VisitRequestUser/VisitRequestUser.jsx';
import '../HomeSeekerPannel/homeseekerpannel.css';

export default function HomeSeekerPannel() {
  return (
    <div className="container-fluid py-4 px-lg-5 bg-light min-vh-100">
      
      {/* --- Header Section --- */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h2 className="fw-bold text-dark mb-1">🏠 Home Seeker Dashboard</h2>
          <p className="text-muted">Welcome back! Here’s what’s happening with your property search.</p>
        </div>
        <div className="col-md-4 text-md-end">
          <span className="badge bg-white text-dark shadow-sm p-2">
            <i className="bi bi-clock-history me-1"></i> Last Update: 20 mins ago
          </span>
        </div>
      </div>

      {/* --- Stats Overview Section --- */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-lg-3">
          <div className="stats-card p-3 shadow-sm rounded-4 bg-white border-0 h-100">
            <div className="d-flex align-items-center">
              <div className="icon-box bg-primary-light text-primary me-3">
                <i className="fs-4 bi bi-houses"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">247</h3>
                <small className="text-muted">Total Properties</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-lg-3">
          <div className="stats-card p-3 shadow-sm rounded-4 bg-white border-0 h-100">
            <div className="d-flex align-items-center">
              <div className="icon-box bg-warning-light text-warning me-3">
                <i className="fs-4 bi bi-hourglass-split"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">120</h3>
                <small className="text-muted">In Progress</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="stats-card p-3 shadow-sm rounded-4 bg-white border-0 h-100">
            <div className="d-flex align-items-center">
              <div className="icon-box bg-danger-light text-danger me-3">
                <i className="fs-4 bi bi-heart"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">152</h3>
                <small className="text-muted">Favorites</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="stats-card p-3 shadow-sm rounded-4 bg-white border-0 h-100">
            <div className="d-flex align-items-center">
              <div className="icon-box bg-info-light text-info me-3">
                <i className="fs-4 bi bi-chat-dots"></i>
              </div>
              <div>
                <h3 className="fw-bold mb-0">29</h3>
                <small className="text-muted">Messages</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content (Tabs) --- */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white shadow-sm rounded-4 p-4 mb-4">
            <ul className="nav nav-pills nav-fill modern-tabs mb-4 p-1 bg-light rounded-3" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active rounded-3 py-2" id="visits-tab" data-bs-toggle="pill" data-bs-target="#visits-content" type="button" role="tab">
                  <i className="bi bi-calendar-event me-2"></i> Visit Requests
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link rounded-3 py-2" id="purchase-tab" data-bs-toggle="pill" data-bs-target="#purchase-content" type="button" role="tab">
                  <i className="bi bi-cash-stack me-2"></i> Purchase Requests
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link rounded-3 py-2" id="rent-tab" data-bs-toggle="pill" data-bs-target="#rent-content" type="button" role="tab">
                  <i className="bi bi-key me-2"></i> Rental Requests
                </button>
              </li>
            </ul>

            <div className="tab-content pt-2" id="myTabContent">
              <div className="tab-pane fade show active" id="visits-content" role="tabpanel">
                <VisitRequestUser />
              </div>
              <div className="tab-pane fade" id="purchase-content" role="tabpanel">
                <PurchaseRequestsUser />
              </div>
              <div className="tab-pane fade" id="rent-content" role="tabpanel">
                <RentalRequestsUser />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}