import React from 'react'
import PropertyMultiStepForm from './PropertyMultiStepForm.jsx';
import '/src/MultiStepForm.css';


export default function AddProperty() {
  return (
    <>
   
         <h3 className="headertxtstyle">Add your property</h3>
         <h2 className='text-primary'>Property Information</h2>
          <PropertyMultiStepForm />
    </>
  )
}
