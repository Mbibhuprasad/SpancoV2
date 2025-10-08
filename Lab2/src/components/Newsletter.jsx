import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const CertificationPage = () => {
  const { isDarkMode } = useTheme();

  const certifications = [
    {
      id: 1,
      img: "/cert1.png",
      title: "CE Marking Compliance ",
    },
    {
      id: 2,
      img: "/Screenshot 2025-10-06 164723.png",
      title: "ISO 9001:2015 Certified",
    },
    {
      id: 3,
      img: "/Screenshot 2025-10-06 164750.png",
      title: "Intellctual property India",
    },
    {
      id: 4,
      img: "/WhatsApp Image 2025-10-06 at 16.26.51_04c3188e.jpg",
      title: "Government Purchace Enlistment Certificate",
    },
    {
      id: 5,
      img: "/Screenshot 2025-10-06 164723.png",
      title: "Lab Development Certification",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Our Certificates
          </h2>
          <p
            className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Quality assured and certified products
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              onClick={() => setSelectedImage(cert.img)}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              className={`p-4 rounded-lg text-center border-2 ${
                isDarkMode
                  ? "bg-gradient-to-br from-[#973E42] to-[#b7a8a9] border-gray-700"
                  : "bg-gradient-to-br from-[#cb9295] to-[#b7a8a9] border-blue-200"
              } cursor-pointer transition-transform`}
            >
              <motion.img
                src={cert.img}
                alt={cert.title}
                className="w-full h-40 object-cover rounded-md mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {cert.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={`fixed inset-0 ${
              isDarkMode ? "bg-black/90" : "bg-black/80"
            } flex items-center justify-center z-50 p-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className={`absolute -top-6 -right-6 ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/60 text-gray-200"
                    : "bg-black/20 hover:bg-black/30 text-white"
                } rounded-full p-2`}
                aria-label="Close"
              >
                ✕
              </motion.button>

              <motion.img
                src={selectedImage}
                alt="Certificate preview"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  aspectRatio: "4 / 3",
                  objectFit: "contain",
                  borderRadius: 8,
                  backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                  boxShadow: isDarkMode
                    ? "0 10px 30px rgba(255,255,255,0.1)"
                    : "0 10px 30px rgba(0,0,0,0.6)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CertificationPage;
