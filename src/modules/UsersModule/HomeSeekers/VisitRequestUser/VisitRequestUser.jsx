import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthorizedToken } from "../../../../constants/Validations";
import { toast } from "react-toastify";


export default function VisitRequestUser() {
  const apiKey = 'Home@@3040';
  const [visitRequests, setVisitRequests] = useState([]);
useEffect(() => {
  const getVisitRequests = async () => {
    try {
      const response = await axios.get(
        "https://realstate.niledevelopers.com/User/VisitRequests",
        {   headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          'apiKey': apiKey,
          "Content-Type": 'application/json',
            }}
      );
      console.log('📦 Data:', response.data);
      setVisitRequests(response.data);
    } catch (error) {
      console.error('❌ Error response:', error.response);
    }
  };
  getVisitRequests();
}, []);

  const [suggestedDates, setSuggestedDates] = useState([]);
const viewSuggestedDates = async (visitRequestId) => {
  try {
    const response = await axios.post(
      "https://realstate.niledevelopers.com/User/VisitRequests/SuggestedDates",
      { visitRequestId },
      {   headers: { 
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
          }}
    );
    console.log(response.data);
    setSuggestedDates(response.data);
  } catch (error) {
    console.error('❌ Error response:', error.response);
  }
};

    
   const selectedDate = async (suggestedDateId) => {
  try {
    const response = await axios.post(
      "https://realstate.niledevelopers.com/User/VisitRequests/SelectDate",
      { suggestedDateId },
      {   headers: { 
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
          }}
    );
    toast.success("Done")
  } catch (error) {
    console.error('❌ Error response:', error.response);
  }
};

 const handleCheck = (dateId) => {
    selectedDate(dateId);
  };


  return (
  <>
    <div className="container-fluid my-4">
      <h2 className="mb-4 text-primary">📋 Visit Requests</h2>
 <div>
              <h3 className="py-3">Your Requests</h3>
<table className="table">
  <thead>
    <tr>
      <th scope="col">requestId</th>
      <th scope="col">agentId</th>
      <th scope="col">propertyName</th>
      <th scope="col">status</th>
      <th scope="col">request Date</th>
    </tr>
  </thead>
  <tbody>
  {visitRequests.length > 0 &&
    visitRequests.map((visitRequest) => (
      <tr key={visitRequest.requestId}>
        <td>{visitRequest.requestId}</td>
        <td>{visitRequest.agentId}</td>
        <td>{visitRequest.propertyName}</td>
      <td>
         {visitRequest.status === 1 ? (
  <span style={{ color: 'orange' }}>Pending</span>
) : visitRequest.status === 2 ? (
  <span style={{ color: 'green' }}>Accepted</span>
) : visitRequest.status === 3 ? (
  <span style={{ color: 'red' }}>Rejected</span>
) : (
  visitRequest.status // This is the final fallback
)}
      </td>
        <td>
          <button 
          onClick={() => viewSuggestedDates(visitRequest.requestId)}
          type="button" data-bs-toggle="modal" data-bs-target="#myModal">
            View Available Dates
          </button>
          </td>      
      </tr>
    ))}
</tbody>

</table>



    </div>




    <div className="modal fade" id="myModal" tabindex="-1">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Available Dates For Your Requests</h5>
       
      </div>
      <div className="modal-body">
<table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Date Available</th>
      <th scope="col">Check</th>
    </tr>
  </thead>
  <tbody>
  {suggestedDates.length > 0 &&
    suggestedDates.map((availableDate) => (
      <tr key={availableDate.id}>
        
        <td>{availableDate.id}</td>
        <td>{availableDate.suggestedDateTime}</td>
        <td>
          <input type="checkbox"
          onChange={() => handleCheck(availableDate.id)}
          />
        </td>
      </tr>
    ))}
</tbody>

</table>
      </div>
      <div className="modal-footer">
         <button 
  type="button" 
  className="btn btn-primary" 
  data-bs-dismiss="modal"
>
  Close
</button>
        {/* <button type="submit" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
    </div>
</>
  );
}