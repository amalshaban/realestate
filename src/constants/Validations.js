import { isMatch }   from 'date-fns';
import React from 'react';
const isValidFormat = isMatch('YYYY-MM-DDTHH:mm:ss.sssZ');
export const DateValidation = {
  required: "Date is required",
  pattern: {
    value: isValidFormat,
    message: "Please enter a valid Date",
  },
};
 
 export const apiKey = 'Home@@3040';
export const Authorization =    {
headers: {
  'Authorization': '',
  'apiKey': apiKey,
  'Content-Type': 'application/json',
  //'Accept-Language': browserLanguage,
  },
   };

   
   export const AuthorizedToken = {
     headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'multipart/form-data',
     'Accept-Language': 'browserLanguage',
    } };

export const EmailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email",
  },
};

const RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/;

export const PasswordValidation = {
  required: "Password is required",
  pattern: {
    value: RegExp,
    message:
      "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};


