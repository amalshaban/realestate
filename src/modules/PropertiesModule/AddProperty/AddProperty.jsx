import React from 'react'
import PropertyMultiStepForm from './PropertyMultiStepForm.jsx';
import '/src/MultiStepForm.css';
import { useNavigate } from 'react-router-dom';


export default function AddProperty() {
  const navigate = useNavigate();
  const callallproperties = () => {
    navigate('/properties/viewproperties');
  }
  return (
    <>
         <h3 className="headertxtstyle ">Add a new property</h3>
    
          <PropertyMultiStepForm />


          <button onClick={callallproperties}>View all properties</button>
    </>
  )
}
