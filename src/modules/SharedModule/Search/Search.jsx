import React from 'react'
import { useState, useEffect } from 'react';
import { Authorization } from '../../../constants/Validations';
import { LOCATIONS_URLs, USERS_URLs } from '../../../constants/EndPoints';
import axios from 'axios';

export default function Search() {
  
 


     const [myData, setMyData] = useState([]);
     const getmydata = async ()=> {
      try {  
       let response = await axios.get(LOCATIONS_URLs.Countries, Authorization);
      
    setMyData(response.data);
        console.log(myData);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
    useEffect(()=>{
    
    getmydata()
    }, []);


  return (
 
<div className="container-fluid-no-padding">

<form className="searchform ">

<div className="row">
    <div className="col-md-3">
    <div className='formsearchitems'>
    <label>Location</label>
   <select className='searchSelect' >
    <option value="" disabled></option>
        {myData.map((country) => 
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )}
      </select>
    
  </div>
    </div>
    <div className="col-md-3">
      
  <div className='formsearchitems'>
    <label>Property Type</label>
    <div className=" dropdown">
          <a className="nav-link ps-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          select Property
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">one</a></li>
            <li><a className="dropdown-item" href="#">two</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">three</a></li>
          </ul>
    </div>
  </div>
    </div>
    <div className="col-md-3">
      
  <div className='formsearchitems'>
    <label>Price Range</label>
    <div className=" dropdown">
          <a className="nav-link ps-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          select Price
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">one</a></li>
            <li><a className="dropdown-item" href="#">two</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">three</a></li>
          </ul>
    </div>
  </div>

    </div>
  
    <div className="col-md-3">
<button className='btn btn-info '><i className="fa-solid fa-magnifying-glass"></i> Browse Properties</button>
</div>


 
 

</div>
</form>

</div>

  )
}
