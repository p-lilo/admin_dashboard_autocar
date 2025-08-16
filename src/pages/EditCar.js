import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firestore/Config";

const CLOUD_NAME = "dzel7gaaf";
const UPLOAD_PRESET = "auto-car";

export default function EditCar({ car, goHome }) {
  const [form, setForm] = useState(car);
  const [images, setImages] = useState(car.images || []);
  const [mainImage, setMainImage] = useState(car.mainImage || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(car);
    setImages(car.images || []);
    setMainImage(car.mainImage || null);
  }, [car]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    setLoading(true);
    const uploaded = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      uploaded.push(res.data.secure_url);
    }
    setImages([...images, ...uploaded]);
    setLoading(false);
  };

  const handleRemoveImage = (img) => {
    setImages(images.filter((i) => i !== img));
    if (mainImage === img) setMainImage(null); // لو مسح الصورة الرئيسية
  };

  const handleUpdateCar = async () => {
    if (!form.name || !form.model || !form.price || !mainImage) {
      alert("⚠️ برجاء إدخال البيانات الأساسية وتحديد صورة رئيسية");
      return;
    }

    const carRef = doc(db, "cars", car.id);
    await updateDoc(carRef, {
      ...form,
      images,
      mainImage,
    });

    goHome();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">✏️ تعديل بيانات العربية</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input input-bordered w-full"
          placeholder="اسم العربية"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="الموديل"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="الفئة"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="نوع الفتيس"
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="العداد (كم)"
          value={form.mileage}
          onChange={(e) => setForm({ ...form, mileage: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="الحالة"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="السعر (ج.م)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="اللون الخارجي"
          value={form.exteriorColor}
          onChange={(e) => setForm({ ...form, exteriorColor: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="اللون الداخلي"
          value={form.interiorColor}
          onChange={(e) => setForm({ ...form, interiorColor: e.target.value })}
        />
      </div>

      <textarea
        className="textarea textarea-bordered w-full mt-4"
        placeholder="الوصف"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Upload */}
      <div className="mt-6">
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="file-input file-input-bordered w-full"
        />
        {loading && <p className="text-primary mt-2">⏳ جاري رفع الصور...</p>}

        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative border rounded-lg overflow-hidden"
            >
              <img
                src={img}
                alt=""
                className={`w-32 h-24 object-cover cursor-pointer ${
                  mainImage === img ? "border-4 border-green-500" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
              {mainImage === img && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  ✅ رئيسية
                </span>
              )}
              <button
                onClick={() => handleRemoveImage(img)}
                className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                🗑️ حذف
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={goHome} className="btn btn-outline">
          🔙 رجوع
        </button>
        <button onClick={handleUpdateCar} className="btn btn-primary">
          💾 حفظ التعديلات
        </button>
      </div>
    </div>
  );
}
