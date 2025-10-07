import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#703233] to-[#973E42]" />

      <div className="max-w-[90%] md:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            About <span className="text-[#973E42]">Spanco Tek</span>
          </h2>

          <p
            className={`text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4 ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Spanco Tek is a trusted leader in the design and supply of advanced
            laboratory equipment. We provide innovative and reliable lab
            solutions that empower educational institutions, research centers,
            and industries to achieve precise and efficient results.
          </p>

          <p
            className={`text-base sm:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Our commitment to excellence, precision, and quality assurance has
            made us one of the most preferred partners in laboratory
            development. From school labs to professional research facilities,
            Spanco Tek delivers products that meet the highest international
            standards.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 text-white font-semibold rounded-md shadow-lg bg-gradient-to-r from-[#703233] to-[#973E42] transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="w-full rounded-xl overflow-hidden shadow-xl">
            <motion.img
              src="https://supertekglassware.com/wp-content/uploads/2024/12/front-view-science-elements-with-chemicals-composition-scaled.jpg"
              alt="Spanco Tek Laboratory Equipment"
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
