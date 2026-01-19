import React, { useEffect, useState } from 'react'
import { apiKey, AuthorizedToken } from '../../../../constants/Validations';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RentRequestsAgent() {
   const [rentRequests, setRentRequests] = useState([]);
  useEffect(() => {
    const getRentRequests = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/Agent/RentalRequests',
          AuthorizedToken
        );
        setRentRequests(response.data);
  console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getRentRequests();
  }, []);

const acceptrentrequest = async (rentRequestId) => {
  try{
 let response = await axios.post("https://realstate.niledevelopers.com/Agent/RentalRequests/Accept", 
        { rentalRequestId: rentRequestId },
      { headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
           'Accept-Language': 'browserLanguage',    
          } }
    );
    toast.success("rent request accepted successfully ");
  } catch (error) {
    console.error(error);
    toast.error("Error loading data ❌");
  }
};



  return (
    <div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">propertyName</th>
      <th scope="col">offeredPrice</th>
      <th scope="col">userName</th>
      <th scope="col">userPhone</th>
      <th scope="col">notes</th>
      
    </tr>
  </thead>
  <tbody>
  {rentRequests.length > 0 &&
    rentRequests.map((rentRequest) => (
      <tr key={rentRequest.requestId}>
        <th scope="row">{rentRequest.propertyName}</th>
        <td>{rentRequest.offeredPrice}</td>
        <td>{rentRequest.userName}</td>
        <td>{rentRequest.userPhone}</td>
        <td>{rentRequest.notes}</td>
        <td>
          <button  onClick={() => acceptrentrequest(rentRequest.requestId)}>Accept</button>       
        
          </td>

        
        
      </tr>
   ) )}
</tbody>

</table>

    </div>
  )
}
