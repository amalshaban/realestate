import React from 'react'
import PropertyMultiStepForm from './PropertyMultiStepForm.jsx';
import '/src/MultiStepForm.css';


export default function AddProperty() {
  return (
    <>
         <h3 className="headertxtstyle ">Add a new property</h3>
    
          <PropertyMultiStepForm />
    </>
  )
}
