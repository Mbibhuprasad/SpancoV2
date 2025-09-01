import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Eye,
  Info,
  X,
  Filter,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EngineeringPage = () => {
  const { subcategory } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedEngineering, setSelectedEngineering] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const productsPerPage = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const brands = [
    "Electrical",
    "Mechanical",
    "Civil",
    "Electronics Communication",
  ];

  useEffect(() => {
    const subcategoryMap = {
      electrical: "Electrical",
      mechanical: "Mechanical",
      civil: "Civil",
      electronics: "Electronics Communication",
    };

    if (subcategory) {
      const mappedSubCategory = subcategoryMap[subcategory.toLowerCase()];
      setSelectedSubCategory(mappedSubCategory || "all");
    } else {
      setSelectedSubCategory("all");
    }
  }, [subcategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, searchTerm]);

  const Engineering = [
    {
      id: 1,
      name: "Electrical Engineering Lab",
      subcategory: "Electrical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Circuit Analysis", "Power Systems", "Control Engineering"],
      description:
        "Advanced electrical engineering laboratory equipped with state-of-the-art equipment for circuit analysis, power systems study, and control engineering experiments. This lab provides hands-on experience with electrical components and systems.",
      specifications: {
        "Lab Area": "500 sq ft",
        "Equipment Count": "25 units",
        "Voltage Range": "5V - 440V",
        "Power Rating": "10kW",
        "Safety Level": "Class A",
      },
    },
    {
      id: 2,
      name: "Power Electronics Lab",
      subcategory: "Electrical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Advanced robotics",
        "Circuit design",
        "Microcontroller programming",
      ],
      description:
        "Comprehensive power electronics laboratory featuring advanced equipment for studying power conversion, motor drives, and renewable energy systems. Students gain practical experience with modern power electronic devices and control techniques.",
      specifications: {
        "Lab Area": "600 sq ft",
        "Equipment Count": "30 units",
        "Power Capacity": "15kW",
        "Frequency Range": "DC - 50kHz",
        "Safety Standard": "IEC 61010",
      },
    },
    {
      id: 3,
      name: "Digital Electronics Lab",
      subcategory: "Electrical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Power electronics", "Control systems", "Signal processing"],
      description:
        "Modern digital electronics laboratory with comprehensive facilities for studying digital circuits, FPGA programming, and embedded systems. The lab is equipped with latest digital design tools and testing equipment.",
      specifications: {
        "Lab Area": "450 sq ft",
        Workstations: "20 stations",
        "FPGA Boards": "15 units",
        "Logic Analyzers": "8 units",
        "Operating Voltage": "3.3V - 5V",
      },
    },
    {
      id: 4,
      name: "Mechanical Design Lab",
      subcategory: "Mechanical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["CAD Design", "3D Modeling", "Prototyping"],
      description:
        "Advanced mechanical design laboratory equipped with CAD workstations, 3D printers, and prototyping tools. Students learn product design, manufacturing processes, and rapid prototyping techniques.",
      specifications: {
        "Lab Area": "800 sq ft",
        "CAD Workstations": "25 units",
        "3D Printers": "5 units",
        "Design Software": "SolidWorks, AutoCAD",
        "Print Resolution": "0.1mm",
      },
    },
    {
      id: 5,
      name: "Fluid Mechanics Lab",
      subcategory: "Mechanical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Flow Analysis", "Pump Testing", "Turbine Studies"],
      description:
        "Comprehensive fluid mechanics laboratory for studying fluid flow, pump performance, and turbomachinery. The lab features modern equipment for analyzing various fluid phenomena and hydraulic systems.",
      specifications: {
        "Lab Area": "1000 sq ft",
        "Flow Channels": "3 units",
        "Pump Test Rigs": "4 units",
        "Wind Tunnel": "1 unit",
        "Max Flow Rate": "500 L/min",
      },
    },
    {
      id: 6,
      name: "Manufacturing Lab",
      subcategory: "Mechanical",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["CNC Machines", "Welding", "Assembly"],
      description:
        "State-of-the-art manufacturing laboratory with CNC machines, welding equipment, and assembly stations. Students gain hands-on experience in modern manufacturing processes and quality control methods.",
      specifications: {
        "Lab Area": "1200 sq ft",
        "CNC Machines": "6 units",
        "Welding Stations": "8 units",
        Precision: "±0.01mm",
        "Material Types": "Steel, Aluminum, Plastic",
      },
    },
    {
      id: 7,
      name: "Structural Engineering Lab",
      subcategory: "Civil",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Material Testing", "Load Analysis", "Bridge Design"],
      description:
        "Advanced structural engineering laboratory for testing materials, analyzing structural behavior, and designing safe structures. The lab is equipped with universal testing machines and structural analysis software.",
      specifications: {
        "Lab Area": "1500 sq ft",
        "Testing Machines": "5 units",
        "Load Capacity": "2000 kN",
        "Strain Gauges": "50 units",
        Software: "SAP2000, ETABS",
      },
    },
    {
      id: 8,
      name: "Concrete Technology Lab",
      subcategory: "Civil",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Concrete Mix", "Strength Testing", "Durability Studies"],
      description:
        "Specialized concrete technology laboratory for studying concrete properties, mix design, and durability. The lab provides facilities for concrete preparation, curing, and comprehensive testing procedures.",
      specifications: {
        "Lab Area": "900 sq ft",
        "Compression Machines": "3 units",
        "Curing Tanks": "6 units",
        "Max Pressure": "3000 psi",
        "Temperature Control": "20°C ± 2°C",
      },
    },
    {
      id: 9,
      name: "Surveying Lab",
      subcategory: "Civil",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Land Mapping", "GPS Surveying", "Theodolite"],
      description:
        "Modern surveying laboratory with precision instruments for land mapping, topographic surveys, and GPS positioning. Students learn traditional and modern surveying techniques using state-of-the-art equipment.",
      specifications: {
        "Lab Area": "700 sq ft",
        Theodolites: "12 units",
        "GPS Units": "8 units",
        "Total Stations": "5 units",
        Accuracy: "±2mm + 2ppm",
      },
    },
    {
      id: 10,
      name: "Communication Systems Lab",
      subcategory: "Electronics Communication",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["RF Design", "Antenna Testing", "Signal Processing"],
      description:
        "Advanced communication systems laboratory for studying RF circuits, antenna design, and wireless communication. The lab features modern equipment for analyzing communication systems and signal processing techniques.",
      specifications: {
        "Lab Area": "650 sq ft",
        "Spectrum Analyzers": "4 units",
        "Signal Generators": "6 units",
        "Frequency Range": "DC - 6GHz",
        "Anechoic Chamber": "1 unit",
      },
    },
    {
      id: 11,
      name: "Digital Signal Processing Lab",
      subcategory: "Electronics Communication",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["DSP Algorithms", "Filter Design", "Audio Processing"],
      description:
        "Comprehensive digital signal processing laboratory with DSP processors, MATLAB software, and audio processing equipment. Students learn algorithm implementation and real-time signal processing techniques.",
      specifications: {
        "Lab Area": "550 sq ft",
        "DSP Boards": "20 units",
        "Audio Equipment": "10 sets",
        "Sampling Rate": "Up to 192 kHz",
        Software: "MATLAB, LabVIEW",
      },
    },
    {
      id: 12,
      name: "Microwave Engineering Lab",
      subcategory: "Electronics Communication",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Microwave Circuits", "Waveguide Testing", "Radar Systems"],
      description:
        "Specialized microwave engineering laboratory for studying high-frequency circuits, waveguides, and radar systems. The lab is equipped with vector network analyzers and microwave measurement equipment.",
      specifications: {
        "Lab Area": "750 sq ft",
        "Vector Network Analyzers": "3 units",
        "Waveguide Components": "25 units",
        "Frequency Range": "1GHz - 40GHz",
        "Radar Trainer": "1 unit",
      },
    },
  ];

  // First filter by subcategory, then by search term
  const filteredSubCategories = Engineering.filter((item) => {
    const matchesSubCategory =
      selectedSubCategory === "all" || item.subcategory === selectedSubCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSubCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSubCategories.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredSubCategories.slice(startIndex, endIndex);

  const openModal = (Engineering) => {
    setSelectedEngineering(Engineering);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEngineering(null);
    document.body.style.overflow = "auto";
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Engineering Products...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-black animate-fadeIn">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"
          style={{ backgroundSize: "20px 20px" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-slideUp">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Engineering{" "}
              <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                Labs
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our best products of Engineering Labs from top quality.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
            <img
              src="https://engineering.tamu.edu/mechanical/_files/_images/_content-images/LAB-MEEN-CiMDM.jpg"
              alt="Engineering Labs"
              className="w-full h-[20rem] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <div className="flex relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-1/2 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Sidebar Section */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.section
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-[100%] md:w-[30%] lg:w-[25%] xl:w-[20%] py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 fixed md:relative h-screen md:h-auto z-20 overflow-y-auto"
            >
              <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => setSelectedSubCategory("all")}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                      selectedSubCategory === "all"
                        ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Subcategories
                  </button>
                  {brands.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => setSelectedSubCategory(subcategory)}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                        selectedSubCategory === subcategory
                          ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Main Content Section */}
        <motion.div
          className={`${
            isSidebarOpen
              ? "w-full md:w-[70%] lg:w-[75%] xl:w-[80%] md:ml-auto"
              : "w-full"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Engineering Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedSubCategory === "all"
                    ? "All Engineering Products"
                    : `${selectedSubCategory} Engineering Products`}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredSubCategories.length} Products available
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((Engineering) => (
                  <motion.div
                    key={Engineering.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={Engineering.image}
                        alt={Engineering.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                          <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500" />
                        </button>
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                          <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-500" />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {Engineering.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {Engineering.rating} ({Engineering.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {Engineering.features &&
                          Engineering.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => openModal(Engineering)}
                          className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                        >
                          <Info className="w-5 h-5" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination - Moved below products */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Modal for Engineering Specifications */}
          {selectedEngineering && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 mx-auto animate-modalEnter">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedEngineering.name} - Specifications
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <img
                      src={selectedEngineering.image}
                      alt={selectedEngineering.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Description
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedEngineering.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Technical Specifications
                      </h3>
                      <div className="grid gap-3">
                        {selectedEngineering.specifications &&
                          Object.entries(
                            selectedEngineering.specifications
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {key}:
                              </span>
                              <span className="text-gray-900 dark:text-white font-semibold">
                                {value}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={closeModal}
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-modalEnter {
          animation: modalEnter 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EngineeringPage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Star, Heart, Eye, Info, X, ChevronLeft, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default ProductShowPage = () => {
//   const { categoryId, subcategoryId } = useParams();
//   const [selectedSubCategory, setSelectedSubCategory] = useState("all");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [category, setCategory] = useState(null);
//   const productsPerPage = 9;

//   // Fetch category details
//   useEffect(() => {
//     if (categoryId) {
//       fetch(`http://localhost:5000/api/categories/${categoryId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setCategory(data);
//         })
//         .catch((err) => console.error("Error fetching category:", err));
//     }
//   }, [categoryId]);

//   // Fetch subcategories for this category
//   useEffect(() => {
//     if (categoryId) {
//       fetch(`http://localhost:5000/api/subcategories/category/${categoryId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setSubcategories(data);
//           setIsLoading(false);
//         })
//         .catch((err) => console.error("Error fetching subcategories:", err));
//     }
//   }, [categoryId]);

//   // Fetch products based on category and subcategory
//   useEffect(() => {
//     setIsLoading(true);
//     let url = "http://localhost:5000/api/6895859d3e5961e536578f0d";

//     if (subcategoryId) {
//       url = `http://localhost:5000/api/products/subcategory/${subcategoryId}`;
//     } else if (categoryId) {
//       url = `http://localhost:5000/api/products/category/${categoryId}`;
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProducts(data.data);
//         }
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setIsLoading(false);
//       });
//   }, [categoryId, subcategoryId]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedSubCategory, searchTerm]);

//   // Filter products by search term
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.PCode.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesSearch;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = "auto";
//   };

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
//           <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//             Loading Spanco All Products...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out">
//       {/* Hero Section */}
//       <section className="relative py-16 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-black animate-fadeIn">
//         <div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"
//           style={{ backgroundSize: "20px 20px" }}
//         ></div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="text-center mb-12 animate-slideUp">
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               {category ? category.name : "Engineering"}{" "}
//               <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
//                 Labs
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Discover our best products of Engineering Labs from top quality.
//             </p>
//           </div>

//           {/* Hero Image */}
//           <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
//             <img
//               src="https://engineering.tamu.edu/mechanical/_files/_images/_content-images/LAB-MEEN-CiMDM.jpg"
//               alt="Engineering Labs"
//               className="w-full h-[20rem] object-cover rounded-2xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="flex relative">
//         {/* Sidebar Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="fixed top-1/2 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
//         >
//           {isSidebarOpen ? (
//             <ChevronLeft className="w-5 h-5" />
//           ) : (
//             <Menu className="w-5 h-5" />
//           )}
//         </button>

//         {/* Sidebar Section */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.section
//               initial={{ x: -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="w-full h-[100%] md:w-[30%] lg:w-[25%] xl:w-[20%] py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 fixed md:relative h-screen md:h-auto z-20 overflow-y-auto"
//             >
//               <div className="container mx-auto px-4">
//                 <div className="flex flex-col space-y-4">
//                   <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>

//                   <button
//                     onClick={() => setSelectedSubCategory("all")}
//                     className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
//                       selectedSubCategory === "all"
//                         ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//                     }`}
//                   >
//                     All Subcategories
//                   </button>
//                   {subcategories.map((subcategory) => (
//                     <button
//                       key={subcategory._id}
//                       onClick={() => setSelectedSubCategory(subcategory._id)}
//                       className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
//                         selectedSubCategory === subcategory._id
//                           ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                           : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//                       }`}
//                     >
//                       {subcategory.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>

//         {/* Main Content Section */}
//         <motion.div
//           className={`${
//             isSidebarOpen
//               ? "w-full md:w-[70%] lg:w-[75%] xl:w-[80%] md:ml-auto"
//               : "w-full"
//           }`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* Products Grid */}
//           <section className="py-20">
//             <div className="container mx-auto px-4">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//                   {selectedSubCategory === "all"
//                     ? "All Engineering Products"
//                     : `${
//                         subcategories.find((s) => s._id === selectedSubCategory)
//                           ?.name || ""
//                       } Products`}
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {filteredProducts.length} Products available
//                 </p>
//               </div>

//               {filteredProducts.length === 0 ? (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 dark:text-gray-400 text-lg">
//                     No products found. Try a different search term or check back
//                     later.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {currentProducts.map((product) => (
//                       <motion.div
//                         key={product._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
//                       >
//                         {/* Image Section */}
//                         <div className="relative overflow-hidden">
//                           <img
//                             src={
//                               product.image && product.image.length > 0
//                                 ? product.image[0]
//                                 : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
//                             }
//                             alt={product.name}
//                             className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                           />
//                           <div className="absolute top-4 right-4 flex space-x-2">
//                             <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
//                               <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500" />
//                             </button>
//                             <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
//                               <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-500" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Content Section */}
//                         <div className="p-6">
//                           <div className="flex items-center justify-between mb-3">
//                             <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                               {product.name}
//                             </h3>
//                             <div className="flex items-center space-x-1">
//                               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                               <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 {product.rating || "4.5"}
//                               </span>
//                             </div>
//                           </div>

//                           <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//                             {product.description}
//                           </p>

//                           <div className="flex items-center justify-between mb-4">
//                             <span className="text-sm text-gray-500 dark:text-gray-400">
//                               Code: {product.PCode}
//                             </span>
//                           </div>

//                           <div className="flex space-x-3">
//                             <button
//                               onClick={() => openModal(product)}
//                               className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
//                             >
//                               <Info className="w-5 h-5" />
//                               <span>View Details</span>
//                             </button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="flex justify-center mt-12">
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() =>
//                             setCurrentPage((prev) => Math.max(prev - 1, 1))
//                           }
//                           disabled={currentPage === 1}
//                           className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                             currentPage === 1
//                               ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                               : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
//                           }`}
//                         >
//                           Previous
//                         </button>

//                         {[...Array(totalPages)].map((_, index) => {
//                           const pageNum = index + 1;
//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => setCurrentPage(pageNum)}
//                               className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                                 currentPage === pageNum
//                                   ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                                   : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         })}

//                         <button
//                           onClick={() =>
//                             setCurrentPage((prev) =>
//                               Math.min(prev + 1, totalPages)
//                             )
//                           }
//                           disabled={currentPage === totalPages}
//                           className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                             currentPage === totalPages
//                               ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                               : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
//                           }`}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </section>

//           {/* Modal for Product Specifications */}
//           {selectedProduct && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 mx-auto animate-modalEnter">
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {selectedProduct.name} - Specifications
//                     </h2>
//                     <button
//                       onClick={closeModal}
//                       className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
//                     >
//                       <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//                     </button>
//                   </div>

//                   <div className="mb-6">
//                     <img
//                       src={
//                         selectedProduct.image &&
//                         selectedProduct.image.length > 0
//                           ? selectedProduct.image[0]
//                           : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
//                       }
//                       alt={selectedProduct.name}
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                         Description
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                         {selectedProduct.description}
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                         Technical Specifications
//                       </h3>
//                       <div className="grid gap-3">
//                         {selectedProduct.technicalSpecification &&
//                         selectedProduct.technicalSpecification.length > 0 ? (
//                           selectedProduct.technicalSpecification.map(
//                             (spec, index) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
//                               >
//                                 <span className="font-medium text-gray-700 dark:text-gray-300">
//                                   {spec.label}:
//                                 </span>
//                                 <span className="text-gray-900 dark:text-white font-semibold">
//                                   {spec.value}
//                                 </span>
//                               </div>
//                             )
//                           )
//                         ) : (
//                           <p className="text-gray-500 dark:text-gray-400">
//                             No technical specifications available.
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                         Product Code
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300">
//                         {selectedProduct.PCode}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex space-x-4">
//                     <button
//                       onClick={closeModal}
//                       className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>

//       {/* Global styles for animations */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes modalEnter {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.6s ease-out forwards;
//         }
//         .animate-modalEnter {
//           animation: modalEnter 0.3s ease-out forwards;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };
