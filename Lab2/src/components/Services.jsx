import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const ServicesCollection = () => {
  const { isDarkMode } = useTheme();

  const services = [
    {
      image:
        "https://crlinterior.com/wp-content/uploads/2025/01/laboratory-quality.jpg",
      title: "Turnkey Lab Setup",
      description:
        "End-to-end lab establishment for schools, colleges, and research centers.",
    },
    {
      image:
        "https://www.laboratorydeal.com/cdn/shop/products/school-science-lab-equipment-suppliers-in-india-Sc-1084.jpg?v=1737145971&width=1000",
      title: "Equipment Supply",
      description:
        "Reliable, certified instruments for physics, chemistry, biology, and engineering labs.",
    },
    {
      image: "https://labtesting.com/wp-content/uploads/force-callibration.jpg",
      title: "Calibration & Maintenance",
      description:
        "Regular inspection, servicing, and performance checks for all instruments.",
    },
    {
      image: "https://tiimg.tistatic.com/fp/1/004/240/testing-lab-747.jpg",
      title: "Custom Solutions",
      description:
        "Tailored lab designs for unique educational and research requirements.",
    },
  ];

  return (
    <section
      className={`py-12 sm:py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      {/* Upper Section with Image and Text */}
      <section className="relative py-4 sm:py-4 overflow-hidden">
        <div className="max-w-[90%] sm:max-w-[82%] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Our <span className="text-[#703233]">Services</span>
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed mb-6 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              At <span className="font-semibold">Spanco Tek</span>, we deliver
              complete laboratory solutions — from concept to commissioning. Our
              expert team provides high-quality equipment, installation, and
              technical support tailored to your institution's needs.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-md shadow-md bg-gradient-to-r from-[#703233] to-[#973E42] transition-all"
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
            className="flex-1 w-full"
          >
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://kraftwerks.net/wp-content/uploads/2024/02/UB-Renew-Service-Fittings.jpeg"
                alt="Spanco Tek Services"
                className="w-full h-[200px] sm:h-[300px] md:h-[280px] object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lower Section with 4 Cards */}
      <div className="max-w-[90%] sm:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className={`text-2xl sm:text-2xl md:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-3 sm:mb-4`}
          >
            What We Offer
          </h2>
          <p
            className={`text-base sm:text-lg md:text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            Comprehensive laboratory solutions for educational institutions
            across India
          </p>
        </div>

        {/* Services Grid - 4 Cards with Circular Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className={`p-4 sm:p-4 rounded-xl shadow-lg transition-all duration-300 border flex flex-col items-center ${
                isDarkMode
                  ? "bg-gray-900 text-gray-300 hover:shadow-xl hover:bg-gray-800 border-gray-700"
                  : "bg-white text-gray-900 hover:shadow-xl border-gray-200"
              }`}
            >
              {/* Circular Image Container */}
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-full overflow-hidden border-4 border-[#703233]"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Service Content */}
              <h3
                className={`text-xl sm:text-2xl font-bold text-center ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                {service.title}
              </h3>
              <p
                className={`text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } text-sm sm:text-base leading-relaxed`}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCollection;
