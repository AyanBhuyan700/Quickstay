import React, { useEffect } from "react";
import Title from "../components/Title";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us - QuickStay";
  }, []);
  return (
    <>
      <div className="flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
        <div>
          <Title title="Contact Us" subTitle="Have a question, want a quote, or just want to say hi? Use the form or reach us via email/phone below." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            {/* Left: Contact info / map */}
            <aside className="space-y-6">
              <div className="rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Reach out directly</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Our Office</div>
                      <div className="text-sm text-gray-500">123 Main Street, Chandigarh, India</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:hello@example.com" className="text-sm text-gray-500 hover:underline">quickstay@gmail.com</a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+1234567890" className="text-sm text-gray-500 hover:underline">+1 (234) 567-890</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <iframe
                  title="office-map"
                  className="w-full h-64"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193534475044!2d-122.4194152846817!3d37.77492927975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8f0b9b13%3A0x2e6c0a6d0c9b0b0b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sin!4v1694610000000"
                ></iframe>
              </div>

              <div className="text-sm text-gray-600">
                <strong>Hours:</strong> Mon–Fri 9:00–18:00 (local time)
              </div>
            </aside>

            {/* Right: Form */}
            <form className="bg-gray-50 rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Name</span>
                  <input
                    name="name"
                    className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input
                    name="email"
                    className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                    placeholder="you@company.com"
                  />
                </label>

                <label className="md:col-span-2 block">
                  <span className="text-sm font-medium text-gray-700">Subject</span>
                  <input
                    name="subject"
                    className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                    placeholder="What's this about?"
                  />
                </label>

                <label className="md:col-span-2 block">
                  <span className="text-sm font-medium text-gray-700">Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                    placeholder="Tell us more — what can we help you with?"
                  />
                </label>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Send Message
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                By submitting you agree to our terms. We typically reply within 1–2 business days.
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
};

export default Contact;
