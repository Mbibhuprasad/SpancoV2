import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Eye,
  Info,
  X,
  Filter,
  Phone,
  Mail,
  MapPin,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactUsModal from "../components/Contact"; // Import the Contact component

const SchoolPage = () => {
  const { subcategory } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["ATL", "STEM"];

  useEffect(() => {
    const subcategoryMap = {
      atl: "ATL",
      stem: "STEM",
    };

    if (subcategory) {
      const mappedSubCategory = subcategoryMap[subcategory.toLowerCase()];
      setSelectedSubCategory(mappedSubCategory || "all");
    } else {
      setSelectedSubCategory("all");
    }
  }, [subcategory]);

  const schoolPrograms = [
    {
      id: 1,
      name: "Atal Tinkering Lab (ATL)",
      subcategory: "ATL",
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Innovation & Creativity",
        "Problem Solving",
        "STEM Learning",
        "Hands-on Experience",
      ],
      description:
        "Atal Tinkering Lab (ATL) is a flagship initiative under Atal Innovation Mission (AIM) that aims to foster curiosity, creativity, and imagination in young minds. Our ATL provides students with access to educational and learning equipment on science, electronics, robotics, open source microcontroller boards, sensors and 3D printers and equipment set. The lab encourages students to work with tools and equipment to understand STEM (Science, Technology, Engineering and Math) concepts through hands-on experience and creating innovative solutions.",
      detailedInfo: {
        "Program Duration": "Year-round program",
        "Age Group": "Grade 6-12",
        "Lab Equipment": "3D Printers, Robotics Kits, IoT Devices",
        "Students Capacity": "30 students per session",
        Certification: "AIM Certified Program",
      },
      objectives: [
        "Develop scientific temper and cultivate the spirit of inquiry among students",
        "Foster innovation and creativity through hands-on learning",
        "Enable students to create prototypes and solve real-world problems",
        "Encourage collaborative learning and teamwork",
        "Prepare students for future careers in STEM fields",
      ],
    },
    {
      id: 2,
      name: "STEM Education Program",
      subcategory: "STEM",
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Science & Mathematics",
        "Technology Integration",
        "Engineering Design",
        "Research Projects",
      ],
      description:
        "Our STEM (Science, Technology, Engineering, and Mathematics) Education Program provides an integrated approach to learning that removes the traditional barriers between academic subjects. Students engage in rigorous academic concepts through real-world applications, project-based learning, and interdisciplinary collaboration. The program emphasizes critical thinking, problem-solving, and innovation while preparing students for the challenges of the 21st century workforce.",
      detailedInfo: {
        "Program Duration": "Full academic year",
        "Age Group": "Grade 1-12",
        "Learning Areas": "Science, Tech, Engineering, Math",
        "Class Size": "25 students per class",
        Assessment: "Project-based evaluation",
      },
      objectives: [
        "Integrate STEM subjects through project-based learning",
        "Develop critical thinking and analytical skills",
        "Encourage scientific inquiry and research methodologies",
        "Build computational thinking and digital literacy",
        "Prepare students for STEM careers and higher education",
      ],
    },
  ];

  // Filter programs based on selected subcategory and search term
  const filteredPrograms = schoolPrograms.filter((program) => {
    const matchesSubCategory =
      selectedSubCategory === "all" ||
      program.subcategory === selectedSubCategory;
    const matchesSearch = program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSubCategory && matchesSearch;
  });

  const openModal = (program) => {
    setSelectedProgram(program);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = "auto";
  };

  // Function to open contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Function to close contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading School Programs...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all  ease-in-out flex">
      {/* Sidebar Toggle Button (Outside) */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-40 top-40 left-4 p-2 rounded-full bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "lg:left-72" : "lg:left-4"
        }`}
      >
        {isSidebarOpen ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-30 w-72 lg:w-1/4 h-full bg-gray-50 dark:bg-gray-800 shadow-lg overflow-y-auto"
          >
            <div className="p-6">
              {/* Sidebar Header with Toggle Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Filter Programs
                </h2>
                {/* Sidebar Toggle Button (Inside) */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-full bg-gradient-to-r from-[#703233] to-[#973E42] text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Programs
                </label>
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#973E42] dark:bg-gray-700 dark:text-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program Categories
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSubCategory("all")}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedSubCategory === "all"
                        ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Programs
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedSubCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSubCategory === category
                          ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Program Count */}
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Programs Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredPrograms.length} Program
                  {filteredPrograms.length !== 1 ? "s" : ""} available
                </p>
              </div>

              {/* Close Sidebar Button (Bottom) */}
              <button
                onClick={toggleSidebar}
                className="w-full mt-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 lg:hidden"
              >
                Close Sidebar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-0" : "lg:ml-0"
        }`}
      >
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-100 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-black animate-fadeIn">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"
            style={{ backgroundSize: "20px 20px" }}
          ></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-slideUp">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                School{" "}
                <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                  Programs
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Discover innovative learning programs that inspire creativity,
                foster innovation, and prepare students for the future.
              </p>
            </div>

            {/* Hero Image */}
            <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
              <img
                src="https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="School Programs"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedSubCategory === "all"
                  ? "All School Programs"
                  : `${selectedSubCategory} Program`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredPrograms.length} Program
                {filteredPrograms.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                        <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {program.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {program.name}
                      </h3>
                      <span className="inline-block bg-blue-100 dark:bg-[#703233] text-[#973E42] dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {program.subcategory}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.features &&
                        program.features.map((feature, index) => (
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
                        onClick={() => openModal(program)}
                        className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                      >
                        <Info className="w-5 h-5" />
                        <span>Learn More</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Modal for Program Details */}
        {selectedProgram && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8 mx-auto animate-modalEnter">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProgram.name}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="mb-8">
                  <img
                    src={selectedProgram.image}
                    alt={selectedProgram.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      About This Program
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedProgram.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Program Details
                      </h3>
                      <div className="space-y-3">
                        {selectedProgram.detailedInfo &&
                          Object.entries(selectedProgram.detailedInfo).map(
                            ([key, value]) => (
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
                            )
                          )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Program Objectives
                      </h3>
                      <ul className="space-y-2">
                        {selectedProgram.objectives &&
                          selectedProgram.objectives.map((objective, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-[#703233] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {objective}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Contact Us for More Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Phone
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          +91 9876543210
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Email
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          info@school.com
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full flex items-center justify-center mx-auto mb-3">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Address
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          123 School Street, Education City
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        onClick={openContactModal}
                        className="bg-gradient-to-r from-[#703233] to-[#973E42] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
                      >
                        Contact Us Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Us Modal */}
        <ContactUsModal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
        />

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
    </div>
  );
};

export default SchoolPage;
