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
  {/* <tbody>
  {purchaseRequests.length > 0 &&
    purchaseRequests.map((purchaseRequest) => (
      <tr key={purchaseRequest.requestId}>
        <td>{purchaseRequest.propertyName}</td>
        <td>{purchaseRequest.requestDate}</td>
        <td>{purchaseRequest.offeredPrice}</td>
        <td>{purchaseRequest.status}</td>
        <td>{purchaseRequest.notes}</td>
        <td>
        
          </td>      
      </tr>
    ))}
</tbody> */}
</table>
</>

    );
}