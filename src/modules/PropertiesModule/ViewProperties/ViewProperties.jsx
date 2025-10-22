import React from 'react'
import ContactBar from "../../SharedModule/ContactBar/ContactBar.jsx";
import NavBar from '../../SharedModule/NavBar/NavBar.jsx';
import Search from '../../SharedModule/Search/Search.jsx';
import ArcGISMap from '../../SharedModule/ArcGISMap/ArcGISMap.jsx';
import Footer from '../../SharedModule/Footer/Footer.jsx';


export default function ViewProperties() {
  return (
    <>
  
    <div className="p-5">
          <h3 className="headertxtstyle">Properties For Rent</h3>
          <p className="">1873 Property was Found</p>
          <div className="w-100 mb-3">
            <Search/>
          </div>

    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
            <ArcGISMap />
            </div>
        <div className="col-md-6">
    xxxxxxxxxxxxxxxxxxxxxxx
 
        </div>
      </div>
    </div>
    </>
  )
}
