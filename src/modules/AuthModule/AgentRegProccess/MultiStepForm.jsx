import React, { useContext, useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Review from './Review';

import '/src/MultiStepForm.css'
import { AuthContext } from '../context/AuthContext';


const MultiStepForm = () => {

const {loginData} = useContext(AuthContext);


  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    register:{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    }  ,

    nameAr: '',
    nameEn: '',
    cr: '',
    fal: '',
    falExpiryDate: '',
    // logo: '',


    agentBranch:{
          id: '',
    agentId: '',
    branchName: '',
    countryId: '',
    cityId: '',
    districtId: '',
    addressAr: '',
    addressEn: '',
    shortAddress: '',
    buildingNo: '',
    additonalNo: '',
    zipeCode: '',
    landlinePhone: '',
    mobilePhone: '',
    email: '',
    whatsApp: '',
    isMain: ''
    }


  });


   // Handle form data change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // Move to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };





  const savePartialData = (partial) => {
    setFormData((prev) => ({
      ...prev,
      ...partial
    }));
  };
 

  
    const renderStepContent = () => {
    if (loginData) {
    // Logic for logged-in users
    switch (currentStep) {
      case 1:
        return <Step2 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step3 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Review formData={formData} prevStep={prevStep} />;
      default:
        return <h2>تم الإرسال</h2>;
    }
  } else {
    // Logic for non-logged-in users
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} savePartialData={savePartialData} nextStep={nextStep} />;
      case 2:
        return <Step2 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Review formData={formData} prevStep={prevStep} />;
      default:
        return <h2>تم الإرسال</h2>;
    }
  }
};
    
    
const totalSteps = loginData ? 3 : 4;
console.log(totalSteps);
 return (
    <div className="form-container">

      
      <div className="step-container">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          return (
            <div key={stepNumber} className="step-wrapper">
              <div
                className={`step-circle ${stepNumber <= currentStep ? 'filled' : ''}`}
              >
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`step-line ${stepNumber < currentStep ? 'filled-line' : ''}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <h2>Register as Agent</h2>
    <p className="text-mute">You can always change them later.</p>
      <div className="form-step">
        {renderStepContent()}
      </div>

    </div>
  );
};

export default MultiStepForm;