import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LOCATIONS_URLs } from '../../../constants/EndPoints';
import { Authorization } from '../../../constants/Validations';
import axios from 'axios';
import '/src/MultiStepForm.css';

const Step3 = ({ formData, savePartialData, nextStep, prevStep }) => {
  
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue
    } = useForm({
         defaultValues: {
      id: formData.agentBranch.id || 0,
    agentId: formData.agentBranch.agentId || 0,
    branchName: formData.agentBranch.branchName || '',
    countryId: formData.agentBranch.countryId || 0,
    cityId: formData.agentBranch.cityId || 0,
    districtId: formData.agentBranch.districtId || 0,
    addressAr: formData.agentBranch.addressAr || '',
    addressEn: formData.agentBranch.addressEn || '',
    shortAddress: formData.agentBranch.shortAddress || '',
    buildingNo: formData.agentBranch.buildingNo || '',
    additonalNo: formData.agentBranch.additonalNo || '',
    zipeCode: formData.agentBranch.zipeCode || '',
    landlinePhone: formData.agentBranch.landlinePhone || '',
    mobilePhone: formData.agentBranch.mobilePhone || '',
    email: formData.agentBranch.email || '',
    whatsApp: formData.agentBranch.whatsApp || '',
    isMain: formData.agentBranch.isMain || false,
      }
    });
  




  


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


    
       const watchedCountryId = watch('countryId');
    const watchedCityId = watch('cityId');


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


  // const handleChange = (e) => {
  //   setLocal({ ...local, [e.target.name]: e.target.value });
  // };

  // const handleNext = () => {
  //   savePartialData(local);
  //   nextStep();
  // };


const onSubmit = (data) => {
  savePartialData({ agentBranch: { ...formData.agentBranch, ...data } }); 
  nextStep();
};

  return (
    <div className=''>
      <h3>Branch Data</h3>
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

  {/* Row 1 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.id ? 'input-error' : ''}`}
      placeholder={errors.id ? errors.id.message : 'id'}
      {...register("id", { required: 'id is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.agentId ? 'input-error' : ''}`}
      placeholder={errors.agentId ? errors.agentId.message : 'agentId'}
      {...register("agentId", { required: 'agentId is required !!' })}
    />
  </div>

  {/* Row 2 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.branchName ? 'input-error' : ''}`}
      placeholder={errors.branchName ? errors.branchName.message : 'branchName'}
      {...register("branchName", { required: 'branchName is required !!' })}
    />

    <select
      className={`mt-1 form-control ${errors.countryId ? 'input-error' : ''}`}
      {...register("countryId", {
        required: 'countryId is required !!',
        validate: value => value !== "0" || 'Please select a country'
      })}
    >
      <option value="0">Select Country</option>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>{country.name}</option>
      ))}
    </select>
  </div>

  {/* Row 3 */}
  <div className="d-flex justify-content-between">
    <select
      className={`mt-1 me-1 form-control ${errors.cityId ? 'input-error' : ''}`}
      {...register("cityId", {
        required: 'cityId is required !!',
        validate: value => value !== "0" || 'Please select a city'
      })}
      disabled={!watchedCountryId || watchedCountryId === 0}
    >
      <option value="0">Select City</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>{city.name}</option>
      ))}
    </select>

    <select
      className={`mt-1 form-control ${errors.districtId ? 'input-error' : ''}`}
      {...register("districtId", {
        required: 'districtId is required !!',
        validate: value => value !== "0" || 'Please select a district'
      })}
      disabled={!watchedCityId || watchedCityId === 0}
    >
      <option value="0">Select District</option>
      {districts.map((district) => (
        <option key={district.id} value={district.id}>{district.name}</option>
      ))}
    </select>
  </div>




{/* Row 4 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.addressAr ? 'input-error' : ''}`}
      placeholder={errors.addressAr ? errors.addressAr.message : 'addressAr'}
      {...register("addressAr", { required: 'addressAr is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.addressEn ? 'input-error' : ''}`}
      placeholder={errors.addressEn ? errors.addressEn.message : 'addressEn'}
      {...register("addressEn", { required: 'addressEn is required !!' })}
    />
  </div>
{/* Row 5 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.shortAddress ? 'input-error' : ''}`}
      placeholder={errors.shortAddress ? errors.addressAr.message : 'shortAddress'}
      {...register("shortAddress", { required: 'shortAddress is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.buildingNo ? 'input-error' : ''}`}
      placeholder={errors.buildingNo ? errors.buildingNo.message : 'buildingNo'}
      {...register("buildingNo", { required: 'buildingNo is required !!' })}
    />
  </div>


{/* Row 6 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.additonalNo ? 'input-error' : ''}`}
      placeholder={errors.additonalNo ? errors.additonalNo.message : 'additonalNo'}
      {...register("additonalNo", { required: 'additonalNo is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.zipeCode ? 'input-error' : ''}`}
      placeholder={errors.zipeCode ? errors.zipeCode.message : 'zipeCode'}
      {...register("zipeCode", { required: 'zipeCode is required !!' })}
    />
  </div>

{/* Row 7 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.landlinePhone ? 'input-error' : ''}`}
      placeholder={errors.landlinePhone ? errors.landlinePhone.message : 'landlinePhone'}
      {...register("landlinePhone", { required: 'landlinePhone is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.mobilePhone ? 'input-error' : ''}`}
      placeholder={errors.mobilePhone ? errors.mobilePhone.message : 'mobilePhone'}
      {...register("mobilePhone", { required: 'mobilePhone is required !!' })}
    />
  </div>


  {/* Row 8 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.email ? 'input-error' : ''}`}
      placeholder={errors.email ? errors.email.message : 'email'}
      {...register("email", { required: 'email is required !!' })}
    />

    <input
      type="text"
      className={`mt-1 form-control ${errors.whatsApp ? 'input-error' : ''}`}
      placeholder={errors.whatsApp ? errors.whatsApp.message : 'whatsApp'}
      {...register("whatsApp", { required: 'whatsApp is required !!' })}
    />
  </div>
 {/* Row 8 */}
  <div className="d-flex justify-content-between">
    <input
      type="text"
      className={`mt-1 me-1 form-control ${errors.isMain ? 'input-error' : ''}`}
      placeholder={errors.isMain ? errors.isMain.message : 'isMain'}
      {...register("isMain", { required: 'isMain is required !!' })}
    />
  </div>

  <div className="navigation mt-3">
    <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Previous</button>
    <button type="submit" className="btn btn-primary">Next</button>
  </div>
</form>

    </div>
  );
};

export default Step3;