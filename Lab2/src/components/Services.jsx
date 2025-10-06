import React from "react";
import { Info, X, Heart, Eye } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Import the ThemeContext
import { motion } from "framer-motion";

const ServicesCollection = () => {
  const { isDarkMode } = useTheme(); // Access theme context
  const [selectedService, setSelectedService] = React.useState(null);

  // Example services array (unchanged)
  const services = [
    {
      icon: <Info />,
      title: "Consultation",
      description: "Expert advice for your laboratory needs.",
    },
    {
      icon: <X />,
      title: "Testing",
      description: "Comprehensive testing services for all requirements.",
    },
    {
      icon: <Heart />,
      title: "Support",
      description: "Ongoing support and maintenance for your lab.",
    },
    {
      icon: <Eye />,
      title: "Training",
      description: "Hands-on training for staff and students.",
    },
  ];

  return (
    <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Our Services
          </h2>
          <p
            className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            Comprehensive laboratory solutions for educational institutions
            across India
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transition-shadow ${
                isDarkMode
                  ? "bg-gray-900 text-gray-300 hover:shadow-lg hover:bg-gray-800"
                  : "bg-white text-gray-900 hover:shadow-lg"
              }`}
            >
              <div
                className={`${
                  isDarkMode ? "text-[#973E42]" : "text-[#703233]"
                } mb-4`}
              >
                {service.icon}
              </div>
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } mb-3`}
              >
                {service.title}
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <section className="relative py-10 overflow-hidden">
        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#703233] to-[#973E42]" />

        <div className="max-w-[82%] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our <span className="text-[#703233]">Services</span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At <span className="font-semibold">Spanco Tek</span>, we deliver
              complete laboratory solutions — from concept to commissioning. Our
              expert team provides high-quality equipment, installation, and
              technical support tailored to your institution’s needs.
            </p>

            <ul className="list-disc list-inside text-gray-700 text-lg mb-6 space-y-2">
              <li>
                <strong>Turnkey Lab Setup:</strong> End-to-end lab establishment
                for schools, colleges, and research centers.
              </li>
              <li>
                <strong>Equipment Supply:</strong> Reliable, certified
                instruments for physics, chemistry, biology, and engineering
                labs.
              </li>
              <li>
                <strong>Calibration & Maintenance:</strong> Regular inspection,
                servicing, and performance checks for all instruments.
              </li>
              <li>
                <strong>Custom Solutions:</strong> Tailored lab designs for
                unique educational and research requirements.
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 text-white font-semibold rounded-md shadow-md bg-gradient-to-r from-[#703233] to-[#973E42] transition-all"
            >
              View All Services
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://kraftwerks.net/wp-content/uploads/2024/02/UB-Renew-Service-Fittings.jpeg" // Replace with your actual image path
                alt="Spanco Tek Services"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default ServicesCollection;
