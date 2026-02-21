import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function Products() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      <main className="flex-1">

        {/* PREMIUM HERO */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Trading Tools
            </h1>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to analyze, trade, and grow your portfolio
              in one seamless platform.
            </p>
          </div>
        </section>

        {/* PRODUCT CARDS */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Equity Trading
              </h3>
              <p className="text-gray-600">
                Trade stocks with real-time data and lightning-fast execution.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Crypto Markets
              </h3>
              <p className="text-gray-600">
                Access digital assets securely with smart portfolio tracking.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Portfolio Insights
              </h3>
              <p className="text-gray-600">
                Advanced analytics to optimize your investment strategy.
              </p>
            </div>

          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}