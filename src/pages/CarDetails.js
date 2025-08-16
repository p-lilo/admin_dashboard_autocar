export default function CarDetails({ car, goBack, onEdit }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <button onClick={goBack} className="btn btn-outline">⬅️ رجوع</button>
        <button onClick={() => onEdit(car)} className="btn btn-info">✏️ تعديل</button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">🚘 تفاصيل العربية</h2>

      <div className="card bg-base-100 shadow-xl p-6 space-y-6">
        {/* الصورة الرئيسية */}
        <div className="w-full">
          <img
            src={car.mainImage}
            alt={car.name}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* المعلومات الأساسية */}
        <div className="grid md:grid-cols-2 gap-6 text-right">
          <p><span className="font-bold"> الاسم: </span>{car.name}</p>
          <p><span className="font-bold"> الموديل: </span>{car.model}</p>
          <p><span className="font-bold"> الفئة: </span>{car.category}</p>
          <p><span className="font-bold"> السعر: </span>{car.price} ج.م</p>
          <p><span className="font-bold"> الحالة: </span>{car.status}</p>
          <p><span className="font-bold"> ناقل الحركة: </span>{car.transmission}</p>
          <p><span className="font-bold"> اللون الخارجي: </span>{car.exteriorColor}</p>
          <p><span className="font-bold"> اللون الداخلي: </span>{car.interiorColor}</p>
          <p><span className="font-bold"> الكيلومترات: </span>{car.mileage} كم</p>
        </div>

        {/* الوصف */}
        {car.description && (
          <div className="border-t pt-4">
            <h3 className="font-bold mb-2">📝 الوصف</h3>
            <p className="text-gray-700">{car.description}</p>
          </div>
        )}

        {/* معرض الصور */}
        {car.images && car.images.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-bold mb-3">📸 معرض الصور</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`car-${index}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md border"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* زرار التعديل تحت */}
      <div className="mt-6 flex justify-center">
        <button onClick={() => onEdit(car)} className="btn btn-warning btn-lg">
          ✏️ تعديل العربية
        </button>
      </div>
    </div>
  );
}
