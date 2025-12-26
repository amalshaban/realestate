import axios from 'axios';
import { toast } from 'react-toastify';
import { PROPERTIES_URLS } from '../../../constants/EndPoints';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthModule/context/AuthContext';
import { AuthorizedToken } from '../../../constants/Validations';

const Review = ({ formData, prevStep }) => {
  //const [browserLanguage, setBrowserLanguage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginData } = useContext(AuthContext);
 // const apiKey = 'Home@@3040';

  // useEffect(() => {
  //   const language = navigator.language || navigator.userLanguage; 
  //   setBrowserLanguage(language);
  // }, []);

  const handleSubmit = async () => {
    if (!formData) {
      toast.error('Form data is missing');
      return;
    }

    // Log final merged formData to help debugging
    console.log('Review formData:', formData);

    // Prepare values (no client-side blocking)

    setIsSubmitting(true);
    const payload = new FormData();

    try {
      // General info: accept both camelCase and PascalCase coming from previous steps
      payload.append('title', formData.title || formData.Title || '');
      payload.append('titleAr', formData.titleAr || formData.TitleAr || '');
      payload.append('description', formData.description || formData.Description || '');
      // payload.append('descriptionAr', formData.descriptionAr || '');
      payload.append('price', formData.price || formData.Price || '');
      payload.append('isNegotiable', formData.isNegotiable ? 'true' : (formData.IsNegotiable ? 'true' : 'false'));
      payload.append('realStateTypeId', formData.realStateTypeId || formData.realStateType || '');
      // Purpose (text) stored under realStatePurposeId
      payload.append('realStatePurposeId', formData.realStatePurposeId || formData.realStatePurpose || '');
      payload.append('realStateRentTypeId', formData.realStateRentTypeId || '');

      // Area details (if present)
      payload.append('countryId', formData.countryId || '');
      payload.append('cityId', formData.cityId || '');
      payload.append('districtId', formData.districtId || '');
      payload.append('contactPhone', formData.contactPhone || formData.ContactPhone || '');

      // Agent metadata (removed AgentId / InsertedBy / IsActive fields)
      payload.append('LocationDiscription', formData.LocationDiscription || '');

      // Images: append actual File object under multiple keys to match API expectations
      const imageFile = formData.images?.imageUrl || (Array.isArray(formData.images) && formData.images[0]);
      if (imageFile) {
        const file = imageFile;
        if (file instanceof File) {
          // Common variants
          payload.append('images', file);
          payload.append('images[0]', file);
          payload.append('images[0].imageUrl', file);
          payload.append('images.imageUrl', file);
        } else {
          payload.append('images.imageUrl', file || '');
        }
      }

      // Additional features

      // Handle amenities array
      if (Array.isArray(formData.amenities)) {
        formData.amenities.forEach((amenity, index) => {
          payload.append(`amenities[${index}]`, amenity);
        });
      }

        // Handle dynamic property fields saved from Location.jsx
      console.log('properties in formData:', formData.properties);
      const properties = formData.properties || Object.keys(formData)
        .filter(k => k.startsWith('property_'))
        .map(k => ({ propertyId: k.replace('property_', ''), value: formData[k] }));

      console.log('properties to send:', properties);

      if (Array.isArray(properties) && properties.length) {
        // Add JSON representation (server may accept this)
        payload.append('propertiesJson', JSON.stringify(properties));
        // Also append as indexed fields (common form-style)
        properties.forEach((p, idx) => {
          payload.append(`properties[${idx}].propertyId`, p.propertyId);
          payload.append(`properties[${idx}].value`, p.value || '');
        });
      }

      // Debug logging — iterate FormData and print file names for clarity
      for (let pair of payload.entries()) {
        const [k, v] = pair;
        if (v instanceof File) console.log('FormData entry:', k, v.name, v.size, v.type);
        else console.log('FormData entry:', k, v);
      }
      console.log('Auth token (session):', sessionStorage.token || loginData?.token);

      // Build headers from AuthorizedToken but remove Content-Type so axios can set the correct multipart boundary
      const config = { headers: { ...(AuthorizedToken.headers || {}) } };
      if (config.headers['Content-Type']) delete config.headers['Content-Type'];

      const response = await axios.post(PROPERTIES_URLS.addproperty, payload, config);

      if (response?.data) {
        console.log(response.data);
        toast.success('Property added successfully!');
      }

    } catch (error) {
      console.error('Submit error:', error?.message || error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
      console.error('Request config:', error.config);
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