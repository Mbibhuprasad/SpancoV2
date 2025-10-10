// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Star, Heart, Eye, Info, X, ChevronLeft, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const heroImages = {
//   Engineering: [
//     "https://damassets.autodesk.net/content/dam/autodesk/draftr/23696/what-is-industrial-engineering-1172x660.jpg", // Engineers working on a blueprint
//   ],
//   School: [
//     "https://designcollaborative.com/wp-content/uploads/2024/02/11.16.22_066-scaled.webp", // Empty classroom with desks
//   ],
//   "Higher Education": [
//     "https://www.shutterstock.com/image-photo/empty-science-classroom-college-education-600nw-2528928597.jpg", // University campus at sunset
//   ],
//   "Skill Development": [
//     "https://havells.com/media/wysiwyg/skill-development.png", // Coding workshop
//   ],
//   Furniture: [
//     "https://images.pexels.com/photos/2797607/pexels-photo-2797607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Modern sofa in a minimalist room
//     "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Elegant dining table and chairs
//     "https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Wooden desk with office chair
//   ],
//   default: [
//     "https://havells.com/media/wysiwyg/skill-development.png",
//     "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   ],
// };

// export default function ProductShowPage() {
//   const { categoryId, subcategoryId, labCategoryId } = useParams();
//   const navigate = useNavigate();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [labCategory, setLabCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [labCategories, setLabCategories] = useState([]);
//   const [randomHeroImage, setRandomHeroImage] = useState(""); // New state for the random image
//   const productsPerPage = 12;

//   // Fetch navigation data based on URL parameters
//   useEffect(() => {
//     // Fetch Category details
//     if (categoryId) {
//       fetch(`${import.meta.env.VITE_BACKEND_URI}/categories/${categoryId}`)
//         .then((res) => res.json())
//         .then((data) => setCategory(data))
//         .catch((err) => console.error("Error fetching category:", err));
//     }

//     // Fetch Subcategories for the current category
//     if (categoryId) {
//       fetch(
//         `${
//           import.meta.env.VITE_BACKEND_URI
//         }/subcategories/category/${categoryId}`
//       )
//         .then((res) => res.json())
//         .then((data) => setSubcategories(data))
//         .catch((err) => console.error("Error fetching subcategories:", err));
//     }

//     // Fetch Lab Categories for the current subcategory
//     if (subcategoryId) {
//       fetch(
//         `${
//           import.meta.env.VITE_BACKEND_URI
//         }/labcategories/subcategory/${subcategoryId}`
//       )
//         .then((res) => res.json())
//         .then((data) => setLabCategories(data))
//         .catch((err) => console.error("Error fetching lab categories:", err));
//     }

//     // Fetch Lab Category details
//     if (labCategoryId) {
//       fetch(
//         `${import.meta.env.VITE_BACKEND_URI}/labcategories/${labCategoryId}`
//       )
//         .then((res) => res.json())
//         .then((data) => setLabCategory(data))
//         .catch((err) => console.error("Error fetching lab category:", err));
//     }
//   }, [categoryId, subcategoryId, labCategoryId]);

//   // Combined fetch logic for products
//   useEffect(() => {
//     setIsLoading(true);
//     let url = "";

//     if (labCategoryId) {
//       url = `${
//         import.meta.env.VITE_BACKEND_URI
//       }/products/labcategory/${labCategoryId}`;
//     } else if (subcategoryId) {
//       url = `${
//         import.meta.env.VITE_BACKEND_URI
//       }/products/subcategory/${subcategoryId}`;
//     } else if (categoryId) {
//       url = `${
//         import.meta.env.VITE_BACKEND_URI
//       }/products/category/${categoryId}`;
//     } else {
//       url = `${import.meta.env.VITE_BACKEND_URI}/products`; // Fallback to all products
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProducts(data.data);
//         } else {
//           setProducts([]);
//         }
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setProducts([]);
//         setIsLoading(false);
//       });
//   }, [categoryId, subcategoryId, labCategoryId]);

//   // New useEffect to set a random hero image when the category changes
//   useEffect(() => {
//     if (category && category.name) {
//       const categoryName = category.name;
//       const images = heroImages[categoryName] || heroImages.default;
//       const randomIndex = Math.floor(Math.random() * images.length);
//       setRandomHeroImage(images[randomIndex]);
//     } else {
//       const defaultImages = heroImages.default;
//       const randomIndex = Math.floor(Math.random() * defaultImages.length);
//       setRandomHeroImage(defaultImages[randomIndex]);
//     }
//   }, [category]);

//   // Reset page to 1 when filters or URL change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, subcategoryId, labCategoryId]);

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

//   // Modal functions
//   const openModal = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = "auto";
//   };

//   // Sidebar navigation handlers
//   const handleSubcategoryClick = (id) => {
//     navigate(`/category/${categoryId}/subcategory/${id}`);
//   };

//   const handleLabCategoryClick = (id) => {
//     navigate(
//       `/category/${categoryId}/subcategory/${subcategoryId}/labcategory/${id}`
//     );
//   };

//   const pageTitle =
//     labCategory?.name ||
//     subcategories.find((sub) => sub._id === subcategoryId)?.name ||
//     category?.name ||
//     "Spanco";
//   const heroText = labCategory
//     ? `Discover our specialized lab equipment for ${labCategory.name}`
//     : `Discover our best products of ${
//         category?.name || "Spanco"
//       } from top quality.`;

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-20 h-20 bg-gradient-to-r from-[#703233] to-[#973E42] rounded-full mb-4 animate-bounce"></div>
//           <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//             Loading Spanco Products...
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
//               {category.name}{" "}
//               <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
//                 {labCategory ? "Lab" : ""}
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               {heroText}
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
//             <img
//               src={randomHeroImage}
//               alt="Category Hero Image"
//               className="w-full h-[20rem] object-cover rounded-2xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Main Content & Sidebar Container */}
//       <div className="flex relative">
//         {/* Sidebar Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="fixed top-1/2 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
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
//               className="w-full h-screen overflow-y-auto md:w-[30%] lg:w-[25%] xl:w-[20%] py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 fixed md:relative z-20"
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

//                   {/* All Products Button */}
//                   <button
//                     onClick={() => navigate(`/category/${categoryId}`)}
//                     className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
//                       !subcategoryId && !labCategoryId
//                         ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//                     }`}
//                   >
//                     All Products
//                   </button>

//                   {/* Subcategories with Nested Lab Categories */}
//                   {subcategories.map((sub) => (
//                     <div key={sub._id} className="mb-4">
//                       <button
//                         onClick={() => handleSubcategoryClick(sub._id)}
//                         className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 w-full text-left ${
//                           subcategoryId === sub._id
//                             ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                             : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//                         }`}
//                       >
//                         {sub.name}
//                       </button>

//                       {subcategoryId === sub._id &&
//                         labCategories.length > 0 && (
//                           <div className="ml-4 mt-2 space-y-2">
//                             {labCategories.map((lab) => (
//                               <button
//                                 key={lab._id}
//                                 onClick={() => handleLabCategoryClick(lab._id)}
//                                 className={`px-6 py-2 rounded-md text-sm transition-all duration-200 w-full text-left ${
//                                   labCategoryId === lab._id
//                                     ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
//                                     : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
//                                 }`}
//                               >
//                                 {lab.name}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>

//         {/* Main Products Grid */}
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
//           <section className="py-20">
//             <div className="container mx-auto px-4">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//                   {pageTitle} Products
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
//                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {currentProducts.map((product) => (
//                       <motion.div
//                         key={product._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
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
//                             className="w-full h-[10rem] object-contain group-hover:scale-110 transition-transform duration-500"
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
//                         <div className="p-4">
//                           <div className="flex items-center justify-between mb-1">
//                             <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                               {product.name}
//                             </h3>
//                             <div className="flex items-center space-x-1">
//                               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                               <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 {product.rating || "4.5"}
//                               </span>
//                             </div>
//                           </div>
//                           <p className="text-gray-600 text-sm dark:text-gray-400 mb-4 line-clamp-2">
//                             {product.description}
//                           </p>
//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center justify-between mb-4">
//                               <span className="text-sm text-gray-500 dark:text-gray-400">
//                                 Code: {product.PCode}
//                               </span>
//                             </div>
//                             <div className="flex space-x-3">
//                               <button
//                                 onClick={() => openModal(product)}
//                                 className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
//                               >
//                                 <Info className="w-4 h-4" />
//                                 <span className="text-[0.8rem]">
//                                   View Details
//                                 </span>
//                               </button>
//                             </div>
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
//         </motion.div>
//       </div>

//       {/* Product Modal */}
//       <AnimatePresence>
//         {selectedProduct && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onClick={closeModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//                 </button>

//                 <div className="grid md:grid-cols-2 gap-8 p-8">
//                   <div className="space-y-4">
//                     <img
//                       src={
//                         selectedProduct.image &&
//                         selectedProduct.image.length > 0
//                           ? selectedProduct.image[0]
//                           : "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
//                       }
//                       alt={selectedProduct.name}
//                       className="w-full h-80 object-cover rounded-xl"
//                     />
//                     <div className="grid grid-cols-3 gap-4">
//                       {selectedProduct.image &&
//                         selectedProduct.image
//                           .slice(0, 3)
//                           .map((img, index) => (
//                             <img
//                               key={index}
//                               src={img}
//                               alt={`${selectedProduct.name} ${index + 1}`}
//                               className="w-full h-24 object-cover rounded-lg"
//                             />
//                           ))}
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                         {selectedProduct.name}
//                       </h2>
//                       <div className="flex items-center space-x-2 mb-4">
//                         <div className="flex items-center space-x-1">
//                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                           <span className="text-gray-600 dark:text-gray-400">
//                             {selectedProduct.rating || "4.5"}
//                           </span>
//                         </div>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-gray-500 dark:text-gray-400">
//                           Code: {selectedProduct.PCode}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                       {selectedProduct.description}
//                     </p>

//                     <div className="space-y-4">
//                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                         Specifications
//                       </h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             Category
//                           </p>
//                           <p className="text-gray-900 dark:text-white">
//                             {category?.name || "N/A"}
//                           </p>
//                         </div>
//                         {labCategory && (
//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               Lab Category
//                             </p>
//                             <p className="text-gray-900 dark:text-white">
//                               {labCategory?.name || "N/A"}
//                             </p>
//                           </div>
//                         )}
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             Material
//                           </p>
//                           <p className="text-gray-900 dark:text-white">
//                             {selectedProduct.material || "N/A"}
//                           </p>
//                         </div>
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             Dimensions
//                           </p>
//                           <p className="text-gray-900 dark:text-white">
//                             {selectedProduct.dimensions || "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
//                       <button className="w-full bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-4 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold">
//                         Request Quote
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Eye,
  Info,
  X,
  ChevronLeft,
  Menu,
  User,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Hero Images for different categories
const heroImages = {
  Engineering: [
    "https://damassets.autodesk.net/content/dam/autodesk/draftr/23696/what-is-industrial-engineering-1172x660.jpg",
  ],
  School: [
    "https://designcollaborative.com/wp-content/uploads/2024/02/11.16.22_066-scaled.webp",
  ],
  "Higher Education": [
    "https://www.shutterstock.com/image-photo/empty-science-classroom-college-education-600nw-2528928597.jpg",
  ],
  "Skill Development": [
    "https://havells.com/media/wysiwyg/skill-development.png",
  ],
  Furniture: [
    "https://images.pexels.com/photos/2797607/pexels-photo-2797607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  default: [
    "https://havells.com/media/wysiwyg/skill-development.png",
    "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
};

// ---

// ContactUsModal component
const ContactUsModal = ({ isOpen, onClose, selectedProduct }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        subject: `Quotation request for: ${selectedProduct.name} (${selectedProduct.PCode})`,
      }));
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        "service_u4c0bqh",
        "template_yimbmm3",
        formRef.current,
        "bMQ3rwQAwD04bqKMz"
      )
      .then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
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
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsSubmitting(false);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Mail className="w-6 h-6 text-[#703233]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Request a Quote
                  </h2>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  aria-label="Close contact form"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thank you for your request. We'll get back to you shortly.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-400 font-semibold">
                      Reference: #C{Date.now().toString().slice(-6)}
                    </p>
                    <p className="text-green-600 dark:text-green-500 text-sm mt-1">
                      Keep this reference for follow-up.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#703233] to-[#973E42] p-4 rounded-lg text-white mb-6"
                  >
                    <h3 className="font-bold mb-2">How we help</h3>
                    <p className="text-sm">
                      Please fill out the form for a quotation, and we'll
                      respond within 24 hours.
                    </p>
                  </motion.div>
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          Full Name *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#973E42] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email Address *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#973E42] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#973E42] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#973E42] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Write your message..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#973E42] bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        required
                      ></motion.textarea>
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        type="button"
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-3 rounded-lg hover:shadow-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---

// ViewDetailsModal component for product details
const ViewDetailsModal = ({
  isOpen,
  onClose,
  product,
  category,
  labCategory,
  openContactModal,
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
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
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-4">
                  <img
                    src={
                      product.image?.[0] ||
                      "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {product.image?.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {product.rating || "4.5"}
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Code: {product.PCode}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description}
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
                      {labCategory && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Lab Category
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {labCategory?.name || "N/A"}
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Material
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {product.material || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dimensions
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {product.dimensions || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        onClose();
                        openContactModal(product);
                      }}
                      className="w-full bg-gradient-to-r from-[#703233] to-[#973E42] text-white py-4 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Request Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---

// Main ProductShowPage Component
export default function ProductShowPage() {
  const { categoryId, subcategoryId, labCategoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [labCategory, setLabCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [labCategories, setLabCategories] = useState([]);
  const [randomHeroImage, setRandomHeroImage] = useState("");
  const productsPerPage = 14;

  // Fetch navigation data and products
  useEffect(() => {
    // Fetch Category details
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URI}/categories/${categoryId}`
          );
          const data = await res.json();
          setCategory(data);
        } catch (err) {
          console.error("Error fetching category:", err);
        }
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (categoryId) {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URI
            }/subcategories/category/${categoryId}`
          );
          const data = await res.json();
          setSubcategories(data);
        } catch (err) {
          console.error("Error fetching subcategories:", err);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [categoryId]);

  // Fetch lab categories
  useEffect(() => {
    const fetchLabCategories = async () => {
      if (subcategoryId) {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URI
            }/labcategories/subcategory/${subcategoryId}`
          );
          const data = await res.json();
          setLabCategories(data);
        } catch (err) {
          console.error("Error fetching lab categories:", err);
        }
      } else {
        setLabCategories([]);
      }
    };
    fetchLabCategories();
  }, [subcategoryId]);

  // Fetch lab category details
  useEffect(() => {
    const fetchLabCategoryDetails = async () => {
      if (labCategoryId) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URI}/labcategories/${labCategoryId}`
          );
          const data = await res.json();
          setLabCategory(data);
        } catch (err) {
          console.error("Error fetching lab category:", err);
        }
      } else {
        setLabCategory(null);
      }
    };
    fetchLabCategoryDetails();
  }, [labCategoryId]);

  // Combined fetch logic for products
  useEffect(() => {
    setIsLoading(true);
    let url = "";
    if (labCategoryId) {
      url = `${
        import.meta.env.VITE_BACKEND_URI
      }/products/labcategory/${labCategoryId}`;
    } else if (subcategoryId) {
      url = `${
        import.meta.env.VITE_BACKEND_URI
      }/products/subcategory/${subcategoryId}`;
    } else if (categoryId) {
      url = `${
        import.meta.env.VITE_BACKEND_URI
      }/products/category/${categoryId}`;
    } else {
      url = `${import.meta.env.VITE_BACKEND_URI}/products`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.success ? data.data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setIsLoading(false);
      });
  }, [categoryId, subcategoryId, labCategoryId]);

  // Set random hero image based on category
  useEffect(() => {
    if (category?.name) {
      const images = heroImages[category.name] || heroImages.default;
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomHeroImage(images[randomIndex]);
    } else {
      const defaultImages = heroImages.default;
      const randomIndex = Math.floor(Math.random() * defaultImages.length);
      setRandomHeroImage(defaultImages[randomIndex]);
    }
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subcategoryId, labCategoryId]);

  // Product modal functions
  const openProductModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  // Contact modal functions
  const openContactModal = (product) => {
    setSelectedProduct(product);
    setIsContactModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedProduct(null); // Clear selected product when closing
    document.body.style.overflow = "auto";
  };

  // Filter and paginate products
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.PCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const pageTitle =
    labCategory?.name ||
    subcategories.find((sub) => sub._id === subcategoryId)?.name ||
    category?.name ||
    "Spanco";
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
              {category?.name}{" "}
              <span className="bg-gradient-to-r from-[#703233] to-[#973E42] bg-clip-text text-transparent">
                {labCategory ? "Lab" : ""}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {heroText}
            </p>
          </div>
          <div className="max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
            <img
              src={randomHeroImage}
              alt="Category Hero Image"
              className="w-full h-[20rem] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Container */}
      <div className="flex relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-1/2 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
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
              className="w-full h-screen overflow-y-auto md:w-[30%] lg:w-[25%] xl:w-[20%] py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 fixed md:relative z-20"
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
                    onClick={() => navigate(`/category/${categoryId}`)}
                    className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
                      !subcategoryId && !labCategoryId
                        ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Products
                  </button>
                  {subcategories.map((sub) => (
                    <div key={sub._id} className="mb-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/category/${categoryId}/subcategory/${sub._id}`
                          )
                        }
                        className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 w-full text-left ${
                          subcategoryId === sub._id
                            ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        {sub.name}
                      </button>
                      {subcategoryId === sub._id &&
                        labCategories.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {labCategories.map((lab) => (
                              <button
                                key={lab._id}
                                onClick={() =>
                                  navigate(
                                    `/category/${categoryId}/subcategory/${subcategoryId}/labcategory/${lab._id}`
                                  )
                                }
                                className={`px-6 py-2 rounded-md text-sm transition-all duration-200 w-full text-left ${
                                  labCategoryId === lab._id
                                    ? "bg-gradient-to-r from-[#703233] to-[#973E42] text-white shadow-lg"
                                    : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
                                }`}
                              >
                                {lab.name}
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

        {/* Main Products Grid */}
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
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {pageTitle} Products
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
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2"
                      >
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              product.image?.[0] ||
                              "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600"
                            }
                            alt={product.name}
                            className="w-full h-[10rem] object-contain group-hover:scale-110 transition-transform duration-500"
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
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {product.rating || "4.5"}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm dark:text-gray-400 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Code: {product.PCode}
                              </span>
                            </div>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => openProductModal(product)}
                                className="flex-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                              >
                                <Info className="w-4 h-4" />
                                <span className="text-[0.8rem]">Details</span>
                              </button>
                              <button
                                onClick={() => openContactModal(product)}
                                className="flex-1 bg-gradient-to-r from-[#703233] to-[#973E42] text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                              >
                                <Mail className="w-4 h-4" />
                                <span className="text-[0.8rem]">Quote</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

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

      {/* Product Details Modal */}
      <ViewDetailsModal
        isOpen={!!selectedProduct && !isContactModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        category={category}
        labCategory={labCategory}
        openContactModal={openContactModal}
      />

      {/* Contact Form Modal */}
      <ContactUsModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}
