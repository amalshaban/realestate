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
      
   <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

  {/* اسم الشركة بالعربي */}
  <input
    type="text"
    className={`mt-1 form-control ${errors.nameAr ? 'input-error' : ''}`}
    placeholder={errors.nameAr ? errors.nameAr.message : 'اسم الشركة'}
    {...register("nameAr", { required: 'ادخل اسم الشركة من فضلك !!' })}
  />

  {/* اسم الشركة بالإنجليزي */}
  <input
    type="text"
    className={`mt-1 form-control ${errors.nameEn ? 'input-error' : ''}`}
    placeholder={errors.nameEn ? errors.nameEn.message : 'Company Name'}
    {...register("nameEn", { required: 'Company Name is required !!' })}
  />

  {/* CR */}
  <input
    type="text"
    className={`mt-1 form-control ${errors.cr ? 'input-error' : ''}`}
    placeholder={errors.cr ? errors.cr.message : 'Cr'}
    {...register("cr", { required: 'Cr is required !!' })}
  />

  {/* FAL */}
  <input
    type="text"
    className={`mt-1 form-control ${errors.fal ? 'input-error' : ''}`}
    placeholder={errors.fal ? errors.fal.message : 'fal'}
    {...register("fal", { required: 'fal is required !!' })}
  />

  {/* تاريخ انتهاء FAL */}
  <input
    type="date"
    className={`mt-1 form-control ${errors.falExpiryDate ? 'input-error' : ''}`}
    placeholder={errors.falExpiryDate ? errors.falExpiryDate.message : 'falExpiryDate'}
    {...register("falExpiryDate", { required: 'falExpiryDate is required !!' })}
  />

  {/* اللوجو */}
  <input
    type="file"
    className={`mt-1 form-control ${errors.logo ? 'input-error' : ''}`}
    onChange={(e) => savePartialData({ logo: e.target.files[0] })}
    {...register("logo", { required: 'logo is required !!' })}
    placeholder={errors.logo ? errors.logo.message : 'logo'}
  />

  <div className="navigation mt-3 d-flex justify-content-between">
    <button type="button" onClick={prevStep} className="btn btn-secondary">Previous</button>
    <button type="submit" className="btn btn-primary">Next</button>
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