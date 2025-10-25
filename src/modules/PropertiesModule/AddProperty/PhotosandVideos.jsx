import React, { useState } from 'react';
import '/src/MultiStepForm.css';
import { useForm } from 'react-hook-form';

const Step4 = ({ formData, savePartialData, nextStep }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            imageUrl: formData?.images.imageUrl || '',
            imageTitle: formData?.images.imageTitle || '',
            imageDescription: formData?.images.imageDescription || '',
            isMainImage: formData?.images.isMainImage || false,
            displayOrder: formData?.images.displayOrder || '',
            imageType: formData?.images.imageType || '',
            videoUrl: formData?.videoUrl || '',
            threeDTour: formData?.threeDTour || '',
            isFeatured: formData?.isFeatured || '',
            amenities: formData?.amenities || [],
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const onSubmit = (data) => {
        const formDataToSave = {
            ...data,
            imageFile: selectedFile
        };
        savePartialData(formDataToSave);
        nextStep();
    };

    return (
        <div className=''>
            <h3>Photos And Videos</h3>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between">
                    <input
                        type="file"
                        className="mt-1 me-1 form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        {...register("imageUrl", { required: 'Image is required!' })}
                    />
                    {errors.imageUrl && (
                        <span className='text-danger'  onChange={(e) =>
      savePartialData({ imageUrl:
        e.target.files[0]
      })
     }
     >{errors.imageUrl.message}</span>
                    )}
                </div>

                <input
                    type="text"
                    className="mt-1 form-control"
                    placeholder='Image Title'
                    {...register("imageTitle", { required: 'Image title is required!' })}
                />
                {errors.imageTitle && (
                    <span className='text-danger'>{errors.imageTitle.message}</span>
                )}

                <input
                    type="text"
                    className="mt-1 form-control"
                    placeholder='Image Description'
                    {...register("imageDescription", { required: 'Image description is required!' })}
                />
                {errors.imageDescription && (
                    <span className='text-danger'>{errors.imageDescription.message}</span>
                )}

                <div className="mt-1">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register("isMainImage")}
                        />
                        Set as Main Image
                    </label>
                </div>

                <input
                    type="number"
                    className="mt-1 form-control"
                    placeholder='Display Order'
                    {...register("displayOrder", {
                        required: 'Display order is required!',
                        min: { value: 1, message: 'Display order must be positive' }
                    })}
                />
                {errors.displayOrder && (
                    <span className='text-danger'>{errors.displayOrder.message}</span>
                )}

                <select
                    className="mt-1 form-control"
                    {...register("imageType", { required: 'Image type is required!' })}
                >
                    <option value="">Select Image Type</option>
                    <option value="main">Main</option>
                    <option value="gallery">Gallery</option>
                </select>
                {errors.imageType && (
                    <span className='text-danger'>{errors.imageType.message}</span>
                )}

<input
    type="url"
    className="mt-1 form-control"
    placeholder='Video URL (YouTube/Vimeo)'
    {...register("videoUrl", {
        pattern: {
            value: /^(https?:\/\/)?(www\.)?(youtube\.com|vimeo\.com)\/.+$/,
            message: 'Please enter a valid YouTube or Vimeo URL'
        }
    })}
/>
{errors.videoUrl && (
    <span className='text-danger'>{errors.videoUrl.message}</span>
)}


<input
    type="url"
    className="mt-1 form-control"
    placeholder='3D Tour URL'
    {...register("threeDTour", {
        pattern: {
         
            message: 'Please enter a valid URL'
        }
    })}
/>
{errors.threeDTour && (
    <span className='text-danger'>{errors.threeDTour.message}</span>
)}


<div className="mt-1">
    <label className="form-check-label">
        <input
            type="checkbox"
            className="form-check-input"
            {...register("isFeatured")}
        />
        Featured Property
    </label>
</div>

<div className="mt-1">
    <label className="form-label">Amenities</label>
    <select
        multiple
        className="form-control"
        {...register("amenities", { required: 'Please select at least one amenity' })}
    >
        <option value="parking">Parking</option>
        <option value="pool">Swimming Pool</option>
        <option value="gym">Gym</option>
        <option value="security">24/7 Security</option>
        <option value="garden">Garden</option>
        <option value="wifi">WiFi</option>
        <option value="ac">Air Conditioning</option>
        <option value="heating">Central Heating</option>
    </select>
    {errors.amenities && (
        <span className='text-danger'>{errors.amenities.message}</span>
    )}
</div>


                <div className="navigation mt-3">
                    <button type='submit' className="btn btn-primary">Next</button>
                </div>
            </form>
        </div>
    );
};

export default Step4;