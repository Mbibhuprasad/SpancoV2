import React, { useState, useEffect } from "react";
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
  User,
  CheckCircle,
} from "lucide-react";

// Contact Modal Component
const ContactUsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Auto close after a short delay and reset form
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        onClose();
      }, 3000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto my-8 mx-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contact Us
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Close contact form"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for contacting us. We will get back to you shortly.
              </p>
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-400 font-semibold">
                  Reference: #C{Date.now().toString().slice(-6)}
                </p>
                <p className="text-green-600 dark:text-green-500 text-sm mt-1">
                  Keep this reference for follow-up.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Info / Note */}
              <div className="bg-gradient-to-r from-[#703233] to-[#973E42] p-4 rounded-lg text-white mb-6">
                <h3 className="font-bold mb-2">How we help</h3>
                <p className="text-sm">
                  Send us your query — for product info, demos, quotations or
                  service requests. We'll respond within 24 hours.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-to-[#973E42] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-to-[#973E42] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-to-[#973E42] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-to-[#973E42] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-to-[#973E42] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Furniture = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["ATL", "STEM"];

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
  };

  const closeModal = () => {
    setSelectedProgram(null);
  };

  // Function to open contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Function to close contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Furniture Labs...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-100 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Furniture{" "}
              <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                Labs
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The Furniture Lab is a specialized facility for designing,
              prototyping, and fabricating high-quality furniture. Equipped with
              advanced woodworking machinery, CNC routers, and finishing tools,
              the lab empowers students and artisans to bring creative designs
              to life. Participants learn modern and traditional
              furniture-making techniques, material analysis, ergonomics, and
              sustainable production practices to meet the demands of both local
              and global markets.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105">
            <img
              src="https://visionlabpro.com/wp-content/uploads/2022/03/TRES-01with-drack-black.jpg"
              alt="Furniture Lab"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8 mt-16">
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
                  +91 9338273911
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
                  spancotek@gmail.com
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
                  Sailshree Vihar, Patia. Spancotek Pvt Ltd, Bhubaneswar, Odisha
                  - 751024
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              {/* <button
                onClick={openContactModal}
                className="bg-gradient-to-r from-[#703233] to-[#973E42] text-white px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
              >
                Contact Us Now
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Modal */}
      <ContactUsModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};

export default Furniture;
