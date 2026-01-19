import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthorizedToken } from "../../../../constants/Validations";
import { toast } from "react-toastify";


export default function RentalRequestsUser() {

const [rentalRequests, setRentalRequests] = useState([]);
useEffect(() => {
  const getRentalRequests = async () => {
    try {
      const response = await axios.get(
        "https://realstate.niledevelopers.com/User/RentalRequests",
        AuthorizedToken,
      );
      console.log('📦 Data:', response.data);
      setRentalRequests(response.data);
    } catch (error) {
      console.error('❌ Error response:', error.response);
    }
  };
  getRentalRequests();
}, []);

    return(

<>
<h3>Properties you asked to rent</h3>
<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">propertyName</th>
      <th scope="col">requestDate</th>
      <th scope="col">offeredPrice</th>
      <th scope="col">status</th>
      <th scope="col">notes</th>
    </tr>
  </thead>
  <tbody>
  {rentalRequests.length > 0 &&
    rentalRequests.map((rentalRequest) => (
      <tr key={rentalRequest.requestId}>
        <td>{rentalRequest.propertyName}</td>
        <td>{rentalRequest.requestDate}</td>
        <td>{rentalRequest.offeredPrice}</td>
        <td>
           {rentalRequest.status === 1 ? (
  <span style={{ color: 'orange' }}>Pending</span>
) : rentalRequest.status === 2 ? (
  <span style={{ color: 'green' }}>Accepted</span>
) : rentalRequest.status === 3 ? (
  <span style={{ color: 'red' }}>Rejected</span>
) : (
  rentalRequest.status // This is the final fallback
)}
        </td>
        <td>{rentalRequest.notes}</td>
        <td>
        
          </td>      
      </tr>
    ))}
</tbody>
</table>
</>

    );
}