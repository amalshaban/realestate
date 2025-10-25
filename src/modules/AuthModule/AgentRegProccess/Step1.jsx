import { useForm } from 'react-hook-form';


import '/src/MultiStepForm.css'
const Step1 = ({ formData, savePartialData, nextStep }) => {


  // const handleChange = (e) => {
  //   setLocal({ ...local, [e.target.register.name]: e.target.register.value });
  // };

  // const handleNext = () => {
  //   savePartialData(local);
  //   nextStep();
  // };
  
  
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
       defaultValues: {
    firstName: formData.register.firstName || '',
    lastName: formData.register.lastName || '',
    email: formData.register.email || '',
    password: formData.register.password || '',
    phone: formData.register.phone || ''
    }
  });

  
const onSubmit = (data) => {
  savePartialData({ register: { ...formData.register, ...data } }); 
  nextStep();
};



    
  


  
  return (
    <div>
       
    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
  
     <div>
      <h3>Personal Data</h3>
    <input
  type="text"
  className={`mt-1 form-control ${errors.firstName ? 'input-error' : ''}`}
  placeholder={errors.firstName ? errors.firstName.message : 'First Name'}
  {...register("firstName", { required: 'First Name is required !!' })}
/>

    <input
  type="text"
  className={`mt-1 form-control ${errors.lastName ? 'input-error' : ''}`}
  placeholder={errors.lastName ? errors.lastName.message : 'last Name'}
  {...register("lastName", { required: 'lastName is required !!' })}
/>
  
  <input
  type="text"
  className={`mt-1 form-control ${errors.email ? 'input-error' : ''}`}
  placeholder={errors.email ? errors.email.message : 'email'}
  {...register("email", { required: 'email is required !!' })}
/>
    
      <input
  type="text"
  className={`mt-1 form-control ${errors.email ? 'input-error' : ''}`}
  placeholder={errors.password ? errors.password.message : 'password'}
  {...register("password", { required: 'password is required !!' })}
/>
   
       <input
  type="text"
  className={`mt-1 form-control ${errors.phone ? 'input-error' : ''}`}
  placeholder={errors.phone ? errors.phone.message : 'phone'}
  {...register("phone", { required: 'phone is required !!' })}
/>
    
 



   <div className="navigation">
      <button type='submit'>Next</button>
      </div>
     </div>
    
      

    </form>  
    </div>
  );
};

export default Step1;