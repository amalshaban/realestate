import React, { useEffect, useState } from "react";
import profileImg from "../../../../assets/imgs/profile.png";
import axios from "axios";
import { USERS_URLs } from "../../../../constants/EndPoints";
import propertyImg from "../../../../assets/imgs/rightoverview.png";
export default function AgentList() {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    setBrowserLanguage(language);
  }, []);
  const apiKey = "Home@@3040";

  const [agentProfile, setAgentProfile] = useState([]);
  const [realEstateTypes, setRealEstateTypes] = useState([]);

  useEffect(() => {
    const getAgentProfile = async () => {
      try {
        let response = await axios.get(USERS_URLs.Profile, {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${sessionStorage.token}`,
            "Accept-Language": browserLanguage,
          },
        });
        setAgentProfile(response.data);
        console.log(response.data);
        console.log(agentProfile);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };
    getAgentProfile();
  }, []);


  useEffect(() => {
    const getRealEstateTypes = async () => {
      try {
        let response = await axios.get('https://realstate.niledevelopers.com/Api/General/RealStateTypes', {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${sessionStorage.token}`,
            "Accept-Language": browserLanguage,
          },
        });
        setRealEstateTypes(response.data);
        console.log(response.data);
        console.log(realEstateTypes);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };
    getRealEstateTypes();
  }, []);
  

  return (
    <>
      <div className="container-fluid">
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
        <div className="row">
          <div className="col-md-8 p-0 ">
            <div className="properties-list">
            <div className="row search-property">
              <div className="col-md-4">
                <h3 className="">Active Listing</h3>
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
                    <th scope="col">Location</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Views</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {/* <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
  <label className="form-check-label" for="checkDefault">
    P005
  </label>
</div> */}
                      1
                    </th>
                    <td>
                      <img className="" src={profileImg}></img>Duplex
                    </td>
                    <td>Ryadh, Saudi arabia</td>
                    <td>3.5M SAR</td>
                    <td>Active</td>
                    <td>19</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <img className="" src={profileImg}></img>Duplex
                    </td>
                    <td>Ryadh, Saudi arabia</td>
                    <td>3.5M SAR</td>
                    <td>Active</td>
                    <td>19</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <img className="" src={profileImg}></img>Duplex
                    </td>
                    <td>Ryadh, Saudi arabia</td>
                    <td>3.5M SAR</td>
                    <td>Active</td>
                    <td>19</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
          <div className="col-md-4">
            <div className="requests">
              <div className="requests-head d-flex justify-content-between">
                <h4 className="">Requests (12)</h4>
                <span className="">See All</span>
              </div>

               <div className="d-flex pt-2 justify-content-between">
                <div className="d-flex  justify-content-between">
              <img className="msgImg" src={profileImg} alt="Profile" />
                  <div className="">
                    <h6>Karim Kamal</h6>
                    <p className="">12-06-2025 at 11:30PM</p>
                  </div>
                </div>
                
                <p className="pt-1">P004</p>
                <i className="fa-solid fa-envelope pt-1"></i>
                
              </div>

              <hr/>
            
                <div className="d-flex pt-2 justify-content-between">
                <div className="d-flex  justify-content-between">
              <img className="msgImg" src={profileImg} alt="Profile" />
                  <div className="">
                    <h6>Karim Kamal</h6>
                    <p className="">12-06-2025 at 11:30PM</p>
                  </div>
                </div>
                
                <p className="pt-1">P004</p>
                <i className="fa-solid fa-envelope pt-1"></i>
                
              </div>

              <hr/>
                <div className="d-flex pt-2 justify-content-between">
                <div className="d-flex  justify-content-between">
              <img className="msgImg" src={profileImg} alt="Profile" />
                  <div className="">
                    <h6>Karim Kamal</h6>
                    <p className="">12-06-2025 at 11:30PM</p>
                  </div>
                </div>
                
                <p className="pt-1">P004</p>
                <i className="fa-solid fa-envelope pt-1"></i>
                
              </div>

              <hr/>
            </div>
          </div>
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


    </>
  );
}
