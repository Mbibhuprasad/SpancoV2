import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, Eye, Info, X, ChevronLeft, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductShowPage() {
  const { categoryId, subcategoryId, labCategoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [labCategory, setLabCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [labCategories, setLabCategories] = useState([]);
  const productsPerPage = 9;

  // Fetch Category, Subcategory, and Lab Category details for display
  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:5000/api/categories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => setCategory(data))
        .catch((err) => console.error("Error fetching category:", err));

      fetch(`http://localhost:5000/api/subcategories/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data))
        .catch((err) => console.error("Error fetching subcategories:", err));
    }

    if (labCategoryId) {
      fetch(`http://localhost:5000/api/labcategories/${labCategoryId}`)
        .then((res) => res.json())
        .then((data) => setLabCategory(data))
        .catch((err) => console.error("Error fetching lab category:", err));
    }

    // Fetch lab categories for the current subcategory
    if (subcategoryId) {
      fetch(
        `http://localhost:5000/api/labcategories/subcategory/${subcategoryId}`
      )
        .then((res) => res.json())
        .then((data) => setLabCategories(data))
        .catch((err) => console.error("Error fetching lab categories:", err));
    }
  }, [categoryId, subcategoryId, labCategoryId]);

  // Combined fetch logic for products
  useEffect(() => {
    setIsLoading(true);
    let url = "";

    // Prioritize fetching products by labCategoryId if it exists
    if (labCategoryId) {
      url = `http://localhost:5000/api/products/labcategory/${labCategoryId}`;
    } else if (subcategoryId) {
      url = `http://localhost:5000/api/products/subcategory/${subcategoryId}`;
    } else if (categoryId) {
      url = `http://localhost:5000/api/products/category/${categoryId}`;
    } else {
      url = "http://localhost:5000/api/products"; // Fallback to all products
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setIsLoading(false);
      });
  }, [categoryId, subcategoryId, labCategoryId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subcategoryId, labCategoryId]);

  // Filter products by search term
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.PCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const handleLabCategoryClick = (labCategoryId) => {
    navigate(
      `/category/${categoryId}/subcategory/${subcategoryId}/labcategory/${labCategoryId}`
    );
  };

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(
      `/category/${categoryId}/subcategory/${subcategoryId}/labcategory/68566aba6ef80b19790a2b17`
    );
  };

  const pageTitle =
    labCategory?.name || subcategories?.name || category?.name || "Spanco";
  const heroText = labCategory
    ? `Discover our specialized lab equipment for ${labCategory.name}`
    : `Discover our best products of ${
        category?.name || "Spanco"
      } from top quality.`;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Spanco Products...
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
              {pageTitle}{" "}
              <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                Labs
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {heroText}
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

                  {/* Subcategories */}
                  {subcategories.map((subcategory) => (
                    <div key={subcategory._id} className="mb-4">
                      <button
                        onClick={() => handleSubcategoryClick(subcategory._id)}
                        className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 w-full text-left ${
                          subcategoryId === subcategory._id
                            ? "bg-[#703233] text-white"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        {subcategory.name}
                      </button>

                      {/* Lab Categories for this subcategory */}
                      {subcategoryId === subcategory._id &&
                        labCategories.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {labCategories.map((labCategory) => (
                              <button
                                key={labCategory._id}
                                onClick={() =>
                                  handleLabCategoryClick(labCategory._id)
                                }
                                className={`px-4 py-1 rounded-[0.8rem] text-sm transition-all duration-200 w-full text-left ${
                                  labCategoryId === labCategory._id
                                    ? "bg-[#973E42] text-white"
                                    : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
                                }`}
                              >
                                {labCategory.name}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
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
          {/* Products Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {labCategory?.name || category?.name || "All"} Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} Products available
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No products found. Try a different search term or check back
                    later.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProducts.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
                      >
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              product.image && product.image.length > 0
                                ? product.image[0]
                                : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
                            }
                            alt={product.name}
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
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {product.rating || "4.5"}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Code: {product.PCode}
                            </span>
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => openModal(product)}
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

                  {/* Pagination */}
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
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
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
                </>
              )}
            </div>
          </section>

          {/* Modal for Product Specifications */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 mx-auto animate-modalEnter">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProduct.name} - Specifications
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
                      src={
                        selectedProduct.image &&
                        selectedProduct.image.length > 0
                          ? selectedProduct.image[0]
                          : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={selectedProduct.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Description
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Technical Specifications
                      </h3>
                      <div className="grid gap-3">
                        {selectedProduct.technicalSpecification &&
                        selectedProduct.technicalSpecification.length > 0 ? (
                          selectedProduct.technicalSpecification.map(
                            (spec, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                              >
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                  {spec.label}:
                                </span>
                                <span className="text-gray-900 dark:text-white font-semibold">
                                  {spec.value}
                                </span>
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">
                            No technical specifications available.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Product Code
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedProduct.PCode}
                      </p>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
