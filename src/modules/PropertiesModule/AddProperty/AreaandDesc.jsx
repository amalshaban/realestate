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
    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex justify-content-between">
               <input
     type="text" className="mt-1 me-1 form-control" placeholder='id'
    {...register("id", {required:'id is required !!'})}
    />
  {errors.id && (
    <span className='text-danger'>{errors.id.message}</span>
  )} 


   <input
     type="text" className="mt-1 form-control" placeholder='agentId'
    {...register("agentId", {required:'agentId is required !!'})}
    />
  {errors.agentId && (
    <span className='text-danger'>{errors.agentId.message}</span>
  )} 

      </div>
    

      <div className="d-flex justify-content-between">
   <input
     type="text" className="mt-1 me-1 form-control" placeholder='branchName'
    {...register("branchName", {required:'branchName is required !!'})}
    />
  {errors.branchName && (
    <span className='text-danger'>{errors.branchName.message}</span>
  )} 
     {/* <input
     type="text" className="mt-1 form-control" placeholder='countryId'
    {...register("countryId", {required:'countryId is required !!'})}
    />
  {errors.countryId && (
    <span className='text-danger'>{errors.countryId.message}</span>
  )}  */}

  <select className='' 
       {...register("countryId", {
            required: 'countryId is required !!',
           validate: value => value !== 0 || 'Please select a country' 
                        })}
                        >
  <option value={0}>select Country</option>
        {countries.map((country) => 
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )}
      </select>
 {errors.countryId && (
    <span className='text-danger'>{errors.countryId.message}</span>
  )}
  
      </div>
  

  
      <div className="d-flex justify-content-between">
           

  <select className='' 
   {...register("cityId", {
                            required: 'cityId is required !!',
                            validate: value => value !== 0 || 'Please select a city'
                        })}
                        disabled={!watchedCountryId || watchedCountryId === 0} 
                   
  >
         <option value={0}>select City</option>
        {cities.map((city) => 
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        )}
      </select>
       {errors.cityId && (
    <span className='text-danger'>{errors.cityId.message}</span>
  )}

  <select className=''
    {...register("districtId", {
                            required: 'districtId is required !!',
                            validate: value => value !== 0 || 'Please select a district'
                        })}
                        disabled={!watchedCityId || watchedCityId === 0}
  >
           <option value={0}>select District</option>
        {districts.map((district) => 
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        )}
      </select>
  {errors.districtId && (
    <span className='text-danger'>{errors.districtId.message}</span>
  )} 

      </div>
  


  <div className="d-flex justify-content-between">

         <input
     type="text" className="mt-1 me-1 form-control" placeholder='addressAr'
    {...register("addressAr", {required:'addressAr is required !!'})}
    />
  {errors.addressAr && (
    <span className='text-danger'>{errors.addressAr.message}</span>
  )} 

     <input
     type="text" className="mt-1 form-control" placeholder='addressEn'
    {...register("addressEn", {required:'addressEn is required !!'})}
    />
  {errors.addressEn && (
    <span className='text-danger'>{errors.addressEn.message}</span>
  )} 
  </div>
  

  <div className="d-flex justify-content-between">
     <input
     type="text" className="mt-1 me-1 form-control" placeholder='shortAddress'
    {...register("shortAddress", {required:'shortAddress is required !!'})}
    />
  {errors.shortAddress && (
    <span className='text-danger'>{errors.shortAddress.message}</span>
  )} 

     <input
     type="text" className="mt-1 form-control" placeholder='buildingNo'
    {...register("buildingNo", {required:'buildingNo is required !!'})}
    />
  {errors.buildingNo && (
    <span className='text-danger'>{errors.buildingNo.message}</span>
  )} 
  </div>
    


  <div className="d-flex justify-content-between">
            <input
     type="text" className="mt-1 me-1 form-control" placeholder='additonalNo'
    {...register("additonalNo", {required:'additonalNo is required !!'})}
    />
  {errors.additonalNo && (
    <span className='text-danger'>{errors.additonalNo.message}</span>
  )} 

      <input
     type="text" className="mt-1 form-control" placeholder='zipeCode'
    {...register("zipeCode", {required:'zipeCode is required !!'})}
    />
  {errors.zipeCode && (
    <span className='text-danger'>{errors.zipeCode.message}</span>
  )} 
  </div>



  <div className="d-flex justify-content-between">
             <input
     type="text" className="mt-1 me-1 form-control" placeholder='landlinePhone'
    {...register("landlinePhone", {required:'landlinePhone is required !!'})}
    />
  {errors.landlinePhone && (
    <span className='text-danger'>{errors.landlinePhone.message}</span>
  )} 

      <input
     type="text" className="mt-1 form-control" placeholder='mobilePhone'
    {...register("mobilePhone", {required:'mobilePhone is required !!'})}
    />
  {errors.mobilePhone && (
    <span className='text-danger'>{errors.mobilePhone.message}</span>
  )} 

  </div>
 


 
  <div className="d-flex justify-content-between">
             <input
     type="text" className="mt-1 me-1 form-control" placeholder='email'
    {...register("email", {required:'email is required !!'})}
    />
  {errors.email && (
    <span className='text-danger'>{errors.email.message}</span>
  )} 

      <input
     type="text" className="mt-1 form-control" placeholder='whatsApp'
    {...register("whatsApp", {required:'whatsApp is required !!'})}
    />
  {errors.whatsApp && (
    <span className='text-danger'>{errors.whatsApp.message}</span>
  )} 
  
  </div>
 
 
  <div className="d-flex justify-content-between">
              <input
     type="text" className="mt-1 form-control" placeholder='isMain'
    {...register("isMain", {required:'isMain is required !!'})}
    />
  {errors.isMain && (
    <span className='text-danger'>{errors.isMain.message}</span>
  )} 
  </div>



 <div className="navigation">
      <button onClick={prevStep}>Previous</button>
      <button type='submit'>Next</button>
      </div>
    </form>
      {/* <input className='mt-1' name="id" placeholder="id" value={local.id} onChange={handleChange} />
      <input  className='mt-1' name="agentId" placeholder="agentId" value={local.agentId} onChange={handleChange} />
      <input  className='mt-1' name="branchName" placeholder="branchName" value={local.branchName} onChange={handleChange} />
      <input className='mt-1'  name="countryId" placeholder="countryId" value={local.countryId} onChange={handleChange} />
      <input className='mt-1'  name="cityId" placeholder="cityId" value={local.cityId} onChange={handleChange} />
      <input className='mt-1'  name="districtId" placeholder="districtId" value={local.districtId} onChange={handleChange} />
      <input  className='mt-1' name="addressAr" placeholder="addressAr" value={local.addressAr} onChange={handleChange} />
      <input  className='mt-1' name="addressEn" placeholder="addressEn" value={local.addressEn} onChange={handleChange} />
      <input  className='mt-1' name="shortAddress" placeholder="shortAddress" value={local.shortAddress} onChange={handleChange} />
      <input className='mt-1'  name="buildingNo" placeholder="buildingNo" value={local.buildingNo} onChange={handleChange} />
      <input  className='mt-1' name="additonalNo" placeholder="additonalNo" value={local.additonalNo} onChange={handleChange} />
      <input  className='mt-1' name="zipeCode" placeholder="zipeCode" value={local.zipeCode} onChange={handleChange} />
      <input  className='mt-1' name="landlinePhone" placeholder="landlinePhone" value={local.landlinePhone} onChange={handleChange} />
      <input  className='mt-1' name="mobilePhone" placeholder="mobilePhone" value={local.mobilePhone} onChange={handleChange} />
      <input  className='mt-1' name="email" placeholder="email" value={local.email} onChange={handleChange} />
      <input  className='mt-1' name="whatsApp" placeholder="whatsApp" value={local.whatsApp} onChange={handleChange} />
      <input  className='mt-1' name="isMain" placeholder="isMain" value={local.isMain} onChange={handleChange} />
       */}
      
    </div>
  );
};

export default Step3;