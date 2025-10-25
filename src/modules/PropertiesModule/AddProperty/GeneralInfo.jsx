
import '/src/MultiStepForm.css';
import { useForm } from 'react-hook-form';

const GeneralInfo = ({ formData, savePartialData, nextStep, prevStep }) => {


  // const handleNext = () => {
  //   savePartialData(data);
  //   nextStep();
  // };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
       defaultValues: {
    title: formData.title || '',
    titleAr: formData.titleAr || '',
    description: formData.description || '',
    descriptionAr: formData.descriptionAr || '',
    price: formData.price || '',
    isNegotiable: formData.isNegotiable || '',
    realStateTypeId: formData.realStateTypeId || '',
    realStatePurposeId: formData.realStatePurposeId || '',
    realStateRentTypeId: formData.realStateRentTypeId || ''
    

    }
  });

  const onSubmit = (data) => {
    savePartialData(data);
    nextStep();
  };

  return (
    
    <div className=''>
      <h3> General Information</h3>
      
    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>

    <input
     type="text" className="mt-1 form-control" placeholder='اسم الشركة'
    {...register("title", {required:'title !!'})}
    />
  {errors.title && (
    <span className='text-danger'>{errors.title.message}</span>
  )} 

    <input
     type="text" className="mt-1 form-control" placeholder='titleAr'
    {...register("titleAr", {required:'titleAr !!'})}
    />
  {errors.titleAr && (
    <span className='text-danger'>{errors.titleAr.message}</span>
  )} 

   <input
     type="text" className="mt-1 form-control" placeholder='description'
    {...register("description", {required:'description !!'})}
    />
  {errors.description && (
    <span className='text-danger'>{errors.description.message}</span>
  )} 

   <input
     type="text" className="mt-1 form-control" placeholder='descriptionAr'
    {...register("descriptionAr", {required:'descriptionAr is required !!'})}
    />
  {errors.descriptionAr && (
    <span className='text-danger'>{errors.descriptionAr.message}</span>
  )} 

   <input
     type="text" className="mt-1 form-control" placeholder='price'
    {...register("price", {required:'price is required !!'})}
    />
  {errors.price && (
    <span className='text-danger'>{errors.price.message}</span>
  )}  
  
    <input
     type="text" className="mt-1 form-control" placeholder='isNegotiable'
    {...register("isNegotiable", {required:'isNegotiable is required !!'})}
    />
  {errors.isNegotiable && (
    <span className='text-danger'>{errors.isNegotiable.message}</span>
  )}  
  
    <div className="form-group mt-3">
      <select
        className="form-control"
        {...register("realStateTypeId", { required: 'Property type is required' })}
      >
        <option value="">Select Property Type</option>
        <option value="1">Apartment</option>
        <option value="2">Villa</option>
        <option value="3">Office</option>
        <option value="4">Land</option>
      </select>
      {errors.realStateTypeId && (
        <span className="text-danger">{errors.realStateTypeId.message}</span>
      )}
    </div>
    <div className="form-group mt-3">
      <select
        className="form-control"
        {...register("realStatePurposeId", { required: 'Purpose is required' })}
      >
        <option value="">Select Purpose</option>
        <option value="1">For Sale</option>
        <option value="2">For Rent</option>
      </select>
      {errors.realStatePurposeId && (
        <span className="text-danger">{errors.realStatePurposeId.message}</span>
      )}
    </div>

        <div className="form-group mt-3">
      <select
        className="form-control"
        {...register("realStateRentTypeId", { 
          required: formData.realStatePurposeId === '2' ? 'Rent type is required' : false
        })}
        disabled={formData.realStatePurposeId !== '2'}
      >
        <option value="">Select Rent Type</option>
        <option value="1">Monthly</option>
        <option value="2">Yearly</option>
        <option value="3">Daily</option>
      </select>
      {errors.realStateRentTypeId && (
        <span className="text-danger">{errors.realStateRentTypeId.message}</span>
      )}
    </div>
    
    <div className="form-check mt-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="isNegotiable"
        {...register("isNegotiable")}
      />
      <label className="form-check-label" htmlFor="isNegotiable">
        Price is Negotiable
      </label>
    </div>
    
  
  <div className="navigation">
      <button onClick={prevStep}>Previous</button>
      <button type='submit'>Next</button>
      </div>
    </form>

    </div>
  );
};

export default GeneralInfo;