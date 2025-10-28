import React, { useContext, useState } from 'react';
import Step1 from './GeneralInfo';
import Step2 from './Location';
import Step3 from './AreaandDesc';
import Step4 from './PhotosandVideos';
import Review from './PropertyReview';

import '/src/MultiStepForm.css';

import { AuthContext } from '../../AuthModule/context/AuthContext';
import GeneralInfo from './GeneralInfo';
import PhotosandVideos from './PhotosandVideos';


const MultiStepForm = () => {

const {loginData} = useContext(AuthContext);


  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    
    title:'',
    titleAr: '',
    description: '',
    descriptionAr:  '',
    price:  '',
    isNegotiable: '',
    realStateTypeId: '',
    realStatePurposeId: '',
    realStateRentTypeId: '',


    area: '',
    bedrooms: '',
    livingRooms:  '',
    kitchens: '',
    hasElevator: true,
    hasParking: true,
    parkingSpaces: 0,
    buildYear: 2030,
    address: '',
    addressDescription: '',


    locationDescription: '',
    countryId: '',
    cityId: '',
    districtId: '',
    contactPhone: '',
    contactEmail: '',
    totalFloors: '',
    apartmentNumber:  '',
    floorNumber: '',


    images:{
      imageUrl: [],
      imageTitle: '',
      imageDescription: '',
      isMainImage: false,
      displayOrder: '',
      imageType: ''    },
   videoUrl: '',
   threeDTour: '',
   isFeatured: '',
   amenities: []
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

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
  switch (currentStep) {
    case 1:
      return <Step1 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
    case 2:
      return <Step2 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <Step3 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <Step4 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <Review formData={formData} prevStep={prevStep} />;
    default:
      return <h2>تم الإرسال</h2>;
  }
};
    
    
const totalSteps = loginData ? 5 : 6;
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
      <h2>Fill in property Data</h2>
    <p className="text-mute">You can always change them later.</p>
      <div className="form-step">
        {renderStepContent()}
      </div>
 
    </div>
  );
};

export default MultiStepForm;