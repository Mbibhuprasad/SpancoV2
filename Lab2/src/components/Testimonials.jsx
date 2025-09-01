import React, { useState } from "react";

const EventGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg",
    "https://images.pexels.com/photos/1181352/pexels-photo-1181352.jpeg",
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg",
    "https://images.pexels.com/photos/1181642/pexels-photo-1181642.jpeg",
    "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg",
    "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Event
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Some memorable moments from our recent events.
          </p>
        </div>

        {/* Continuous Scrolling Section */}
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll space-x-6">
            {[...images, ...images].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transform transition"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Event ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Popup Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Selected Event"
              className="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>

      {/* Tailwind keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default EventGallery;