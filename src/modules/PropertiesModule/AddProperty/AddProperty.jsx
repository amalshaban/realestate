import React from 'react'
import PropertyMultiStepForm from './PropertyMultiStepForm.jsx';
import { useNavigate } from 'react-router-dom';

export default function AddProperty() {
  const navigate = useNavigate();
  
  const callallproperties = () => {
    navigate('/properties/viewproperties');
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center py-4">
      {/* --- إضافة التنسيقات هنا مباشرة --- */}
      <style>
        {`
          .view-props-btn {
            color: #ffffff !important;
            border: 2px solid #ffffff !important;
            background-color: transparent !important;
            font-weight: 600;
            transition: all 0.3s ease-in-out;
            border-radius: 50px;
            padding: 8px 25px;
          }

          .view-props-btn:hover {
            background-color: #ffffff !important;
            color: #212529 !important; /* اللون الأسود المريح للعين عند الوقوف على الزر */
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
        `}
      </style>

      <div className="container">
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
          
          {/* الجانب الأيسر: الصورة */}
          <div className="col-lg-5 d-none d-lg-block position-relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Real Estate" 
              className="h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 h-100 w-100 d-flex flex-column justify-content-center p-5 text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <h2 className="fw-bold mb-3 text-white">List Your Property</h2>
              <p className="lead text-white-50">Reach thousands of potential buyers and tenants in just a few steps.</p>
              
              <button 
                onClick={callallproperties} 
                className="btn view-props-btn mt-4 align-self-start"
              >
                View all properties
              </button>
            </div>
          </div>

          {/* الجانب الأيمن: الفورم */}
          <div className="col-lg-7 p-4 p-md-5">
            <PropertyMultiStepForm />
          </div>

        </div>
      </div>
    </div>
  );
}