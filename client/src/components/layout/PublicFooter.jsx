import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-100 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-gray-600">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-4">
            FINTECH LOOP
          </h2>
          <p>
            Modern brokerage platform built for transparency, simplicity, and speed.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-600">Pricing</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/support" className="hover:text-blue-600">Help Center</Link></li>
            <li><Link to="/support" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/support" className="hover:text-blue-600">FAQs</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Fintech Loop. All rights reserved.
      </div>
    </footer>
  );
}