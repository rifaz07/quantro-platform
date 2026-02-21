import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function Support() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      <main className="flex-1">

        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Support Center
          </h1>
          <p className="text-gray-600 text-lg">
            We are here to help you 24/7.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">

          <div className="border p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              How do I open an account?
            </h3>
            <p className="text-gray-600">
              Click on signup and complete KYC verification.
            </p>
          </div>

          <div className="border p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              How do I deposit funds?
            </h3>
            <p className="text-gray-600">
              Use the wallet section inside your dashboard.
            </p>
          </div>

        </section>

      </main>

      <PublicFooter />
    </div>
  );
}