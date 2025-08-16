import { useState } from "react";
import AddCar from "./AddCar";
import CarList from "./CarList";
import EditCar from "./EditCar";
import Settings from "./Settings";

export default function Dashboard() {
  const [page, setPage] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setPage("edit");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-56 bg-slate-800 text-white p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-8">📊 القائمة</h2>
        <button
          onClick={() => setPage("home")}
          className="btn btn-ghost justify-start mb-3"
        >
          🏠 عرض العربيات
        </button>
        <button
          onClick={() => setPage("add")}
          className="btn btn-ghost justify-start mb-3"
        >
          ➕ إضافة عربية
        </button>
        <p
  style={{ cursor: "pointer", marginBottom: 20 }}
  onClick={() => setPage("settings")}
>
  ⚙️ إعدادات النظام
</p>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* App Bar */}
        <div className="bg-blue-600 text-white p-4 text-lg font-bold text-center">
          مرحبا في لوحة تحكم أوتو الخراط 
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {page === "home" && <CarList onEdit={handleEdit} />}
          {page === "add" && <AddCar goHome={() => setPage("home")} />}
          {page === "edit" && selectedCar && (
            <EditCar car={selectedCar} goHome={() => setPage("home")} />
          )}
          {page === "settings" && <Settings />}

        </div>
      </div>
    </div>
  );
}
