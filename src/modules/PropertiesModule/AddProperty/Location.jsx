import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import '/src/MultiStepForm.css';
import { LOCATIONS_URLs } from '../../../constants/EndPoints';
import { PROPERTIES_URLS } from '../../../constants/EndPoints';
import { Authorization } from '../../../constants/Validations';
import axios from 'axios';

const Location = ({ formData, savePartialData, nextStep, prevStep }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
    locationDescription: formData.locationDescription || '',
    countryId: formData.countryId || '',
    cityId: formData.cityId || '',
    districtId: formData.districtId || '',
    floorNumber: formData.floorNumber || '',
    totalFloors: formData.totalFloors || '',
    apartmentNumber: formData.apartmentNumber || '',
    contactPhone: formData.contactPhone || '',
    contactEmail: formData.contactEmail || '',
    
    }
  });

  const watchedCountryId = watch('countryId');
  const watchedCityId = watch('cityId');
 const [countries, setCountries] = useState([]);
   
    useEffect(()=>{
        const getCountries = async ()=> {
      try {  
       let response = await axios.get(LOCATIONS_URLs.Countries, Authorization);
    setCountries(response.data);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    };
    getCountries();
    },[] );


const [cities, setCities] = useState([]);
   
 useEffect(()=>{
   const getCities = async ()=> {
     setValue('cityId', 0);
            setValue('districtId', 0);
            setCities([]);
            setDistricts([]);
       if (watchedCountryId && watchedCountryId !== 0) { 
            try {
                let response = await axios.get(`https://realstate.niledevelopers.com/Api/Locations/Cities?id=${watchedCountryId}`,
                Authorization
                );
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error.response?.data || error.message);
            }
        } else {
            setCities([]); 
        }
    };
    getCities();
    }, [watchedCountryId, setValue]);

    const [districts, setDistricts] = useState([]);
   
 useEffect(()=>{
const getDistricts = async ()=> {
       setValue('districtId', 0);
            setDistricts([]);
         if (watchedCityId && watchedCityId !== 0){ // Added condition to prevent fetching on initial render when selectedCity is empty
            try {
                let response = await axios.get(`https://realstate.niledevelopers.com/Api/Locations/Districts?id=${watchedCityId}`,
                Authorization
                );
                setDistricts(response.data);
                
            } catch (error) {
                console.error('Error fetching districts:', error.response?.data || error.message);
            }
        } else {
            setDistricts([]); // Clear districts if no city is selected
        }
    };
    getDistricts();
    },  [watchedCityId, setValue]);

  const onSubmit = (data) => {
    savePartialData(data);
    nextStep();
  };


  return (
    <div>
      <h3>Location Data</h3>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-3">
          <select 
            className="form-control"
            {...register("countryId", { required: 'Country is required' })}
          >
            <option value="">Select Country</option>
            
    {countries.map((country) => 
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )}
          </select>
          {errors.countryId && (
            <span className="text-danger">{errors.countryId.message}</span>
          )}
        </div>

        <div className="form-group mt-3">
          <select 
            className="form-control"
            {...register("cityId", { required: 'City is required' })}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
  <option value="other"> City</option>
          </select>
          {errors.cityId && (
            <span className="text-danger">{errors.cityId.message}</span>
          )}
        </div>

        <div className="form-group mt-3">
          <select 
            className="form-control"
            {...register("districtId", { required: 'District is required' })}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
  <option value="other">District</option>
          </select>
          {errors.districtId && (
            <span className="text-danger">{errors.districtId.message}</span>
          )}
        </div>

        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Floor Number"
            {...register("floorNumber", { required: 'Floor number is required' })}
          />
          {errors.floorNumber && (
            <span className="text-danger">{errors.floorNumber.message}</span>
          )}
        </div>

        <div className="form-group mt-3">
  <input
    type="text"
    className="form-control"
    placeholder="Total Floors"
    {...register("totalFloors", { required: 'Total floors is required' })}
  />
  {errors.totalFloors && (
    <span className="text-danger">{errors.totalFloors.message}</span>
  )}
</div>

<div className="form-group mt-3">
  <input
    type="text"
    className="form-control"
    placeholder="Apartment Number"
    {...register("apartmentNumber", { required: 'Apartment number is required' })}
  />
  {errors.apartmentNumber && (
    <span className="text-danger">{errors.apartmentNumber.message}</span>
  )}
</div>

<div className="form-group mt-3">
  <input
    type="tel"
    className="form-control"
    placeholder="Contact Phone"
    {...register("contactPhone", { 
      required: 'Contact phone is required',
      pattern: {
        value: /^[0-9+\-\s()]*$/,
        message: 'Please enter a valid phone number'
      }
    })}
  />
  {errors.contactPhone && (
    <span className="text-danger">{errors.contactPhone.message}</span>
  )}
</div>

<div className="form-group mt-3">
  <input
    type="email"
    className="form-control"
    placeholder="Contact Email"
    {...register("contactEmail", {
      required: 'Contact email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address'
      }
    })}
  />
  {errors.contactEmail && (
    <span className="text-danger">{errors.contactEmail.message}</span>
  )}
</div>


<div className="form-group mt-3">
  <textarea
    className="form-control"
    placeholder="Location Description"
    rows="3"
    {...register("locationDescription", { required: 'Location description is required' })}
  ></textarea>
  {errors.locationDescription && (
    <span className="text-danger">{errors.locationDescription.message}</span>
  )}
</div>
        {/* Add other form fields similarly */}

        <div className="navigation mt-4">
          <button type="button" onClick={prevStep}>Previous</button>
     <button type='submit'>Next</button>
        </div>
      </form>
    </div>
  );
};

export default Location;