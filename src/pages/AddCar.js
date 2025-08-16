import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firestore/Config";

const CLOUD_NAME = "dzel7gaaf";
const UPLOAD_PRESET = "auto-car";

export default function AddCar({ goHome }) {
  const [form, setForm] = useState({
    name: "",
    model: "",
    category: "",
    transmission: "",
    mileage: "",
    status: "",
    price: "",
    exteriorColor: "",
    interiorColor: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleAddCar = async () => {
    if (!form.name || !form.model || !form.price || !mainImage) {
      alert("⚠️ برجاء إدخال البيانات الأساسية وتحديد صورة رئيسية");
      return;
    }

    await addDoc(collection(db, "cars"), {
      ...form,
      images,
      mainImage,
    });

    // Reset
    setForm({
      name: "",
      model: "",
      category: "",
      transmission: "",
      mileage: "",
      status: "",
      price: "",
      exteriorColor: "",
      interiorColor: "",
      description: "",
    });
    setImages([]);
    setMainImage(null);
    goHome();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">➕ إضافة عربية جديدة</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="form-control">
          <span className="label-text text-blue-800">اسم العربية</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">الموديل</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">الفئة</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">الفتيس</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.transmission}
            onChange={(e) =>
              setForm({ ...form, transmission: e.target.value })
            }
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">العداد</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.mileage}
            onChange={(e) => setForm({ ...form, mileage: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">حاله العربيه</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800 ">السعر</span>
          <input
            type="number"
            className="input input-bordered w-full border-2"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">اللون الخارجي</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.exteriorColor}
            onChange={(e) =>
              setForm({ ...form, exteriorColor: e.target.value })
            }
          />
        </label>

        <label className="form-control">
          <span className="label-text text-blue-800">اللون الداخلي</span>
          <input
            className="input input-bordered w-full border-2"
            value={form.interiorColor}
            onChange={(e) =>
              setForm({ ...form, interiorColor: e.target.value })
            }
          />
        </label>
      </div>

      <label className="form-control mt-4">
        <span className="label-text text-blue-800">الوصف</span>
        <textarea
          className="textarea textarea-bordered w-full border-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </label>

      {/* Upload */}
      <div className="mt-6">
        <label className="form-control">
          <span className="label-text text-blue-800">صور العربية</span>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="file-input file-input-bordered w-full "
          />
        </label>

        {loading && <p className="text-primary mt-2">⏳ جاري رفع الصور...</p>}

        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative cursor-pointer border rounded-lg overflow-hidden"
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt=""
                className={`w-32 h-24 object-cover ${
                  mainImage === img ? "border-4 border-green-500" : ""
                }`}
              />
              {mainImage === img && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  ✅ رئيسية
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={goHome} className="btn btn-outline">
          🔙 رجوع
        </button>
        <button onClick={handleAddCar} className="btn btn-primary">
          ✅ حفظ
        </button>
      </div>
    </div>
  );
}
