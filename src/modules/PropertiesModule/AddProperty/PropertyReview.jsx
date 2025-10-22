import axios from 'axios';
import { toast } from 'react-toastify';
import { USERS_URLs } from '../../../constants/EndPoints';
import { Authorization } from '../../../constants/Validations';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthModule/context/AuthContext';

const Review = ({ formData, prevStep }) => {

  const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    const language = navigator.language || navigator.userLanguage; 
    setBrowserLanguage(language);
  }, []);
 const apiKey = 'Home@@3040';


const {loginData} = useContext(AuthContext);



 
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
} catch (error) {
    toast.error(error.response?.data || error.message ||'Error in sending Data');
}
  };


  return (
    <div>
     


    

      <div className="navigation">
          <button onClick={prevStep}>Go Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
     
    </div>





  );
};

export default Review;