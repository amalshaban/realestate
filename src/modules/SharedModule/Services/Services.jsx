import React from 'react'
import developersimg from "../../../../src/assets/imgs/Maskgroup1.png"
import marketingimg from "../../../../src/assets/imgs/Maskgroup3.png"
import photograghimg from "../../../../src/assets/imgs/Maskgroup2.png"
export default function Services() {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="leftServ">
                    <h3 className="headertxtstyle">Services</h3>
                    <p className="my-5">
                        Connecting buyers, sellers, and investors with trusted professionals. 
                        Whether you're a developer, marketing agency, or real estate photographer, 
                        our platform ensures seamless collaboration and premium results.
                    </p>
                    <div className="btn btn-primary px-5">Join Us <i className="fa-solid fa-arrow-right"></i></div>
                </div> 
                </div>
                    <div className="col-md-6">
                <div className="rightserv">
                    <div className="row">
                             <div className="col-md-2">
                        <img className='img-fluid' src={photograghimg}/>
                        </div>
                        <div className="col-md-10">
                            <div className="">
                            <h6 className="">Photographers</h6>
                            <p className="">Capture properties that sell faster with professional photography</p>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                             <div className="col-md-2">
                        <img className='img-fluid' src={marketingimg}/>
                        </div>
                        <div className="col-md-10"> <div className="">
                            <h6 className="">Marketing Agencies</h6>
                            <p className="">Boost visibility with targeted campaigns, virtual tours, and lead generation strategies.</p>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                             <div className="col-md-2">
                        <img className='img-fluid' src={developersimg}/>
                        </div>
                        <div className="col-md-10"> <div className="">
                            <h6 className="">Developers</h6>
                            <p className="">From concept to completion, showcase your projects to thousands of pre-qualified buyers.</p>
                        </div>
                        </div>
                    </div>
                       
                       
                </div>
                </div>
                
            </div>
        </div>
    </>
  )
}
