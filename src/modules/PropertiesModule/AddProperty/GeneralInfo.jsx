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
  const [rentTypes, setRentTypes] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(formData.countryId || '');
  const [selectedCity, setSelectedCity] = useState(formData.cityId || '');

  // Fetching Logic (نفس المنطق الخاص بك بدون تغيير لضمان عمل الـ API)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [resCountries, resRent, resPurpose] = await Promise.all([
          axios.get('https://realstate.niledevelopers.com/Locations/Countries', AuthorizedToken),
          axios.get('https://realstate.niledevelopers.com/General/RentTypes', AuthorizedToken),
          axios.get('https://realstate.niledevelopers.com/General/PurposeTypes', AuthorizedToken)
        ]);
        setCountries(resCountries.data);
        setRentTypes(resRent.data);
        setPurpose(resPurpose.data);
      } catch (err) { console.error('Error fetching initial data', err); }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://realstate.niledevelopers.com/Locations/Cities?id=${selectedCountry}`, AuthorizedToken)
        .then(res => setCities(res.data))
        .catch(() => setCities([]));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`https://realstate.niledevelopers.com/Locations/Districts?id=${selectedCity}`, AuthorizedToken)
        .then(res => setDistricts(res.data))
        .catch(() => setDistricts([]));
    }
  }, [selectedCity]);

  const onSubmit = (data) => {
    savePartialData(data);
    nextStep();
  };

  return (
    <div className=" mt-4 mb-5">
      <div className="card border-0">
        <div className="card-header bg-white py-3 border-bottom">
          <h4 className="mb-0 fw-bold text-primary">General Information</h4>
          <p className="text-muted small mb-0">Fill in the basic details about your property</p>
        </div>
        
        <div className="card-body p-4">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            
            {/* --- Section 1: Basic Info --- */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Title (English)</label>
                <input
                  className={`form-control ${errors.Title ? 'is-invalid' : ''}`}
                  placeholder="e.g. Luxury Apartment"
                  {...register("Title", { required: "Title is required" })}
                />
                {errors.Title && <div className="invalid-feedback">{errors.Title.message}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Title (Arabic)</label>
                <input
                  dir="rtl"
                  className={`form-control ${errors.TitleAr ? 'is-invalid' : ''}`}
                  placeholder="مثال: شقة فاخرة"
                  {...register("TitleAr", { required: "Arabic title is required" })}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Price</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    {...register("Price", { required: "Price is required" })}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Rent Type</label>
                <select className="form-select" {...register('realStateRentTypeId')}>
                  <option value="">Select type</option>
                  {rentTypes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Purpose</label>
                <select className="form-select" {...register('realStatePurposeId')}>
                  <option value="">Select purpose</option>
                  {purpose.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>

            <hr className="text-muted" />

            {/* --- Section 2: Location --- */}
            <h6 className="mb-3 text-secondary fw-bold">Location Details</h6>
            <div className="row g-1 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className="form-select"
                  {...register('countryId', { onChange: (e) => setSelectedCountry(e.target.value) })}
                >
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">City</label>
                <select
                  className="form-select"
                  disabled={!selectedCountry}
                  {...register('cityId', { onChange: (e) => setSelectedCity(e.target.value) })}
                >
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">District</label>
                <select className="form-select" disabled={!selectedCity} {...register('districtId')}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="col-md-12">
                <label className="form-label fw-semibold">Full Address</label>
                <input className="form-control" placeholder="Street name, Building No..." {...register("Address")} />
              </div>
            </div>

            <hr className="text-muted" />

            {/* --- Section 3: Contact & Description --- */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Contact Phone</label>
                <input type="tel" className="form-control" placeholder="+20..." {...register("ContactPhone")} />
              </div>
              
              <div className="col-md-6">
                <label className="form-label fw-semibold">Description</label>
                <textarea rows="1" className="form-control" placeholder="Brief about the property" {...register("Description")} />
              </div>
            </div>

            {/* --- Navigation Buttons --- */}
            <div className="d-flex justify-content-between mt-5 pt-3 border-top">
              <button type="button" className="btn btn-secondary px-4" onClick={prevStep}>
                <i className="bi bi-arrow-left me-2"></i> Previous
              </button>

              <button type="submit" className="btn btn-primary px-5 shadow-sm">
                Next Step <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;