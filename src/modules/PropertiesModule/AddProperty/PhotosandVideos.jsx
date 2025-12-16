import React from 'react';
import '/src/MultiStepForm.css';
import { useForm } from 'react-hook-form';

const Step4 = ({ savePartialData, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.imageUrl[0]);

    savePartialData({
      images: {
        imageUrl: data.imageUrl[0] // ✅ File حقيقي
      }
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      
      <input
        type="file"
        accept="image/*"
        className="form-control"
        {...register("imageUrl", {
          required: "Image is required"
        })}
      />

      {errors.imageUrl && (
        <small className="text-danger">
          {errors.imageUrl.message}
        </small>
      )}

      <button type="submit" className="btn btn-primary mt-3">
        Next
      </button>

    </form>
  );
};

export default Step4;
