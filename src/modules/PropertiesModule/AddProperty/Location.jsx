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
          'https://realstate.niledevelopers.com/Api/General/RealStateTypes',
          AuthorizedToken
        );
        setRealestateTypes(response.data);
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
        `https://realstate.niledevelopers.com/api/general/realstatetypeproperties/${selectedTypeId}`,
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
          name='text1'
          className="form-control"
          {...register(`property_${field.id}`)}
        />
      );

    case "Number":
      return (
        <input
          type="number"
          name='number1'
          className="form-control"
          {...register(`property_${field.id}`)}
        />
      );

    case "Check":
      return (
        <input
          type="checkbox"
          name='chekbox1'
          className="form-check-input"
          {...register(`property_${field.id}`)}
        />
      );

      case "Select":
  return (
    <select
    name='select1'
      className="form-control"
      {...register(`property_${field.id}`)}
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
  // Format dynamic fields into an array of { propertyId, value }
  const formattedData = dynamicFields.map((field) => ({
    propertyId: field.id,
    value: data[`property_${field.id}`] ?? ''
  }));

  // Save both the raw data and the formatted dynamic properties
  console.log('Location onSubmit - raw data:', data, 'formatted properties:', formattedData);
  savePartialData({
    ...data,
    properties: formattedData
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
