import axios from 'axios';
import { toast } from 'react-toastify';
import { PROPERTIES_URLS } from '../../../constants/EndPoints';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthModule/context/AuthContext';

const Review = ({ formData, prevStep }) => {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginData } = useContext(AuthContext);
  const apiKey = 'Home@@3040';

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage; 
    setBrowserLanguage(language);
  }, []);

  const handleSubmit = async () => {
    if (!formData) {
      toast.error('Form data is missing');
      return;
    }

    setIsSubmitting(true);
    const payload = new FormData();

    try {
      // General info with null checks
      payload.append('title', formData.title || '');
      payload.append('titleAr', formData.titleAr || '');
      payload.append('description', formData.description || '');
     // payload.append('descriptionAr', formData.descriptionAr || '');
      payload.append('price', formData.price || '');
      payload.append('isNegotiable', formData.isNegotiable ? 'true' : 'false');
     payload.append('realStateTypeId', formData.realStateTypeId || '');
      payload.append('realStatePurposeId', formData.realStatePurposeId || '');
     payload.append('realStateRentTypeId', formData.realStateRentTypeId || '');

      // Area details
     // payload.append('area', formData.area || '');
     // payload.append('bedrooms', formData.bedrooms || '');
     // payload.append('bathrooms', formData.bathrooms || '');
     // payload.append('livingRooms', formData.livingRooms || '');
     // payload.append('kitchens', formData.kitchens || '');
      // payload.append('floorNumber', formData.floorNumber || '');
      // payload.append('totalFloors', formData.totalFloors || '');
      // payload.append('apartmentNumber', formData.apartmentNumber || '');


     // payload.append('hasElevator', formData.hasElevator ? 'true' : 'false');
     // payload.append('hasParking', formData.hasParking ? 'true' : 'false');
     // payload.append('parkingSpaces', formData.parkingSpaces || '');
     // payload.append('buildYear', formData.buildYear || '');
     // payload.append('address', formData.address || '');
     // payload.append('addressDescription', formData.addressDescription || '');
     // payload.append('locationDescription', formData.locationDescription || '');
     payload.append('countryId', formData.countryId || '');
      payload.append('cityId', formData.cityId || '');
      payload.append('districtId', formData.districtId || '');
      payload.append('contactPhone', formData.contactPhone || '');
     // payload.append('contactEmail', formData.contactEmail || '');


      payload.append('AgentId', formData.AgentId || '');
      payload.append('InsertedBy', formData.InsertedBy || '');
      payload.append('IsActive', formData.IsActive || '');
      payload.append('InsertedDate', formData.InsertedDate || '');
      payload.append('LocationDiscription', formData.LocationDiscription || '');


      // Images and videos with validation
      //if (formData.images?.imageUrl?.[0] instanceof File) {
        // payload.append('images.imageUrl', formData.images.imageUrl[0]);
     // }
      // payload.append('images.imageTitle', formData.images?.imageTitle || '');
      // payload.append('images.imageDescription', formData.images?.imageDescription || '');
      // payload.append('images.isMainImage', formData.images?.isMainImage ? 'true' : 'false');
      // payload.append('images.displayOrder', formData.images?.displayOrder || '');
      // payload.append('images.imageType', formData.images?.imageType || '');

      // Additional features
      // payload.append('videoUrl', formData.videoUrl || '');
     // payload.append('threeDTour', formData.threeDTour || '');
     // payload.append('isFeatured', formData.isFeatured ? 'true' : 'false');

      // Handle amenities array
      if (Array.isArray(formData.amenities)) {
        formData.amenities.forEach((amenity, index) => {
          payload.append(`amenities[${index}]`, amenity);
        });
      }

      // Debug logging
      console.log('Submitting payload:', Object.fromEntries(payload));
      console.log('Auth token:', loginData?.token);

      const response = await axios.post(PROPERTIES_URLS.addproperty, payload, {
        headers: {
          'Authorization': loginData?.token ? `Bearer ${loginData.token}` : '',
          'apiKey': apiKey,
          'Accept-Language': browserLanguage || 'en',
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data) {
        toast.success("Property added successfully!");
      }

    } catch (error) {
      console.error('Submit error:', error.response || error);
      toast.error(error.response?.data?.message || 'Error submitting property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Review Your Property Details</h2>
      <div className="navigation mt-4">
        <button 
          className="btn btn-secondary me-2" 
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Go Back
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Review;