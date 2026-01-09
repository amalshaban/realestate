import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiKey, AuthorizedToken } from "../../../constants/Validations";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PropertyDetails() {
  
  const { id: rawId } = useParams();
  const id = rawId?.startsWith(":") ? rawId.slice(1) : rawId;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);





  useEffect(() => {
    const getProperty = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://realstate.niledevelopers.com/properties/${id}`,
          AuthorizedToken
        );
        
console.log(response.data);
        setProperty(response.data.property);
        setError(null);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);



    let sendVisitRequest = async (data) =>{
  try {
    console.log(data);
    let response = await axios.post("https://realstate.niledevelopers.com/User/request-visit", 
   {
    propertyId: property.id 
  }
  
  ,{
    
      headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'application/json',
     'Accept-Language': 'browserLanguage',
     
    } 
  }
     ,
     
    );
  
      toast.success("request sent !");

      console.log(response.data);
    
  } catch (error) {
      toast.error('Error:', error.response?.data || error.message);
  }
    };


     let sendPurchaseRequests = async (data) =>{
  try {
    console.log(data);
    let response = await axios.post("https://realstate.niledevelopers.com/User/PurchaseRequests", 
   {
    propertyId: property.id,
    offeredPrice: property.price,
    notes:"interseted in purchasing this propertry"
  }
  
  ,{
    
      headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'application/json',
     'Accept-Language': 'browserLanguage',
     
    } 
  }
     ,
     
    );
  
      toast.success("request sent !");

      console.log(response.data);
    
  } catch (error) {
      toast.error('Error:', error.response?.data || error.message);
  }
    };



 return (
    <div className="container py-5">
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading proerty details ......</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && property && (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img 
               src={`https://realstate.niledevelopers.com/${property.mainImageUrl}`} 

                className="img-fluid w-100" 
                alt={property.title}
               style={{ width: '50%', height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h1 className="h3 fw-bold">{property.title}</h1>
                  
                  <span className="badge bg-success fs-6">{property.isAvailable ? "Available" : "Not Available"}</span>
                </div>
                
                <div className="d-flex align-items-center text-muted mb-4">
                  <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                  <span className="fs-5">{property.addressAr}</span>
                </div>

                <hr />
                
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-secondary leading-relaxed">
                  {property.description || "No description available for this property !"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Agent Information</h5>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-light rounded-circle p-3 me-3">
                
                    <i className="fa-brands fa-magento fs-2 text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{property.agentName || "Agent name not available"}</h6>
                    <small className="text-muted">Certified Real Estate Agent</small>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  <a href={`tel:${property.contactPhone}`} className="btn btn-primary d-flex align-items-center justify-content-center py-2">
                    <i className="bi bi-telephone-fill me-2"></i>
                    {property.contactPhone}
                  </a>
                  
                  <a href={`mailto:${property.contactEmail}`} 
                  className="btn btn-dark text-white  d-flex align-items-center justify-content-center py-2">
                    <i className="bi bi-envelope-fill me-2"></i>
                    Send Email
                  </a>
                </div>

                <div className="mt-4 pt-3 border-top">
        
<button type="button" className="btn btn-primary"
onClick={sendVisitRequest}
>
  Ask for a visit
</button>

<button type="button" className="btn btn-primary mx-1"
onClick={sendPurchaseRequests}
>
   Purchase Request
</button>


                </div>
              </div>
            </div>
          </div>
        </div>
      )}

   
{/* 
<div className="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="previewModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
                 <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" className="row g-3">
 

  <div className="col-md-12">
  <label htmlFor="inputEmail4" className="form-label">propertyId</label>
  <input 
    type="text" 
    className="form-control" 
    placeholder="Enter propertyId" 
    {...register("propertyId", { required: "This field is required" })} 
  />
</div>

{errors.propertyId && (
  <span className="text-danger">{errors.propertyId.message}</span>
)}

  <div className="col-12 d-flex justify-content-between">
    <button type="submit" className="btn btn-info px-4">Send Request</button>
   
  </div>
 
</form>
      </div>
      
    </div>
  </div>
</div> */}
    </div>



  );
}