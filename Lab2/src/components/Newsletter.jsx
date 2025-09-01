// import React, { useState } from "react";

// const CertificationPage = () => {
//   const certifications = [
//     { id: 1, img: "/cert1.png", title: "ISO 9001:2015 Certified" },
//     { id: 2, img: "/cert2.png", title: "CE Marking Compliance" },
//     { id: 3, img: "/cert3.png", title: "Bureau of Indian Standards (BIS)" },
//     { id: 4, img: "/cert4.png", title: "Educational Department Approved" },
//     { id: 5, img: "/cert5.png", title: "Lab Development Certification" },
//   ];

//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Certificates</h2>
//           <p className="text-xl text-gray-600">Quality assured and certified products</p>
//         </div>

//         {/* Certificates Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {certifications.map((cert) => (
//             <div
//               key={cert.id}
//               onClick={() => setSelectedImage(cert.img)}
//               className="bg-gradient-to-br from-[#cb9295] to-[#b7a8a9] p-4 rounded-lg text-center border-2 border-blue-200 cursor-pointer hover:shadow-lg transition"
//             >
//               <img
//                 src={cert.img}
//                 alt={cert.title}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">{cert.title}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Lightbox */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute -top-6 -right-6 bg-black/20 hover:bg-black/30 text-white rounded-full p-2"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <img
//               src={selectedImage}
//               alt="Certificate preview"
//               style={{
//                 maxWidth: "90vw",
//                 maxHeight: "90vh",
//                 aspectRatio: "4 / 3",
//                 objectFit: "contain",
//                 borderRadius: 8,
//                 backgroundColor: "#fff",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CertificationPage;




import React, { useState } from "react";
import { useTheme } from '../context/ThemeContext'; // Import ThemeContext

const CertificationPage = () => {
  const { isDarkMode } = useTheme(); // Access theme context
  const certifications = [
    { id: 1, img: "/cert1.png", title: "ISO 9001:2015 Certified" },
    { id: 2, img: "/cert2.png", title: "CE Marking Compliance" },
    { id: 3, img: "/cert3.png", title: "Bureau of Indian Standards (BIS)" },
    { id: 4, img: "/cert4.png", title: "Educational Department Approved" },
    { id: 5, img: "/cert5.png", title: "Lab Development Certification" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Our Certificates</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quality assured and certified products</p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedImage(cert.img)}
              className={`p-4 rounded-lg text-center border-2 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-[#973E42] to-[#b7a8a9] border-gray-700 hover:shadow-lg'
                  : 'bg-gradient-to-br from-[#cb9295] to-[#b7a8a9] border-blue-200 hover:shadow-lg'
              } cursor-pointer transition`}
            >
              <img
                src={cert.img}
                alt={cert.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{cert.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={`fixed inset-0 ${isDarkMode ? 'bg-black/90' : 'bg-black/80'} flex items-center justify-center z-50 p-6`}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className={`absolute -top-6 -right-6 ${
                isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/60 text-gray-200' : 'bg-black/20 hover:bg-black/30 text-white'
              } rounded-full p-2`}
              aria-label="Close"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Certificate preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                aspectRatio: "4 / 3",
                objectFit: "contain",
                borderRadius: 8,
                backgroundColor: isDarkMode ? '#1f2937' : '#fff', // Dark mode uses gray-800
                boxShadow: isDarkMode
                  ? '0 10px 30px rgba(255,255,255,0.1)'
                  : '0 10px 30px rgba(0,0,0,0.6)',
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationPage;