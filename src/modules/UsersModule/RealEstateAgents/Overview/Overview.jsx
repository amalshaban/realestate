import React, { useEffect, useState } from 'react'
import propertyImg from "../../../../assets/imgs/rightoverview.png";
import profileImg from "../../../../assets/imgs/profile.png";
import axios from 'axios';
import { USERS_URLs } from '../../../../constants/EndPoints';
import { AuthorizedToken } from '../../../../constants/Validations';
import { useNavigate } from 'react-router-dom';


export default function Overview() {


 const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    setBrowserLanguage(language);
  }, []);
  const apiKey = "Home@@3040";
  
 const [agentProfile, setAgentProfile] = useState(null);

useEffect(() => {
  const getAgentProfile = async () => {
    try {
      const response = await axios.get(USERS_URLs.Profile, {
        headers: {
          apiKey,
          Authorization: `Bearer ${sessionStorage.token}`,
          "Accept-Language": browserLanguage,
        },
      });
      setAgentProfile(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  getAgentProfile();
}, []);

 const [visitRequests, setVisitRequests] = useState([]);
  useEffect(() => {
    const getVisitRequests = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/Agent/VisitRequests',
          AuthorizedToken
        );
        setVisitRequests(response.data);
  
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getVisitRequests();
  }, []);

 
  return (
    <div>
 <div className="container-fluid">
       <div className="row">
                      <div className="col-sm-12 col-md-8">
                        {agentProfile ? (
  <div>
    <img src={`https://realstate.niledevelopers.com/images/${agentProfile.logoPath}`}/>
    <h4>{agentProfile.nameEn}</h4>
    <p>{agentProfile.nameAr}</p>
  </div>
) : (
  <p>Loading...</p>
)}

                      </div>

                       <div className="col-md-4">
            <div className="requests">
              <div className="requests-head d-flex justify-content-between">
                <h4 className="">Requests (12)</h4>
                <button className="btn btn-primary" 
            
>
                  See All
                </button>
              </div>


        {visitRequests.length > 0 ? (
  visitRequests.slice(0, 3).map((visitRequest) => (
     <div className="d-flex pt-2 justify-content-between">
                <div className="d-flex  justify-content-between">
              <img className="msgImg" src={profileImg} alt="Profile" />                  
                  <div className="">
                    <h6>{visitRequest.userName}</h6>
                    <p className="">{visitRequest.requestDate}</p>
                  </div>
                </div>
                
                <p className="pt-1">{visitRequest.propertyId}</p>
                <i className="fa-solid fa-envelope pt-1"></i>
                
              
              
              <hr/>
              </div>

   ))
      ) : (
        ""
      )}

            </div>
          </div>

       </div>
       

           <div className="row">
          <div className="overview">
            <div className="row g-2">
              <div className="col-sm-12 col-md-8">
                <div className="left-overview">
                  <div className="upper d-flex justify-content-between">
                    <h1 className="">Overview</h1>
                    
                    <p className="my-3">Last Updated: 20 Mins ago</p>
                  </div>

                  <div className="lower d-flex flex-wrap justify-content-between">
                    <div className="lower-card1 col-12 col-lg-3 col-sm-12 ">
                      <div className="d-flex justify-content-between">
                        <h3>247</h3>
                        <span>+16%</span>
                      </div>
                      <h6 className="mt-3">Total Properties</h6>
                    </div>

                    <div className="lower-card2 col-12 col-lg-3 col-sm-12  ">
                      <div className="d-flex justify-content-between">
                        <h3>120</h3>
                        <span>+62%</span>
                      </div>
                      <h6 className="mt-3">Active Listings</h6>
                    </div>

                    <div className="lower-card3 col-12 col-lg-3 col-sm-12 ">
                      <div className="d-flex justify-content-between">
                        <h3>152</h3>
                        <span>+21%</span>
                      </div>
                      <h6 className="mt-3">Occupied Properties</h6>
                    </div>

                    <div className="lower-card4 col-12 col-lg-3 col-sm-12  ">
                      <div className="d-flex justify-content-between">
                        <h3>29</h3>
                        <span>+48%</span>
                      </div>
                      <h6 className="mt-3">Side Contracts</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4">
                <div className="right-overview d-flex justify-content-between">
                  <img src={propertyImg} className="w-50 h-auto" alt="Property" />
                  <div className="info d-flex flex-column  justify-content-between">
                    <h4>Townhouse</h4>
                    <p>P005</p>
                    <span>Property Views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
