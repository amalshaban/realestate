import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { apiKey ,  EmailValidation, PasswordValidation} from '../../../constants/Validations.js';
import {  USERS_URLs } from '../../../constants/EndPoints.js';
import { Link, useNavigate } from 'react-router-dom';




export default function LogIn() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = (setterFunction) => {
      setterFunction((prevState) => !prevState);
    };
const navigate = useNavigate();
  let {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm();
    let onSubmit = async (data) =>{
  try {
    console.log(data);
    let response = await axios.post(USERS_URLs.Login, data,
     {
  headers: {
    'Authorization': '',
    'apiKey': apiKey,
     "Content-Type": 'application/json'
    },
     }
    );
    console.log('Success:', response);
      sessionStorage.setItem('token', response.data.token);
      toast.success("Welcome Back !");
      
      navigate('/agentLayout');
  
      console.log(response.data.token);
    
  } catch (error) {
      toast.error('Error:', error.response?.data || error.message);
  }
    };
  
  return (
    <>
     <div className="container">
              <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" className="row g-3">
  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control"  placeholder='Ahmed@gmail.com' id="inputEmail4"
    
    {...register("email", EmailValidation)}
    />
  </div>
   {errors.email && (
    <span className='text-danger'>{errors.email.message}</span>
  )}
 
  <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <div className="passInput">

 <input type={`${isPasswordVisible?"text" : "password"  }`}
     className="form-control form-input"
    placeholder='*******' id="inputPassword"
    {...register("password", 'PasswordValidation')}
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
  </div>
   {errors.password && (
    <span className='text-danger'>{errors.password.message}</span>
  )}
  

 
  <div className="col-12 d-flex justify-content-between">
    <button type="submit" className="btn btn-info px-4">Sign In</button>
    <Link className="text-info fw-100">Forget password ?</Link>
  </div>

</form>
      </div>
      </>
  )
}
