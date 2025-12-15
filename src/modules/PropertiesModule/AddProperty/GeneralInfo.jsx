import React, { useEffect, useState } from "react";
import axios from "axios";  
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthorizedToken } from "../../../constants/Validations";

export default function AddProperty() {

  const { register, handleSubmit, formState: { errors } } = useForm();
const apiKey = 'Home@@3040';
  const [browserLanguage, setBrowserLanguage] = useState("en");

  useEffect(() => {
    setBrowserLanguage(navigator.language || "en");
  }, []);

  
  const appendToFormData = (data) => {
    const fd = new FormData();

    fd.append("Title", data.Title);
    fd.append("TitleAr", data.TitleAr);
    fd.append("Description", data.Description);
    fd.append("Address", data.Address);
    fd.append("Price", data.Price);
    fd.append("IsNegotiable", false);
    fd.append("ContactPhone", data.ContactPhone);

    fd.append("RealStatePurposeId", 1);
    fd.append("RealStateTypeId", 1);
    fd.append("RealStateRentTypeId", 2);
    fd.append("CountryId", 1);
    fd.append("CityId", 2);
    fd.append("DistrictId", 3);

    return fd;
  };

  const onSubmit = async (data) => {
        let userData = appendToFormData(data);   
    try {
    

      
      console.log([...userData.entries()]);

      const response = await axios.post(
        "https://realstate.niledevelopers.com/api/agent/property/add",
        userData,
      {
         headers: { 
        Authorization: `Bearer ${sessionStorage.token}`,
        'apiKey': apiKey,
        "Content-Type": 'multipart/form-data',
           'Accept-Language': 'browserLanguage',
          },
      }
      );

      toast.success("Property Added Successfully");
      console.log("Response:", response.data);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Property</h3>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            {...register("Title", { required: "Title is required" })}
          />
          {errors.Title && <small className="text-danger">{errors.Title.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Title Arabic</label>
          <input
            className="form-control"
            {...register("TitleAr", { required: "Arabic title is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            {...register("Description")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            {...register("Address")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("Price", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Phone</label>
          <input
            className="form-control"
            {...register("ContactPhone")}
          />
        </div>

        <button type="submit" className="btn btn-info text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
