import React, { useEffect, useState } from 'react'
import { AuthorizedToken } from '../../../../constants/Validations';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VisitRequestAgent() {


  const apiKey = "Home@@3040";

const handleDateSubmit = async (propertyVisitRequestId) => {
  if (!dates[propertyVisitRequestId]) {  
    submitVisitDateWithOutId();
  }
    else (dates[propertyVisitRequestId])
    {
      submitVisitDateWithId(propertyVisitRequestId);
    }
}




  
const submitVisitDateWithOutId = async () => {
  
    
    try{
 await axios.post("https://realstate.niledevelopers.com/Agent/VisitRequests/SuggestedDates", 
      {
        propertyVisitRequestId :  crypto.randomUUID(),
        suggestedDateTime:  new Date().toISOString().slice(0, 16),
      },
      { headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
           'Accept-Language': 'browserLanguage',
           
          } }
    );

  
    toast.success("Date submitted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Error submitting date ❌");
  }
};
      
    // toast.warn("Please select a date first");
    // return;

const submitVisitDateWithId = async (propertyVisitRequestId) => {
  try{
 await axios.post("https://realstate.niledevelopers.com/Agent/VisitRequests/SuggestedDates", 
      {
        propertyVisitRequestId,
        suggestedDateTime: dates[propertyVisitRequestId]
      },
      { headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
           'Accept-Language': 'browserLanguage',
           
          } }
    );

  
    toast.success("Date submitted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Error submitting date ❌");
  }
}









const [dates, setDates] = useState({});
const handleDateChange = (requestId, value) => {
  setDates(prev => ({
    ...prev,
    [requestId]: value
  }));
};





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



 const [suggestVisitDateforonerequest, setSuggestVisitDateforonerequest] = useState([]);
const suggestVisitDate = async (visitRequestId) => {
  try{
 let response = await axios.post("https://realstate.niledevelopers.com/Agent/VisitRequests/SuggestedDates/List", 
        { visitRequestId },
      { headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
           'Accept-Language': 'browserLanguage',
           
          } }
    );
    setSuggestVisitDateforonerequest(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Error loading dates ❌");
  }
};



  return (
    <div>
              <h2 className="py-3">Your Requests</h2>
<table className="table">
  <thead>
    <tr>
      <th scope="col">requestId</th>
      <th scope="col">propertyName</th>
      <th scope="col">userName</th>
      <th scope="col">userPhone</th>
      
    </tr>
  </thead>
  <tbody>
  {visitRequests.length > 0 &&
    visitRequests.map((visitRequest) => (
      <tr key={visitRequest.requestId}>
        <th scope="row">{visitRequest.requestId}</th>
        <td>{visitRequest.propertyName}</td>
        <td>{visitRequest.userName}</td>
        <td>{visitRequest.userPhone}</td>
        <td>
          <button
          onClick={() => suggestVisitDate(visitRequest.requestId)}
          type="button" data-bs-toggle="modal" data-bs-target="#myModal">
          Suggest Dates
          </button>
          </td>

        
        
      </tr>
   ) )}
</tbody>

</table>



    <div className="modal fade" id="myModal" tabindex="-1">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Suggest Dates For this Request</h5>
       
      </div>
      <div className="modal-body">
<table className="table">
  <thead>
    <tr>
    <th scope="col">Visit Date</th>
    <th scope="col">Action</th>
    </tr>
  </thead>
 <tbody>
  {/* 1. عرض البيانات القادمة من الـ API إن وجدت */}
  {suggestVisitDateforonerequest.length > 0 ? (
    suggestVisitDateforonerequest.map((suggestDate) => (
      <tr key={suggestDate.id}>
        <td>
          <input
            type="datetime-local"
            className="form-control"
            value={dates[suggestDate.requestId] || ""}
            onChange={(e) =>
              handleDateChange(suggestDate.requestId, e.target.value)
            }
          />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => handleDateSubmit(suggestDate.id)}
          >
            Change
          </button>
        </td>
      </tr>
    ))
  ) : (
    /* 2. هذا السطر يظهر فقط إذا كان الـ API راجع ببيانات فاضية */
    <tr>
      <td>
        <input
          type="datetime-local"
          className="form-control"
          // هنا نستخدم معرف افتراضي أو نتركه فارغاً للطلب الجديد
          onChange={(e) => handleDateChange("new", e.target.value)}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-success"
            onClick={() => handleDateSubmit()} // أو أرسلي المعرف المناسب للجديد
        >
          Add New Date
        </button>
      </td>
    </tr>
  )}
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
  )
}
