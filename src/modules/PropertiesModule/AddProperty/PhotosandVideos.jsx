import React, { useState } from 'react';
import '/src/MultiStepForm.css';
import { useForm } from 'react-hook-form';

// ✅ أضفنا prevStep هنا في الـ Props عشان تقدر تستخدمها
const Step4 = ({ savePartialData, nextStep, prevStep }) => {
  const [preview, setPreview] = useState(null); // حالة لتخزين رابط معاينة الصورة

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // دالة للتعامل مع تغيير الملف وعرض المعاينة
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // بيعمل رابط مؤقت للصورة المرفوعة
    }
  };

  const onSubmit = (data) => {
    // data.imageUrl عبارة عن FileList، بناخد الملف الأول [0]
    console.log(data.imageUrl[0]);

    savePartialData({
      images: {
        imageUrl: data.imageUrl[0] 
      }
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="step-form">
      
      <div className="mb-3">
        <label className="form-label fw-bold">Upload Property Image</label>
        <input
          type="file"
          accept="image/*"
          className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
          {...register("imageUrl", {
            required: "Image is required",
            onChange: handleFileChange // بنشغل الدالة دي أول ما اليوزر يختار ملف
          })}
        />

        {errors.imageUrl && (
          <small className="text-danger d-block mt-1">
            {errors.imageUrl.message}
          </small>
        )}
      </div>

      {/* ✅ جزء المعاينة: بيظهر فقط لو اليوزر اختار صورة */}
      {preview && (
        <div className="mb-3">
          <p className="small text-muted mb-1">Image Preview:</p>
          <img 
            src={preview} 
            alt="Selected" 
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} 
          />
        </div>
      )}

      <div className="navigation d-flex justify-content-between mt-4">
        {/* ✅ لازم تضيف type="button" عشان الزرار ميعملش Submit للفورم */}
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={prevStep}
        >
          Previous
        </button>
        
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>

    </form>
  );
};

export default Step4;