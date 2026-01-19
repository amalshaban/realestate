import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthorizedToken } from "../../../../constants/Validations";
import { toast } from "react-toastify";


export default function PurchaseRequestsUser() {

 const [purchaseRequests, setPurchaseRequests] = useState([]);
useEffect(() => {
  const getPurchaseRequests = async () => {
    try {
      const response = await axios.get(
        "https://realstate.niledevelopers.com/User/PurchaseRequests",
        AuthorizedToken,
      );
      console.log('📦 Data:', response.data);
      setPurchaseRequests(response.data);
    } catch (error) {
      console.error('❌ Error response:', error.response);
    }
  };
  getPurchaseRequests();
}, []);



    return(

<>
<h3>Properties you asked to purchase</h3>
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
  {purchaseRequests.length > 0 &&
    purchaseRequests.map((purchaseRequest) => (
      <tr key={purchaseRequest.requestId}>
        <td>{purchaseRequest.propertyName}</td>
        <td>{purchaseRequest.requestDate}</td>
        <td>{purchaseRequest.offeredPrice}</td>
             <td>
  {purchaseRequest.status === 1 ? (
    <span style={{ color: 'green' }}>Accepted</span>
  ) : purchaseRequest.status === 2 ? (
    <span style={{ color: 'red' }}>Rejected</span>
  ) : (
    purchaseRequest.status 
  )}
</td>
        <td>{purchaseRequest.notes}</td>
        <td>
        
          </td>      
      </tr>
    ))}
</tbody>
</table>
</>

    );
}