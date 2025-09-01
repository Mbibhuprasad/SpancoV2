import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, Eye, Info, X, ChevronLeft, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LabCategoryPage() {
  const { categoryId, subcategoryId, labCategoryId } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [labCategory, setLabCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const productsPerPage = 9;

  // Fetch category details
  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:5000/api/categories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setCategory(data);
        })
        .catch((err) => console.error("Error fetching category:", err));
    }
  }, [categoryId]);

  console.log("labcata gory renderr");
  // Fetch lab category details
  useEffect(() => {
    if (labCategoryId) {
      fetch(`http://localhost:5000/api/labcategories/${labCategoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setLabCategory(data);
        })
        .catch((err) => console.error("Error fetching lab category:", err));
    }
  }, [labCategoryId]);

  // Fetch subcategories for this category
  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:5000/api/subcategories/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setSubcategories(data);
        })
        .catch((err) => console.error("Error fetching subcategories:", err));
    }
  }, [categoryId]);

  // Fetch products based on lab category
  useEffect(() => {
    setIsLoading(true);
    if (labCategoryId) {
      fetch(`http://localhost:5000/api/products/labcategory/${labCategoryId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProducts(data.data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setIsLoading(false);
        });
    }
  }, [labCategoryId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, searchTerm]);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Spanco Lab Products...
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
              {labCategory ? labCategory.name : "Spanco"}{" "}
              <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                Lab
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our specialized lab equipment for{" "}
              {labCategory ? labCategory.name : "Spanco"}.
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
                    All Products
                  </button>
                  {subcategories.map((subcategory) => (
                    <button
                      key={subcategory._id}
                      onClick={() => setSelectedSubCategory(subcategory._id)}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                        selectedSubCategory === subcategory._id
                          ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {subcategory.name}
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
          {/* Products Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {labCategory ? labCategory.name : "Lab"} Products
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
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-4">
                    <img
                      src={
                        selectedProduct.image &&
                        selectedProduct.image.length > 0
                          ? selectedProduct.image[0]
                          : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      {selectedProduct.image &&
                        selectedProduct.image
                          .slice(0, 3)
                          .map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedProduct.name}
                      </h2>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {selectedProduct.rating || "4.5"}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Code: {selectedProduct.PCode}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Category
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {category?.name || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Lab Category
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {labCategory?.name || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Material
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {selectedProduct.material || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Dimensions
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {selectedProduct.dimensions || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-4 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
