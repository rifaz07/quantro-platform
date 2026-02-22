import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            Q
          </div>
          <span className="text-lg font-bold text-gray-900">
            Quan<span className="text-blue-600">tro</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">

          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>

          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>

          <Link to="/pricing" className="hover:text-blue-600 transition">
            Pricing
          </Link>

          <Link to="/support" className="hover:text-blue-600 transition">
            Support
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </Link>

        </div>

      </div>
    </div>
  );
}