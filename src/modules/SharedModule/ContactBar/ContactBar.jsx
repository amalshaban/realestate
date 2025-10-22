import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactBar() {
  return (
    <div className="container-fluid">
      <div className="row contactbar my-4">
        
           <div className=" col-md-3 col-sm-12">
            <i className="fa-solid fa-phone text-primary p-1"></i>+966 155 154 222
        </div>
         <div className=" col-md-3 col-sm-12">
           <i className="fa-regular fa-envelope text-primary p-1"></i> homimail@gmail.com
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex justify-content-end gap-3">
              <i className="fa-solid fa-globe"></i>
            <Link to=""> عربي
            </Link> 
          </div>
        </div>
      </div>
    </div>
    
  )
}
