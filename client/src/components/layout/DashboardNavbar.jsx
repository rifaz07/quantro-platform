import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            Q
          </div>
          <span className="text-lg font-bold text-gray-900">
            Quan<span className="text-blue-600">tro</span>
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:border-red-300 hover:text-red-500 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}