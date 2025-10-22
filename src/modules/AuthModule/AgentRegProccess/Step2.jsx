import { useForm } from 'react-hook-form';
import '/src/MultiStepForm.css';

const Step2 = ({ formData, savePartialData, nextStep, prevStep }) => {


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
    nameAr: formData.nameAr || '',
    nameEn: formData.nameEn || '',
    cr: formData.cr || '',
    fal: formData.fal || '',
    falExpiryDate: formData.falExpiryDate || '',
    logo: formData.logo || ''
    }
  });

  const onSubmit = (data) => {
    savePartialData(data);
    nextStep();
  };

  return (
    
    <div>
      <h3>Company Data</h3>
      
    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>

    <input
     type="text" className="mt-1 form-control" placeholder='اسم الشركة'
    {...register("nameAr", {required:'ادخل اسم الشركة من فضلك !!'})}
    />
  {errors.nameAr && (
    <span className='text-danger'>{errors.nameAr.message}</span>
  )} 

    <input
     type="text" className="mt-1 form-control" placeholder='Company Name'
    {...register("nameEn", {required:'Company Name is required !!'})}
    />
  {errors.nameEn && (
    <span className='text-danger'>{errors.nameEn.message}</span>
  )} 

   <input
     type="text" className="mt-1 form-control" placeholder='Cr'
    {...register("cr", {required:'Cr is required !!'})}
    />
  {errors.cr && (
    <span className='text-danger'>{errors.cr.message}</span>
  )} 

   <input
     type="text" className="mt-1 form-control" placeholder='fal'
    {...register("fal", {required:'fal is required !!'})}
    />
  {errors.fal && (
    <span className='text-danger'>{errors.fal.message}</span>
  )} 

   <input
     type="date" className="mt-1 form-control" placeholder='falExpiryDate'
    {...register("falExpiryDate", {required:'falExpiryDate is required !!'})}
    />
  {errors.falExpiryDate && (
    <span className='text-danger'>{errors.falExpiryDate.message}</span>
  )}  
  
   <input
     type="file" className="mt-1 form-control" placeholder='logo'
     onChange={(e) =>
      savePartialData({ logo:
        e.target.files[0]
      })
     }
    {...register("logo", {required:'logo is required !!'})}
    />
  {errors.logo && (
    <span className='text-danger'>{errors.logo.message}</span>
  )} 
  
  <div className="navigation">
      <button onClick={prevStep}>Previous</button>
      <button type='submit'>Next</button>
      </div>
    </form>
{/*   

      <input className='mt-1' name="nameAr" placeholder=" اسم الشركة" value={local.nameAr} onChange={handleChange} />
      <input  className='mt-1' name="nameEn" placeholder=" company name " value={local.nameEn} onChange={handleChange} />
      <input className='mt-1'  name="cr" placeholder="cr" value={local.cr} onChange={handleChange} />
      <input className='mt-1'  name="fal" placeholder="fal" value={local.fal} onChange={handleChange} />
      <input className='mt-1'  name="falExpiryDate" placeholder=" falExpiryDate" value={local.falExpiryDate} onChange={handleChange} />
      <input className='mt-1'  name="logo" placeholder=" logo" value={local.logo} onChange={handleChange} /> */}
     
    </div>
  );
};

export default Step2;