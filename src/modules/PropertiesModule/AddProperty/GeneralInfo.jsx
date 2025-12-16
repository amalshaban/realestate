import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { AuthorizedToken } from '../../../constants/Validations';

const GeneralInfo = ({ formData, savePartialData, nextStep, prevStep }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: formData.Title || "",
      TitleAr: formData.TitleAr || "",
      Description: formData.Description || "",
      Address: formData.Address || "",
      Price: formData.Price || "",
      ContactPhone: formData.ContactPhone || "",
      AgentId: formData.AgentId || "",
      InsertedBy: formData.InsertedBy || "",
      IsActive: formData.IsActive || false,
      InsertedDate: formData.InsertedDate || "",
      LocationDiscription: formData.LocationDiscription || "",
      countryId: formData.countryId || '',
      cityId: formData.cityId || '',
      districtId: formData.districtId || '',
      realStateRentTypeId: formData.realStateRentTypeId || '',
      realStatePurposeId: formData.realStatePurpose || formData.realStatePurposeId || ''
    },
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  //const [realestateTypes, setRealestateTypes] = useState([]);
  const [realestateRentTypeId, setRealestateRentTypeId] = useState(formData.realStateRentTypeId || '');
  const [selectedCountry, setSelectedCountry] = useState(formData.countryId || '');
  const [selectedCity, setSelectedCity] = useState(formData.cityId || '');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://realstate.niledevelopers.com/Api/Locations/Countries', AuthorizedToken);
        setCountries(res.data);
      } catch (err) {
        console.error('Error fetching countries:', err.response?.data || err.message);
      }
    };

   

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setCities([]);
      setSelectedCity('');
      setDistricts([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await axios.get(`https://realstate.niledevelopers.com/Api/Locations/Cities?id=${selectedCountry}`, AuthorizedToken);
        setCities(res.data);
      } catch (err) {
        console.error('Error fetching cities:', err.response?.data || err.message);
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCity) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        const res = await axios.get(`https://realstate.niledevelopers.com/Api/Locations/Districts?id=${selectedCity}`, AuthorizedToken);
        setDistricts(res.data);
      } catch (err) {
        console.error('Error fetching districts:', err.response?.data || err.message);
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [selectedCity]);

  const onSubmit = (data) => {
    savePartialData(data);   
    nextStep();
  };

  return (
    <div className="container mt-4">
      <h3>General Information</h3>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            {...register("Title", { required: "Title is required" })}
          />
          {errors.Title && (
            <small className="text-danger">{errors.Title.message}</small>
          )}
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
            {...register("Price", { required: "Price is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Phone</label>
          <input
            className="form-control"
            {...register("ContactPhone")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <select
            className="form-control"
            {...register('countryId', {
              onChange: (e) => {
                setSelectedCountry(e.target.value);
              }
            })}
          >
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <select
            className="form-control"
            {...register('cityId', {
              onChange: (e) => setSelectedCity(e.target.value)
            })}
          >
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">District</label>
          <select
            className="form-control"
            {...register('districtId')}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

       

        <div className="mb-3">
          <label className="form-label">Rent Type</label>
          {
            (() => {
              const rentReg = register('realStateRentTypeId');
              return (
                <input
                  type="text"
                  className="form-control"
                  {...rentReg}
                  value={realestateRentTypeId}
                  onChange={(e) => { rentReg.onChange && rentReg.onChange(e); setRealestateRentTypeId(e.target.value); }}
                />
              );
            })()
          }
        </div>

        <div className="mb-3">
          <label className="form-label">Purpose</label>
          <input
            type="text"
            className="form-control"
            {...register('realStatePurposeId')}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Agent ID</label>
          <input
            className="form-control"
            {...register("AgentId")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Inserted By</label>
          <input
            className="form-control"
            {...register("InsertedBy")}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("IsActive")}
            id="isActiveCheck"
          />
          <label className="form-check-label" htmlFor="isActiveCheck">Is Active</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Inserted Date</label>
          <input
            type="datetime-local"
            className="form-control"
            {...register("InsertedDate")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location Description</label>
          <textarea
            className="form-control"
            {...register("LocationDiscription")}
          />
        </div>

        <div className="navigation mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={prevStep}
          >
            Previous
          </button>

          <button type="submit" className="btn btn-info text-white">
            Next
          </button>
        </div>

      </form>
    </div>
  );
};

export default GeneralInfo;
