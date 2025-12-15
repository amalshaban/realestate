import React, { useEffect, useState } from 'react'
import ContactBar from "../../SharedModule/ContactBar/ContactBar.jsx";
import NavBar from '../../SharedModule/NavBar/NavBar.jsx';
import Search from '../../SharedModule/Search/Search.jsx';
import ArcGISMap from '../../SharedModule/ArcGISMap/ArcGISMap.jsx';
import Footer from '../../SharedModule/Footer/Footer.jsx';
import { PROPERTIES_URLS } from '../../../constants/EndPoints.js';
import { AuthorizedToken } from '../../../constants/Validations.js';
import axios from 'axios';
import cardimg from "../../../assets/imgs/7da51552e8fc95cb3bd8bf2bf2d6ce580258031a.jpg";
import PropertyDetails from '../PropertyDetails/PropertyDetails.jsx';
import { useNavigate } from 'react-router-dom';

export default function ViewProperties() {

 
       const [myData, setMyData] = useState([]);
       const getmydata = async ()=> {
        try {  
         let response = await axios.get(PROPERTIES_URLS.allProperties, AuthorizedToken);
        
      setMyData(response.data.properties);
          
        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
        }
      }
      useEffect(()=>{
      
      getmydata()
      }, []);
useEffect(() => {
  console.log('Updated myData:', myData);
}, [myData]);

 const navigate = useNavigate();

const handeviewproperty = (id) => {
  console.log("Clicked property ID:", id);
  navigate(`/property/${id}`);
};
  return (
    <>
  
    <div className="p-5">
          <h3 className="headertxtstyle">Properties For Rent</h3>
          <p className="">1873 Property was Found</p>
          <div className="w-100 mb-3">
            <Search/>
          </div>


<div className="container">
  <div className="row">
     {myData.length > 0 ? (
        myData.map((property) => (
    <div  key={property.id} className="col-md-4">  
  <div
      className="card shadow-sm border-0 m-2 p-2"
      style={{ width: "18rem", borderRadius: "12px", overflow: "hidden" }}
    >
      <div className="position-relative">
        <img
          src={cardimg}
          className="card-img-top"
          alt="property"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <i 
          className="fa-solid fa-share-nodes position-absolute top-0 start-0 m-2"
          style={{  fontSize: "25px", color: 'white' }}
        >
        </i>

<button
  className="btn position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
  style={{
    width: "32px",
    height: "32px",
    color: "white",
    border: "none",
    backgroundColor: "#0088BD",
  }}
>
  <i className="fa-regular fa-heart"></i>
</button>
        <div
          className="position-absolute bottom-0 end-0 m-2 bg-dark text-white small px-3 py-2 rounded-end rounded-start"
          style={{ opacity: 0.9 }}
        >
          <i className="fa-solid fa-camera mx-2"></i>
             16
        </div>
      </div>
     <p>{property.title}</p>
            <h4>{property.price} SAR/Month</h4>
            <p>{property.address}</p>
          <span className=""> <i className="fa-solid fa-location-dot"></i>  Ta'if Saudi Arabia</span>
            <div className="">
            <span  style={{fontSize:'13px'}} className=' text-muted mx-1'> <i className="fa-solid fa-bed"></i> {property.bedrooms} rooms</span>
            <span  style={{fontSize:'13px'}} className=' text-muted mx-1'><i className="fa-solid fa-bath"></i> {property.bathrooms} douche</span>
            <span style={{fontSize:'13px'}} className=' text-muted mx-1'><i class="fa-solid fa-layer-group"></i>{property.area} mm</span>
   
<button onClick={() => handeviewproperty(property.id)}
   style={{
  margin:'10px 0',
   padding: '5px 13px',
    color: "white",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#0088BD",
  }}>
  View property
  </button>
 </div>
</div>
</div>
   ))
      ) : (
        <p>Loading properties...</p>
      )}
    
  </div>
</div>


    </div>
  


    </>
  )
}
