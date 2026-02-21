import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <PublicNavbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Invest Smart. Invest Simple.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Modern brokerage platform built for transparency and speed.
        </p>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Open Account
        </Link>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-6">
          <div>
            <h2 className="text-4xl font-bold text-blue-600">1M+</h2>
            <p className="text-gray-600 mt-2">Active Investors</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-600">₹10B+</h2>
            <p className="text-gray-600 mt-2">Daily Volume</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-600">99.9%</h2>
            <p className="text-gray-600 mt-2">Platform Uptime</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Powerful tools for smart investors
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Real-time Trading</h3>
            <p className="text-gray-600 text-sm">
              Fast and secure order execution with live updates.
            </p>
          </div>

          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Portfolio Insights</h3>
            <p className="text-gray-600 text-sm">
              Track holdings, profit/loss and performance analytics.
            </p>
          </div>

          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Low Brokerage</h3>
            <p className="text-gray-600 text-sm">
              Transparent pricing with zero hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to start investing?
        </h2>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>
      </section>

      <PublicFooter />
    </>
  );
}