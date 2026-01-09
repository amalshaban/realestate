import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthorizedToken } from '../../../constants/Validations';

const Location = ({ formData, savePartialData, nextStep, prevStep }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      realStateTypeId: formData.realStateTypeId || ''
    }
  });

  const [realestateTypes, setRealestateTypes] = useState([]);

  useEffect(() => {
    const getRealestateTypes = async () => {
      try {
        const response = await axios.get(
          'https://realstate.niledevelopers.com/General/RealStateTypes',
          AuthorizedToken
        );
        setRealestateTypes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getRealestateTypes();
  }, []);

const [selectedTypeId, setSelectedTypeId] = useState(null);

const [dynamicFields, setDynamicFields] = useState([]);

useEffect(() => {
  if (!selectedTypeId) return;

  const getProperties = async () => {
    try {
      const response = await axios.get(
        `https://realstate.niledevelopers.com/general/realstatetypeproperties/${selectedTypeId}`,
        AuthorizedToken
      );

      setDynamicFields(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  getProperties();
}, [selectedTypeId]);

 const renderInput = (field, register) => {
  switch (field.isText) {
    case "Text":
      return (
        <input
          type="text"
          name={`input${field.id}`}
          className="form-control"
          {...register(`input${field.id}`)}
        />
      );

    case "Number":
      return (
        <input
          type="number"
          name={`input${field.id}`}
          className="form-control"
          {...register(`input${field.id}`)}
        />
      );

    case "Check":
      return (
        <input
          type="checkbox"
          name={`input${field.id}`}
          className="form-check-input"
          {...register(`input${field.id}`)}
        />
      );

      case "Select":
  return (
    <select
      name={`input${field.id}`}
      className="form-control"
      {...register(`input${field.id}`)}
    >
      <option value="">Select</option>
      {field.values.map(v => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}
    </select>
  );


    default:
      return null;
  }
};


const onSubmit = (data) => {
  // Normalize dynamic fields into an array of { propertyId, value } with scalar values
  const formattedData = dynamicFields.map((field) => {
    const rawValue = data[`input${field.id}`];
    let value = '';

    if (Array.isArray(rawValue)) {
      // If multiple values are present, take the first one (change to join if you prefer)
      value = rawValue[0] ?? '';
    } else if (typeof rawValue === 'boolean') {
      // Keep checkboxes as booleans
      value = rawValue;
    } else {
      value = rawValue ?? '';
    }

    return {
      propertyId: field.id,
      value,
    };
  });

  // Remove dynamic input keys from saved partial data so they don't remain as arrays
  const cleanedData = { ...data };
  dynamicFields.forEach((field) => {
    delete cleanedData[`input${field.id}`];
  });

  console.log('Location onSubmit - raw data:', data, 'cleaned data:', cleanedData, 'formatted properties:', formattedData);
  savePartialData({
    ...cleanedData,
    properties: formattedData,
  });

  console.log('Ready for API:', formattedData);
  nextStep();
};




  return (
    <div>
      <h3>Property Type</h3>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group mt-3">
        <select
  className="form-control"
  {...register("realStateTypeId", {
    required: "Property type is required",
    onChange: (e) => {
      const value = e.target.value;
      setSelectedTypeId(value);
      console.log("Selected ID:", value);
    },
  })}
>
  <option value="">Select Property Type</option>

  {realestateTypes.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
</select>

          {errors.realStateTypeId && (
            <span className="text-danger">
              {errors.realStateTypeId.message}
            </span>
          )}
        </div>


{dynamicFields.map((field) => (
    <div className="mb-3" key={field.id}>
      <label className="form-label">{field.property}</label>

      {renderInput(field, register)}
    </div>
  ))}


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

export default Location;
