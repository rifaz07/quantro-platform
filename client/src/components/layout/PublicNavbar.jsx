import { Link } from "react-router-dom";
import { useState } from "react";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide"
        >
          FINTECH LOOP
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium bg-white">
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/support" onClick={() => setIsOpen(false)}>Support</Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}