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
     type="text" className="mt-1 form-control" placeholder='firstName'
    {...register("firstName", {required:'firstName is required !!'})}
    />
  {errors.firstName && (
    <span className='text-danger'>{errors.firstName.message}</span>
  )} 
     <input
     type="text" className="mt-1 form-control" placeholder='lastName'
    {...register("lastName", {required:'lastName is required !!'})}
    />
  {errors.lastName && (
    <span className='text-danger'>{errors.lastName.message}</span>
  )} 
     <input
     type="text" className="mt-1 form-control" placeholder='email'
    {...register("email", {required:'email is required !!'})}
    />
  {errors.email && (
    <span className='text-danger'>{errors.email.message}</span>
  )} 
     <input
     type="text" className="mt-1 form-control" placeholder='password'
    {...register("password", {required:'password is required !!'})}
    />
  {errors.password && (
    <span className='text-danger'>{errors.password.message}</span>
  )} 
     <input
     type="text" className="mt-1 form-control" placeholder='phone'
    {...register("phone", {required:'phone is required !!'})}
    />
  {errors.phone && (
    <span className='text-danger'>{errors.phone.message}</span>
  )} 




   <div className="navigation">
      <button type='submit'>Next</button>
      </div>
     </div>
    
      

    </form>  
    </div>
  );
};

export default Step1;