import React, { useEffect, useState } from 'react'
import { apiKey, AuthorizedToken } from '../../../../constants/Validations';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Rents() {
   const [rents, setRents] = useState([]);
  useEffect(() => {
    const getRents = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/Agent/Rents',
          
        {
     headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'application/json'
    
     
    } });
        setRents(response.data);
  console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getRents();
  }, []);


const navigate=useNavigate();
const navigatetonewrent = () =>{
  navigate("/agentlayout/addrent");
}

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">📋 Rents</h2>
        <button onClick={navigatetonewrent} className='btn btn-primary'>Add new Rental Contract</button>
      </div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">propertyName</th>
      <th scope="col">monthlyAmount</th>
      <th scope="col">Tenant Name</th>
      <th scope="col">Tenant Phone</th>
      <th scope="col">status</th>
      <th scope="col">totalAmount</th>
      
    </tr>
  </thead>
  <tbody>
  {rents.length > 0 &&
    rents.map((rent) => (
      <tr key={rent.id}>
        <th scope="row">{rent.propertyTitle}</th>
        <td>{rent.monthlyAmount}</td>
        <td>{rent.fullName}</td>
        <td>{rent.mobile}</td>
       
       <td> 
        {rent.status === 2 && ( <span className="badge bg-success px-3 py-2">Accepted</span> )}
        {rent.status === 1 && ( <span className="badge bg-warning text-dark px-3 py-2">Pending</span> )} 
        {rent.status === 0 && ( <span className="badge bg-danger px-3 py-2">Rejected</span> )}
        
         
        </td>
        <td>{rent.totalAmount}</td>
        {/* <td>
          <button  onClick={() => acceptrentrequest(rentRequest.requestId)}>Accept</button>       
        
          </td> */}

        
        
      </tr>
   ) )}
</tbody>

</table>

    </div>
  )
}
