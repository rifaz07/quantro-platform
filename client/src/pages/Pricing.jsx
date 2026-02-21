import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      <main className="flex-1">

        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 text-lg">
            No hidden fees. No surprises.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

          <div className="border p-8 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-4">Free</h3>
            <p className="text-3xl font-bold mb-4">₹0</p>
            <p className="text-gray-600">Basic trading access</p>
          </div>

          <div className="border p-8 rounded-xl text-center shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Pro</h3>
            <p className="text-3xl font-bold mb-4">₹299/month</p>
            <p className="text-gray-600">
              Advanced analytics & priority support
            </p>
          </div>

          <div className="border p-8 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <p className="text-gray-600">
              Institutional-grade solutions
            </p>
          </div>

        </section>

      </main>

      <PublicFooter />
    </div>
  );
}