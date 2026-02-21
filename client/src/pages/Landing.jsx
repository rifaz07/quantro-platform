import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Invest Smart. <br /> Trade Confidently.
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Fintech Loop is a modern brokerage platform built for speed,
              transparency, and powerful analytics.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/products"
                className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c"
              alt="Trading Dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-xl font-semibold mb-3">Zero Hidden Fees</h3>
            <p className="text-gray-600">
              Transparent pricing with no surprises.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-gray-600">
              Real-time data and intelligent portfolio insights.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Secure Infrastructure</h3>
            <p className="text-gray-600">
              Enterprise-grade security for your investments.
            </p>
          </div>

        </div>
      </section>

      <PublicFooter />
    </div>
  );
}