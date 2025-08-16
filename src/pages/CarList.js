import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firestore/Config";
import CarDetails from "./CarDetails";
import EditCar from "./EditCar";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [viewCar, setViewCar] = useState(null);
  const carsPerPage = 5;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cars"), (snapshot) => {
      setCars(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDeleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
  };

  // فلترة حسب البحث
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  // حساب الصفحات
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = filteredCars.slice(startIndex, startIndex + carsPerPage);

  // لو ضغط على تعديل → يفتح EditCar
  if (selectedCar) {
    return <EditCar car={selectedCar} goHome={() => setSelectedCar(null)} />;
  }

   // لو ضغط على تفاصيل → يفتح صفحة CarDetails
if (viewCar) {
  return (
    <CarDetails
      car={viewCar}
      goBack={() => setViewCar(null)}
      onEdit={(car) => {
        setSelectedCar(car);
        setViewCar(null); // عشان يخرج من صفحة التفاصيل
      }}
    />
  );
}

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🚗 قائمة العربيات
        </h2>
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <input
            type="text"
            placeholder="🔍 ابحث باسم العربية..."
            className="input input-bordered w-full text-right"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="badge badge-lg badge-primary">
            {filteredCars.length} عربية
          </span>
        </div>
      </div>

      {/* Table */}
      {currentCars.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>🚘 لا توجد عربيات مطابقة لبحثك</span>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-right">
              <thead className="bg-base-200 text-right">
                <tr>
                  <th className="px-6 py-3">الاسم</th>
                  <th className="px-6 py-3">الموديل</th>
                  <th className="px-6 py-3">الفئة</th>
                  <th className="px-6 py-3">السعر</th>
                  <th className="px-6 py-3">الصورة الرئيسية</th>
                  <th className="px-6 py-3 text-center">تحكم</th>
                </tr>
              </thead>
              <tbody>
                {currentCars.map((car) => (
                  <tr
                    key={car.id}
                    className="hover border-b border-base-200 last:border-none"
                  >
                    <td className="px-6 py-4 font-semibold">{car.name}</td>
                    <td className="px-6 py-4">{car.model}</td>
                    <td className="px-6 py-4">
                      <div className="badge badge-accent badge-outline">
                        {car.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-primary font-bold">
                      {car.price} ج.م
                    </td>
                    <td className="px-6 py-4">
                      {car.mainImage && (
                        <img
                          src={car.mainImage}
                          alt=""
                          className="w-20 h-14 object-cover rounded-lg shadow-md border"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setSelectedCar(car)} // 👈 هنا هيفتح صفحة التعديل
                          className="btn btn-info btn-sm"
                        >
                          ✏️ تعديل
                        </button>
                         <button
   onClick={() => setViewCar(car)}
   className="btn btn-secondary btn-sm"
 >
   📖 تفاصيل
 </button>
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="btn btn-error btn-sm"
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 p-4">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅️ السابق
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              التالي ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
