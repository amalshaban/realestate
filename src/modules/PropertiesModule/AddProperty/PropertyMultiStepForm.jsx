import React, { useContext, useState } from 'react';
import Step1 from './GeneralInfo';
import Step2 from './Location';
import Step4 from './PhotosandVideos';
import Review from './PropertyReview';
import '/src/MultiStepForm.css';
import { AuthContext } from '../../AuthModule/context/AuthContext';

const MultiStepForm = () => {
  const { loginData } = useContext(AuthContext);

  const totalSteps = loginData ? 4 : 5;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Normalize keys coming from step forms (e.g., Title -> title) before saving
  const normalizeData = (data) => {
    const mapped = {};
    Object.entries(data || {}).forEach(([key, value]) => {
      switch (key) {
        case 'Title':
          mapped.title = value;
          break;
        case 'TitleAr':
          mapped.titleAr = value;
          break;
        case 'Description':
          mapped.description = value;
          break;
        case 'Address':
          mapped.address = value;
          break;
        case 'Price':
          mapped.price = value;
          break;
        case 'ContactPhone':
          mapped.contactPhone = value;
          break;
        default:
          mapped[key] = value;
      }
    });
    return mapped;
  };

  const savePartialData = (data) => {
    setFormData(prev => {
      const next = {
        ...prev,
        ...normalizeData(data)
      };
      console.log('savePartialData called - incoming:', data, 'next formData:', next);
      return next;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} savePartialData={savePartialData} nextStep={nextStep} />;
      case 2:
        return <Step2 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step4 formData={formData} savePartialData={savePartialData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Review formData={formData} prevStep={prevStep} />;
      default:
        return <h2>تم الإرسال</h2>;
    }
  };

  return (
    <div className="form-container-fluid">
      <div className="step-container">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          return (
            <div key={stepNumber} className="step-wrapper">
              <div className={`step-circle ${stepNumber <= currentStep ? 'filled' : ''}`}>
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className={`step-line ${stepNumber < currentStep ? 'filled-line' : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      <h2>Fill in property Data</h2>
      <p className="text-muted">You can always change them later.</p>

      <div className="form-step">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default MultiStepForm;
