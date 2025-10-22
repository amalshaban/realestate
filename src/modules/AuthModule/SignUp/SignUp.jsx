import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { Authorization, AuthorizedToken } from '../../../constants/Validations.js';
import { USERS_URLs } from '../../../constants/EndPoints.js';
import {  EmailValidation, PasswordValidation } from '../../../constants/Validations.js';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';



export default function SignUp() {
  


    let { loginData } = useContext(AuthContext);



  const appendToFormData = (data) =>{
    const formData = new FormData();
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    // formData.append("email", data.email)
    // formData.append("phone", data.phone)
    // formData.append("password", data.password)
    formData.append("photo", data.photo[0])

    return formData;
}

const navigate = useNavigate();
const backhome =()=> {
  navigate('/home');
}


    const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage; 
    setBrowserLanguage(language);
  }, []);
 const apiKey = 'Home@@3040';

let {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  let onSubmit = async (data) =>{

             let userData = loginData ? appendToFormData(data) : '';

     
try {
{
  
  let response = await axios.post(
    loginData ?  USERS_URLs.Update : USERS_URLs.Register, 
    loginData ?  userData : data,
    loginData ? AuthorizedToken : {
      headers: {
        'Authorization': '',
        'apiKey': apiKey,
        'Content-Type': 'application/json',
        'Accept-Language': browserLanguage,
        },
    } ,
  );
     console.log('Success:', response.data);
     loginData ?   toast.success("congratulations, your account was Updated successfully !")
     :toast.success("congratulations, your account was created successfully !");  
     sessionStorage.setItem('token', response.data.token);
         window.location.reload();
  }
 
}
 catch (error) {
        toast.error( error.response.data.message  || error.message);
}
  };

   const handleClickAgent = () => { 
    navigate('/auth/signupagent', { replace: true }); 
    window.location.reload();
};


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = (setterFunction) => {
      setterFunction((prevState) => !prevState);
    };





  return (
    <>


 <div className="container">
  <div className="signupform">

              <form onSubmit={handleSubmit(onSubmit)}  autocomplete="off" className="row g-3">
             
              <div className="col-md-12">
                    {loginData ? (
        <h3 className="py-4">Update your Account</h3>
      ) : (
                <h4 className="py-3 text-info">Register - New Account</h4>
      )}

              </div>
              <div className="col-md-6">
    <label htmlFor="inputFirstName" className="form-label">First Name</label>
    <input type="text" className="form-control" placeholder='Ahmed' id="inputFirstName"
    
    {...register("firstName", {required:'firstName is required !'})}
    />
  </div>
  {errors.firstName && (
    <span className='text-danger'>{errors.firstName.message}</span>
  )} 
  <div className="col-md-6">
    <label htmlFor="inputLastName" className="form-label">Last Name</label>
    <input type="text" className="form-control" placeholder='Ali' id="inputLastName"
    
    {...register("lastName", {required:'lastName is required !'})}
    />
  </div>
  {errors.lastName && (
    <span className='text-danger'>{errors.lastName.message}</span>
  )} 
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" placeholder='Ahmed@gmail.com' id="inputEmail4"
    
    {...register("email", EmailValidation)}
    />
  </div>
   {errors.email && (
    <span className='text-danger'>{errors.email.message}</span>
  )}
  <div className="col-md-6">
    <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
    <input type="text" className="form-control" placeholder='564 892 6534' id="inputPhoneNumber"
    
    {...register("phone", {required:'Phone is required !'})}
    />
  </div>
   {errors.phone && (
    <span className='text-danger'>{errors.phone.message}</span>
  )}
  <div className="col-md-6 passInput">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input  type={`${isPasswordVisible?"text" : "password"  }`}
     className="form-control form-input"
    placeholder='*******' id="inputPassword"
    
    {...register("password", PasswordValidation)}
    />
     <button
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  type="button"
                  onClick={() => toggleVisibility(setIsPasswordVisible)}
                  className="input-group-text border-0"
                >
                  <span className="sr-only">
                    {isPasswordVisible ? "hide password" : "show password"}
                  </span>
                  <i
                    className={
                      isPasswordVisible
                        ? "fa-solid text-blue fa-eye"
                        : "fa-solid text-blue fa-eye-slash"
                    }
                  ></i>
                  
     </button>
  </div>
   {errors.password && (
    <span className='text-danger'>{errors.password.message}</span>
  )}
  {/* <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" placeholder='*******' id="inputPassword4"
    {...register("confirmpass")}/>
  </div> */}
  {/* <div className="col-md-12">
  <select className=" form-control" aria-label="Default select example">
  <option defaultValue>Select Catergory</option>
  <option value="1">Catergory One</option>
  <option value="2">CatergoryTwo</option>
  <option value="3">Catergory Three</option>
</select>
  </div> */}
{/* 
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" id="inputCity"/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">State</label>
    <select id="inputState" className="form-control">
      <option defaultValue>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip"/>
  </div> */}
 


  <div className="col-12">
      {loginData ? (
        // If loginData is NOT empty/falsy
        <>
         <div className="col-md-6">
    <label htmlFor="inputFirstName" className="form-label"> photo </label>
    <input type="file" className="form-control" placeholder='Upload Image' id="inputFirstName"
    
    {...register("photo", {required:'image is required !'})}
    />
  </div>
  {errors.photo && (
    <span className='text-danger'>{errors.photo.message}</span>
  )} 
    <button type="submit" className="btn btn-info px-4">Update</button>
    <button onClick={handleClickAgent} className="btn btn-outline-info mx-2 px-4">Upgrade to Agent</button>
        </>
      ) : (
        // If loginData IS empty/falsy
    <button type="submit" className="btn btn-info px-4 my-2">Sign up</button>
      )}
      
    <button onClick={backhome} className="btn btn-outline-info my-2 ms-2">Back to Home</button>
  </div>

</form>

  </div>
      </div>
      
    </>
  )
}
