import React, { useEffect, useState } from 'react'
import { apiKey, Authorization, AuthorizedToken, FieldValidation } from '../../../../constants/Validations';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export default function AddRent() {
const [existingRent, setExistingRent] = useState(null);

  const [rentRequests, setRentRequests] = useState([]);
  useEffect(() => {
    const getRentRequests = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/Agent/RentalRequests',
          AuthorizedToken
        );
        setRentRequests(response.data);
  console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    getRentRequests();
  }, []);


   const [nationalTypes, setNationalTypes] = useState([]);
  useEffect(() => {
    const getNationalTypes = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/General/NationalTypes',
          AuthorizedToken
        );
        setNationalTypes(response.data);
  console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    getNationalTypes();
  }, []);



const handlePropertyRent = (propertyId, rentRequests) => {
  const id = Number(propertyId);

  const rent = rentRequests.find(
    (r) => r.propertyId === id
  );

  if (rent) {
    // ✅ موجود → نملأ القيم
    setExistingRent(rent);
    setValue("rentRequestId", rent.requestId);
    setValue("fullName", rent.userName);
    setValue("mobile", rent.userPhone);
    
    setValue("rentTypeId", rent.rentTypeId);
  } else {
    // ❌ مش موجود → نفرغ القيم + فتح الحقول
    setExistingRent(null);
    setValue("rentRequestId", "");
    setValue("fullName", "");
    setValue("mobile", "");
    setValue("rentTypeId", "");
  }
};




       const [properties, setproperties] = useState([]);
     const getProperties = async ()=> {
      try {  
       let response = await axios.get("https://realstate.niledevelopers.com/agent/properties", 
        {
     headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'application/json',
     
    } }
       );  
    setproperties(response.data.properties);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
    useEffect(()=>{  
    getProperties()
    }, []);

       const [country, setCountry] = useState([]);
     const getCountry = async ()=> {
      try {  
       let response = await axios.get("https://realstate.niledevelopers.com/Locations/Nationalities", Authorization);  
    setCountry(response.data);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
    useEffect(()=>{  
    getCountry()
    }, []);


       const [rentTypes, setRentTypes] = useState([]);
     const getRentTypes = async ()=> {
      try {  
       let response = await axios.get("https://realstate.niledevelopers.com/General/RentTypes", Authorization);  
    setRentTypes(response.data);
    console.log(response.data);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
    useEffect(()=>{  
    getRentTypes()
    }, []);

 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
} = useForm({ mode: "onBlur" });


  
  const onSubmit = async (data)=>{
    try {
      const response = await axios.post("https://realstate.niledevelopers.com/Agent/Rent/Create", data, 
        {
     headers: { 
  Authorization: `Bearer ${sessionStorage.token}`,
  'apiKey': apiKey,
  "Content-Type": 'application/json',
     
     
    } }
      );
    
    
      console.log(response);

      toast.success(
        response?.data?.message || 'congratulations, rental contract created !'
      );
    console.log(response)
      } 
     catch (error) {
     toast.error(
      error.response.data.message || "Creating rental contract unsuccessful. Please try again"
    );
     console.log(error);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">📋 Add Rental Contract</h2> 
      </div>

     <form className='container-form' onSubmit={handleSubmit(onSubmit)}>

         <div className=" my-4">
        <label className="main-color my-1"> property</label>
           <select
  className="searchSelect mt-0"
  {...register("propertyId", {
    required: true,
    onChange: (e) =>
      handlePropertyRent(e.target.value, rentRequests),
  })}
>
    <option value="" disabled></option>
        {properties?.map((property) => 
          <option key={property.id} value={property.id}>
            {property.title}
          </option>
        )}
      </select>      
        </div>
       {errors?.propertyId && (
  <span className="text-danger">
    {String(errors.propertyId.message)}
  </span>
)}




        <div className=" my-4">
        <label className="main-color my-1">start Date</label>
          <div className="input-group ">
          <input type="date" className="form-control form-input"
           placeholder="Enter your start date"
           aria-label="start date" aria-describedby="basic-addon1"
           {...register("startDate",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.startDate && (
                <span className="text-danger">
                  {String(errors?.startDate.message)}
                </span>
        )}
        


         <div className=" my-4">
        <label className="main-color my-1">End Date</label>
          <div className="input-group ">
          <input type="date" className="form-control form-input"
           placeholder="Enter your end date"
           aria-label="end date" aria-describedby="basic-addon1"
           {...register("endDate",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.endDate && (
                <span className="text-danger">
                  {String(errors?.endDate.message)}
                </span>
        )}


<div className="my-4">
  <label className="main-color my-1">Rent Type</label>

  <select
    className="searchSelect mt-0"
    disabled={!!existingRent}
    {...register("rentTypeId", FieldValidation.required)}
  >
    <option value="">Select rent type</option>

    {rentTypes.map((rentType) => (
      <option key={rentType.id} value={rentType.id}>
        {rentType.name}
      </option>
    ))}
  </select>
</div>

        {errors?.rentTypeId && (
                <span className="text-danger">
                  {String(errors?.rentTypeId.message)}
                </span>
        )}



              <div className=" my-4">
        <label className="main-color my-1">monthly Payment</label>
          <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your monthly payment"
           aria-label="monthly payment" aria-describedby="basic-addon1"
           {...register("monthlyPayment",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.monthlyPayment && (
                <span className="text-danger">
                  {String(errors?.monthlyPayment.message)}
                </span>
        )}

             <div className=" my-4">
        <label className="main-color my-1">totalAmount</label>
          <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your total amount"
           aria-label="total amount" aria-describedby="basic-addon1"
           {...register("totalAmount",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.totalAmount && (
                <span className="text-danger">
                  {String(errors?.totalAmount.message)}
                </span>
        )}


        <div className=" my-4">
        <label className="main-color my-1">monthlyAmount</label>
          <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your monthly amount"
           aria-label="monthly amount" aria-describedby="basic-addon1"
           {...register("monthlyAmount",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.monthlyAmount && (
                <span className="text-danger">
                  {String(errors?.monthlyAmount.message)}
                </span>
        )}


            <div className=" my-4">
        <label className="main-color my-1">rentRequest</label>
          <div className="input-group ">
          {/* rentRequestId */}
<input
  type="text"
  className="form-control form-input"
  disabled={!!existingRent}   // 🔹 لو فيه existingRent يبقى مقفول، لو مش موجود يبقى مفتوح
  {...register("rentRequestId", FieldValidation.required)}
/>
{existingRent && <input type="hidden" {...register("rentRequestId")} />}

          </div>
         
        </div>
        {errors?.rentRequestId && (
                <span className="text-danger">
                  {String(errors?.rentRequestId.message)}
                </span>
        )}



         <div className=" my-4">
        <label className="main-color my-1">fullName</label>
          <div className="input-group ">
        {/* fullName */}
<input
  type="text"
  className="form-control form-input"
  disabled={!!existingRent}
  {...register("fullName", FieldValidation.required)}
/>
{existingRent && <input type="hidden" {...register("fullName")} />}

          </div>
         
        </div>
        {errors?.fullName && (
                <span className="text-danger">
                  {String(errors?.fullName.message)}
                </span>
        )}


         <div className=" my-4">
        <label className="main-color my-1">nationality</label>


         <select className='searchSelect mt-0' >
    <option value="" disabled></option>
        {country.map((country) => 
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )}
      </select>
           
          {/* <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your nationality id"
           aria-label="nationality id" aria-describedby="basic-addon1"
           {...register("nationalityId",FieldValidation.required)}
           />
          </div> */}
         
        </div>
        {errors?.nationalityId && (
                <span className="text-danger">
                  {String(errors?.nationalityId.message)}
                </span>
        )}





  <div className=" my-4">
        <label className="main-color my-1"> national Type</label>
          <div className="input-group ">
            <select {...register("nationalTypeId", FieldValidation.required)}>
           <option value="" ></option>
        {nationalTypes.map((nationaltype) => 
          <option key={nationaltype.id} value={nationaltype.id}>
            {nationaltype.name}
          </option>
        )}
      </select>
          </div>
         
        </div>
        {errors?.nationalTypeId && (
                <span className="text-danger">
                  {String(errors?.nationalTypeId.message)}
                </span>
        )}   





         <div className=" my-4">
        <label className="main-color my-1">nationalId</label>
          <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your national id"
           aria-label="national id" aria-describedby="basic-addon1"
           {...register("nationalId",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.nationalId && (
                <span className="text-danger">
                  {String(errors?.nationalId.message)}
                </span>
        )}




          <div className=" my-4">
        <label className="main-color my-1">mobile</label>
          <div className="input-group ">
       {/* mobile */}
<input
  type="text"
  className="form-control form-input"
  disabled={!!existingRent}
  {...register("mobile", FieldValidation.required)}
/>
{existingRent && <input type="hidden" {...register("mobile")} />}

          </div>
         
        </div>
        {errors?.mobile && (
                <span className="text-danger">
                  {String(errors?.mobile.message)}
                </span>
        )}


            <div className=" my-4">
        <label className="main-color my-1">status</label>
          <div className="input-group ">
          <input type="text" className="form-control form-input"
           placeholder="Enter your status"
           aria-label="status" aria-describedby="basic-addon1"
           {...register("status",FieldValidation.required)}
           />
          </div>
         
        </div>
        {errors?.status && (
                <span className="text-danger">
                  {String(errors?.status.message)}
                </span>
        )}


       <div className="main-bg-color rounded-pill py-1 py-md-2">          
        <button
                type="submit"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
      </form>
    </div>
  )
}
