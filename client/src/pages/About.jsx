import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <PublicNavbar />

      <main className="flex-1">

        {/* HERO SECTION */}
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

        {/* FOUNDER SECTION */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Founder
            </h2>

            <div className="flex flex-col items-center">

              {/* PROFILE IMAGE */}
              <img
                src="/founder.jpg"
                alt="Founder"
                className="w-48 h-48 rounded-full object-cover shadow-lg mb-6"
              />

              {/* NAME */}
              <h3 className="text-2xl font-semibold">
                Rifaz Shaikh Razak
              </h3>

              <p className="text-gray-500 mb-6">
                Founder & CEO
              </p>

              {/* BIO */}
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Rifaz Shaikh Razak founded Fintech Loop with a vision to simplify
                investing and bring institutional-grade tools to everyday
                traders. With a background in trading systems and financial
                technology, the goal is to build a transparent, scalable,
                and secure brokerage ecosystem.
              </p>

            </div>

          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}