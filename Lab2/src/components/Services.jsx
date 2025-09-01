import React from 'react';
import { Info, X, Heart, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Import the ThemeContext

const ServicesCollection = () => {
  const { isDarkMode } = useTheme(); // Access theme context
  const [selectedService, setSelectedService] = React.useState(null);

  // Example services array (unchanged)
  const services = [
    {
      icon: <Info />,
      title: "Consultation",
      description: "Expert advice for your laboratory needs."
    },
    {
      icon: <X />,
      title: "Testing",
      description: "Comprehensive testing services for all requirements."
    },
    {
      icon: <Heart />,
      title: "Support",
      description: "Ongoing support and maintenance for your lab."
    },
    {
      icon: <Eye />,
      title: "Training",
      description: "Hands-on training for staff and students."
    }
  ];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Our Services</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Comprehensive laboratory solutions for educational institutions across India
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transition-shadow ${
                isDarkMode
                  ? 'bg-gray-900 text-gray-300 hover:shadow-lg hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:shadow-lg'
              }`}
            >
              <div className={`${isDarkMode ? 'text-[#973E42]' : 'text-[#703233]'} mb-4`}>{service.icon}</div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{service.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesCollection;