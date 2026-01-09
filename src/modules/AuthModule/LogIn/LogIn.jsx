import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { apiKey ,  EmailValidation, PasswordValidation} from '../../../constants/Validations.js';
import {  USERS_URLs } from '../../../constants/EndPoints.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';




export default function LogIn() {

  const { loginData, saveLoginData } = useContext(AuthContext);
      const role = loginData?.role || 'anonymous';
      
  


console.log("Current Role:", role);

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
  sessionStorage.setItem('token', response.data.token);
toast.success("Welcome Back !");

saveLoginData();

// Navigate to home after successful login
navigate("/home", { replace: true });
console.log(role);
    
  } catch (error) {
      toast.error('Error:', error.response?.data || error.message);
  }
    };


    // Remove the useEffect that was navigating based on role
  /*  useEffect(() => {
    console.log("ROLE:", role); // 👈 مهم جدًا

    if (!role) return; // استنى لما ييجي

    switch (role) {
      case "Normal":
        navigate("/homeSeekerLayout", { replace: true });
        break;

      case "Agent":
        navigate("/agentLayout", { replace: true });
        break;

      default:
    
    }
  }, [role, navigate]); */

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
   
  </div>
 <Link className="text-info fw-100">Forget password ?</Link>
</form>
      </div>
      </>
  )
}
