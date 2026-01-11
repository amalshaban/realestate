import React, { useEffect, useState } from 'react'
import { apiKey, AuthorizedToken } from '../../../../constants/Validations';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PurchaseRquestsAgent() {
   const [purchaseRequests, setPurchaseRequests] = useState([]);
  useEffect(() => {
    const getPurchaseRequests = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/Agent/PurchaseRequests',
          AuthorizedToken
        );
        setPurchaseRequests(response.data);
  console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getPurchaseRequests();
  }, []);

const acceptpurchaserequest = async (purchaseRequestId) => {
  try{
 let response = await axios.post("https://realstate.niledevelopers.com/Agent/PurchaseRequests/Accept", 
        { purchaseRequestId },
      { headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'application/json',
           'Accept-Language': 'browserLanguage',    
          } }
    );
    toast.success("purchase request accepted successfully ✅");
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
  {purchaseRequests.length > 0 &&
    purchaseRequests.map((purchaseRequest) => (
      <tr key={purchaseRequest.requestId}>
        <th scope="row">{purchaseRequest.propertyName}</th>
        <td>{purchaseRequest.offeredPrice}</td>
        <td>{purchaseRequest.userName}</td>
        <td>{purchaseRequest.userPhone}</td>
        <td>{purchaseRequest.notes}</td>
        <td>
          <button  onClick={() => acceptpurchaserequest(purchaseRequest.requestId)}>Accept</button>       
        
          </td>

        
        
      </tr>
   ) )}
</tbody>

</table>

    </div>
  )
}
