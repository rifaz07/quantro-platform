import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Fintech Loop
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}