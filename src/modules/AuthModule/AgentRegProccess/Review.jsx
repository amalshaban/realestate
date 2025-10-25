import axios from 'axios';
import { toast } from 'react-toastify';
import { USERS_URLs } from '../../../constants/EndPoints';
import { Authorization } from '../../../constants/Validations';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Review = ({ formData, prevStep }) => {

  const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage; 
    setBrowserLanguage(language);
  }, []);
 const apiKey = 'Home@@3040';


const {loginData} = useContext(AuthContext);


const navigate = useNavigate();

 
  const handleSubmit = async () => {
   const payload = new FormData();

payload.append('nameAr', formData.nameAr);
payload.append('nameEn', formData.nameEn);
payload.append('cr', formData.cr);
payload.append('fal', formData.fal);
payload.append('falExpiryDate', formData.falExpiryDate);

  payload.append('logo', formData.logo[0]);


payload.append('register.firstName', formData.register.firstName);
payload.append('register.lastName', formData.register.lastName);
payload.append('register.email', formData.register.email);
payload.append('register.password', formData.register.password);
payload.append('register.phone', formData.register.phone);

// بيانات الفرع
payload.append('agentBranch.id', formData.agentBranch.id);
payload.append('agentBranch.agentId', formData.agentBranch.agentId);
payload.append('agentBranch.branchName', formData.agentBranch.branchName);
payload.append('agentBranch.countryId', formData.agentBranch.countryId);
payload.append('agentBranch.cityId', formData.agentBranch.cityId);
payload.append('agentBranch.districtId', formData.agentBranch.districtId);
payload.append('agentBranch.addressAr', formData.agentBranch.addressAr);
payload.append('agentBranch.addressEn', formData.agentBranch.addressEn);
payload.append('agentBranch.shortAddress', formData.agentBranch.shortAddress);
payload.append('agentBranch.buildingNo', formData.agentBranch.buildingNo);
payload.append('agentBranch.additonalNo', formData.agentBranch.additonalNo);
payload.append('agentBranch.zipeCode', formData.agentBranch.zipeCode);
payload.append('agentBranch.landlinePhone', formData.agentBranch.landlinePhone);
payload.append('agentBranch.mobilePhone', formData.agentBranch.mobilePhone);
payload.append('agentBranch.email', formData.agentBranch.email);
payload.append('agentBranch.whatsApp', formData.agentBranch.whatsApp);
payload.append('agentBranch.isMain', formData.agentBranch.isMain);


   try {
  let response = await axios.post(USERS_URLs.AgentRegister,  payload, {
    headers: {
      'Authorization': loginData ?`Bearer ${loginData}`: '',
      'apiKey': apiKey,
     'Accept-Language': browserLanguage,
      }
  })
 
  
  toast.success( response?.data?.message ||  "congratulations, your account was created successfully !");
navigate('/home');
} catch (error) {
    toast.error(error.response?.data || error.message ||'Error in sending Data');
}
  };



// const handleSubmit = async () => {
//   const payload = {
//     nameAr: formData.nameAr,
//     nameEn: formData.nameEn,
//     cr: formData.cr,
//     fal: formData.fal,
//     falExpiryDate: formData.falExpiryDate,
//     register: { ...formData.register },
//     agentBranch: {
//       ...formData.agentBranch,
//       id: +formData.agentBranch.id || 0,
//       agentId: +formData.agentBranch.agentId || 0,
//       countryId: +formData.agentBranch.countryId,
//       cityId: +formData.agentBranch.cityId,
//       districtId: +formData.agentBranch.districtId,
//       buildingNo: +formData.agentBranch.buildingNo,
//       additonalNo: +formData.agentBranch.additonalNo,
//       zipeCode: +formData.agentBranch.zipeCode,
//       isMain: Boolean(formData.agentBranch.isMain),
//     },
//   };

//   try {
//     const response = await axios.post(
//       USERS_URLs.AgentRegister,
//       payload,
//       Authorization
//     );

//     toast.success(response?.data?.message || 'تم التسجيل بنجاح');
//     console.log('✅ success:', response.data);
//   } catch (error) {
//     console.error('❌ error:', error.response);
    
//     toast.error(
//       error.response?.data?.message ||
//       error.response?.data ||
//       error.message ||
//       'Error in sending Data'
//     );
//   }
// };



  return (
    <>
    <div>
      <h3 className='text-danger'>Revise Your Data</h3>
<div className="">
  
      <h3> Company Data</h3>
   <p className="">اسم الشركه : {formData.nameAr}</p>   
      <p className="">Company Name: {formData.nameEn}</p>
      <p className="">cr: {formData.cr}</p>
      <p className=""> fal: {formData.fal}</p>
      <p className="">falExpiryDate: {formData.falExpiryDate}</p>
    
</div>


         <div>
      <h3> Personal Data</h3>
   {Object.keys(formData.register).length > 0 && (
        <div>
          {Object.entries(formData.register).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
      )}
</div>

  <div>
      <h3> AgentBranch Data</h3>
   {Object.keys(formData.agentBranch).length > 0 && (
        <div>
          {Object.entries(formData.agentBranch).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
      )}
</div>
    

     
     
    </div>
 <div className="navigation">
          <button onClick={prevStep}>Go Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      </>




  );
};

export default Review;