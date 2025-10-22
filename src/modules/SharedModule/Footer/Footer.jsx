import React from 'react'
import { Link, Links } from 'react-router-dom'
import gmailimg from "../../../assets/imgs/Vector.png"
export default function Footer() {
  return (
    <>
      <div className="container-fluid">
        <div className="footer px-5 py-3">
          <div className="row py-3">
            <div className="col-md-12 text-end">
                    <Link to="" className='footerlink' >Search a home?</Link>
                    <div className="btn btn-primary px-4">Get Home Now <i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>
          <hr/>
          <div className="row py-3">
            <div className="col-md-4">
              <h3 className="">LOGO</h3>
              <p className="text-primary fs-7">Stay connected to buyers, sellers, and professionals. Discover, market, and invest with ease – all in one platform.</p>
              <h6 className="py-2 text-primary">Follow Us</h6>
              <div className="social d-flex align-items-center">
                <i className="fa-brands fa-facebook f"></i>
                <i className="fa-brands fa-x-twitter t"></i>
                <i className="fa-brands fa-linkedin l"></i>
                <img className="" src={gmailimg}/>
              </div>
            </div>
            <div className="col-md-2">
              <h6 className="py-2 text-primary">Explore</h6>
              <ul className="">
                <li className="">Rent</li>
                <li className="">Buy</li>
                <li className="">Marketing Agencies</li>
                <li className="">Professional Developers</li>
                <li className="">Photogrphers</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="py-2 text-primary">Services</h6>
              <ul className="">
                <li className="">Marketing</li>
                <li className="">Valuation and Pricing</li>
                <li className="">Advisory and Investment </li>
                <li className="">Photography</li>
                <li className="">Sales and Purchase Management</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="py-2 text-primary">Contact Information</h6>
              <div className="">
            <i className="fa-solid fa-phone text-primary p-1"></i> <Link>+966 155 154 222</Link>
              </div> <div className="">
           <i className="fa-solid fa-envelope text-primary p-1"></i><Link> hotmail@gmail.com </Link>
              </div>
               <div className="">
           <i className="fa-solid fa-location-dot text-primary p-1"></i> <Link> Tai’f, Saudi arabia </Link>
              </div>
              </div>
            <div className="col-md-2 d-flex flex-column justify-content-end">
              <h6 className="py-2 text-primary">Subscribe to our Newsletter</h6>
               
<div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Email Address" aria-label="Recipient’s 
  username" aria-describedby="basic-addon2"/>
  <span className="input-group-text bg-primary" id="basic-addon2">  <i className="fa-solid text-white fa-angle-right"></i></span>
</div>
               
           
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
