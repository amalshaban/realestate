import React, { useEffect, useState } from "react";
import axios from "axios";
import { USERS_URLs } from "../../../../constants/EndPoints";
import { useNavigate } from "react-router-dom";


export default function PropertiesList() {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    setBrowserLanguage(language);
  }, []);
  const apiKey = "Home@@3040";

  const [properties, setProperties] = useState([]);

 


  useEffect(() => {
    const getProperties = async () => {
      try {
        let response = await axios.get('https://realstate.niledevelopers.com/api/agent/properties', {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${sessionStorage.token}`,
            "Accept-Language": browserLanguage,
          },
        });
        setProperties(response.data.properties);
        console.log(response.data);
    
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };
    getProperties();
  }, []);


  const navigate = useNavigate()
const navigateProperty =()=>{
navigate('/properties/addproperty')
}

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <h2 className="mb-4">Properties List</h2>
            
          <button onClick={navigateProperty} className="btn btn-primary">new property</button>
          </div>
        </div>



        
      
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header d-flex justify-content-between ">
        <h5 className="modal-title text-info" id="exampleModalLabel">Filter by</h5>
      <p type="button" className="close fs-4" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </p>
      </div>
      <div className="modal-body">
        ...form inputs
      </div>
      <div className="modal-footer">
         <button type="button" className="btn btn-info">Save changes</button>
        <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>


  </div>
</div>
</div>

     <div className="row">
          <div className="col-md-8 p-0 ">
            <div className="properties-list">
            <div className="row search-property">
              <div className="col-md-4">
                <h3 className="">My Properties</h3>
                
              </div>
              <div className="col-md-8 d-flex justify-content-end align-items-center">
                <div className="search-side w-50 me-1">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span className="ms-1">Search Property</span>
                </div>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn text-black bg-transparent">
                  <i className="fa-solid fa-list-ul mx-2"></i>Filter
                </button>
              </div>
            </div>

            <div className="row">
              <table className="table custom-table mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Property</th>
                    <th scope="col">description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {properties && properties.length > 0 ? (
                    properties.map((property, idx) => (
                      <tr key={property.id || idx}>
                        <th scope="row">{idx + 1}</th>
                      
                      
                        <td>{property.title}</td>
                        <td>{property.description}</td>
                        <td>{property.price}</td>
                        <td>{property.status}</td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No properties found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
    </div>
    </div>
   
  </div>
</div>
  

    </>
  );
}
