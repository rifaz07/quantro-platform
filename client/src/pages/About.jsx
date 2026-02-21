import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      <main className="flex-1">

        {/* PREMIUM HERO */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Building the Future of Investing
            </h1>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fintech Loop is reimagining trading platforms with cutting-edge
              technology, seamless execution, and powerful analytics.
            </p>
          </div>
        </section>

        {/* MISSION / VISION / VALUES */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                Democratize investing through accessible and powerful
                technology.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                Build India's most trusted and modern fintech ecosystem.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Our Values
              </h3>
              <p className="text-gray-600">
                Transparency, innovation, and long-term growth.
              </p>
            </div>

          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}