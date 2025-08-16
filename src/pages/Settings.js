import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firestore/Config";

const CLOUD_NAME = "dzel7gaaf"; 
const UPLOAD_PRESET = "auto-car"; 

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: "",
    logo: "",
    facebook: "",
    tiktok: "",
    phone: "",
    whatsapp: "", 
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSettings(snap.data());
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setSettings({ ...settings, logo: res.data.secure_url });
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("حصلت مشكلة أثناء رفع اللوجو");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    const docRef = doc(db, "settings", "main");
    await setDoc(docRef, settings);
    alert("✅ تم حفظ الإعدادات بنجاح!");
  };

  if (loading) return <p className="p-6">⏳ جاري تحميل الإعدادات...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">⚙️ إعدادات النظام</h2>

      {/* بيانات أساسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="اسم المعرض"
          value={settings.companyName}
          onChange={(e) =>
            setSettings({ ...settings, companyName: e.target.value })
          }
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="📞 رقم الهاتف"
          value={settings.phone}
          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="💬 رقم الواتساب"
          value={settings.whatsapp}
          onChange={(e) =>
            setSettings({ ...settings, whatsapp: e.target.value })
          }
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="🌐 رابط الفيسبوك"
          value={settings.facebook}
          onChange={(e) =>
            setSettings({ ...settings, facebook: e.target.value })
          }
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder=" رابط تيك توك"
          value={settings.tiktok}
          onChange={(e) =>
            setSettings({ ...settings, tiktok: e.target.value })
          }
        />

        
       
      </div>

      {/* رفع اللوجو */}
      <div className="mt-6">
        <label className="block mb-2">🖼️ لوجو المعرض</label>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleLogoUpload}
        />
        {uploading && (
          <p className="text-blue-500 mt-2">⏳ جاري رفع اللوجو...</p>
        )}
        {settings.logo && (
          <img
            src={settings.logo}
            alt="Logo"
            className="w-32 h-32 object-contain mt-3 border rounded-lg shadow"
          />
        )}
      </div>

      {/* حفظ */}
      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className="btn btn-primary">
          💾 حفظ التغييرات
        </button>
      </div>
    </div>
  );
}
