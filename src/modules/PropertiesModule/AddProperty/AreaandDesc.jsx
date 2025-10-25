
import { useForm } from 'react-hook-form';
import { LOCATIONS_URLs } from '../../../constants/EndPoints';
import { Authorization } from '../../../constants/Validations';
import '/src/MultiStepForm.css';


const Step3 = ({ formData, savePartialData, nextStep, prevStep }) => {
  
   const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
         defaultValues: {
    area: formData.area || '',
    bedrooms: formData.bedrooms || '',
    bathrooms: formData.bathrooms || '',
    livingRooms: formData.livingRooms || '',
    kitchens: formData.kitchens || '',
    hasElevator: formData.hasElevator || false,
    hasParking: formData.hasParking || '',
    parkingSpaces: formData.parkingSpaces || '',
    buildYear: formData.buildYear || '',
    address: formData.address || '',
    addressDescription: formData.addressDescription || '',
      }
    });
  




  

  // const handleChange = (e) => {
  //   setLocal({ ...local, [e.target.name]: e.target.value });
  // };

  // const handleNext = () => {
  //   savePartialData(local);
  //   nextStep();
  // };


 const onSubmit = (data) => {
    savePartialData(data);
    nextStep();
  };

  return (
    <div className=''>
      <h3>Area Data</h3>
    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex justify-content-between">
  <input
     type="text" className="mt-1 me-1 form-control" placeholder='area'
    {...register("area", {required:'area is required !!'})}
    />
  {errors.area && (
    <span className='text-danger'>{errors.area.message}</span>
  )} 


   <input
     type="text" className="mt-1 form-control" placeholder='bedrooms'
    {...register("bedrooms", {required:'bedrooms is required !!'})}
    />
  {errors.bedrooms && (
    <span className='text-danger'>{errors.bedrooms.message}</span>
  )} 

      </div>
    

      <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='livingRooms'
    {...register("livingRooms", {required:'livingRooms is required !!'})}
    />
  {errors.livingRooms && (
    <span className='text-danger'>{errors.livingRooms.message}</span>
  )}  

  
      </div>

    <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='kitchens'
    {...register("kitchens", {required:'kitchens is required !!'})}
    />
  {errors.kitchens && (
    <span className='text-danger'>{errors.kitchens.message}</span>
  )}  

  
      </div>

  <div className="d-flex justify-content-between">
            <input
     type="text" className="mt-1 me-1 form-control" placeholder='hasElevator'
    {...register("hasElevator", {required:'hasElevator is required !!'})}
    />
  {errors.hasElevator && (
    <span className='text-danger'>{errors.hasElevator.message}</span>
  )} 

      
  </div>

   <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='hasParking'
    {...register("hasParking", {required:'hasParking is required !!'})}
    />
  {errors.hasParking && (
    <span className='text-danger'>{errors.hasParking.message}</span>
  )}  

  
      </div>
         <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='parkingSpaces'
    {...register("parkingSpaces", {required:'parkingSpaces is required !!'})}
    />
  {errors.parkingSpaces && (
    <span className='text-danger'>{errors.parkingSpaces.message}</span>
  )}  

  
      </div>
         <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='buildYear'
    {...register("buildYear", {required:'buildYear is required !!'})}
    />
  {errors.buildYear && (
    <span className='text-danger'>{errors.buildYear.message}</span>
  )}  

  
      </div>
         <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='address'
    {...register("address", {required:'address is required !!'})}
    />
  {errors.address && (
    <span className='text-danger'>{errors.address.message}</span>
  )}  

  
      </div>
         <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='addressDescription'
    {...register("addressDescription", {required:'addressDescription is required !!'})}
    />
  {errors.addressDescription && (
    <span className='text-danger'>{errors.addressDescription.message}</span>
  )}  

  
      </div>

    <div className="d-flex justify-content-between">
   
  <input
     type="text" className="mt-1 form-control" placeholder='bathrooms'
    {...register("bathrooms", {required:'bathrooms is required !!'})}
    />
  {errors.bathrooms && (
    <span className='text-danger'>{errors.bathrooms.message}</span>
  )}  

  
      </div>


 <div className="navigation">
      <button onClick={prevStep}>Previous</button>
      <button type='submit'>Next</button>
      </div>
    </form>
    
    </div>
  );
};

export default Step3;