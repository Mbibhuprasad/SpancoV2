
// import React, { useEffect, useState } from "react";

// // FIX: Replace VITE_BACKEND_URI with a static constant to resolve compilation issues.
// // NOTE: You must replace "https://your-backend-api-uri" with your actual backend base URL.
// const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

// export default function AdminPanel() {
//   const [activeTab, setActiveTab] = useState("addProduct");
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [labCategories, setLabCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);

//   // NEW: State for Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [paginationMeta, setPaginationMeta] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalProducts: 0,
//     hasNextPage: false,
//     hasPrevPage: false,
//   });
//   // State to manage the product being edited
//   const [editingProduct, setEditingProduct] = useState(null);

//   const [categoryForm, setCategoryForm] = useState({
//     name: "",
//     description: "",
//     image: null,
//   });
//   const [subcategoryForm, setSubcategoryForm] = useState({
//     name: "",
//     description: "",
//     parentCategories: "",
//   });
//   const [labCategoryForm, setLabCategoryForm] = useState({
//     name: "",
//     description: "",
//     parentSubcategory: "",
//     category: "",
//   });
//   const [productForm, setProductForm] = useState({
//     name: "",
//     description: "",
//     PCode: "",
//     category: "",
//     subCategory: "",
//     labCategory: "",
//     image: null,
//     technicalSpecification: Array.from({ length: 3 }, () =>
//       Array.from({ length: 1 }, () => ({ label: "", value: "" }))
//     ),
//   });

//   const token = localStorage.getItem("adminToken");

//   // Fetch static lists (Categories, Subcategories, LabCategories) once
//   useEffect(() => {
//     fetchCategories();
//     fetchSubcategories();
//     fetchLabCategories();
//   }, []);

//   const fetchCategories = () => {
//     fetch(`${BACKEND_URI}/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//       });
//   };

//   const fetchSubcategories = () => {
//     fetch(`${BACKEND_URI}/subcategories`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSubcategories(data);
//       });
//   };

//   const fetchLabCategories = () => {
//     fetch(`${BACKEND_URI}/labcategories`)
//       .then((res) => res.json())
//       .then((data) => setLabCategories(data));
//   };

//   // UPDATED: Fetch products with pagination (limit=10)
//   const fetchProducts = () => {
//     // Clear product list to show loading state implicitly
//     setProducts([]);
//     fetch(`${BACKEND_URI}/products?page=${currentPage}&limit=10`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.data || []);
//         // Set pagination meta
//         if (data.pagination) {
//           setPaginationMeta(data.pagination);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products:", err);
//       });
//   };

//   // NEW: Effect to fetch products when the current page changes or when switching to 'viewData' tab
//   useEffect(() => {
//     if (activeTab === "viewData") {
//       fetchProducts();
//     }
//   }, [currentPage, activeTab]);

//   // Filter subcategories when category changes in lab category form
//   useEffect(() => {
//     if (labCategoryForm.category) {
//       const filtered = subcategories.filter(
//         (sub) => sub.parentCategories === labCategoryForm.category
//       );
//       setFilteredSubcategories(filtered);
//     } else {
//       setFilteredSubcategories([]);
//     }
//   }, [labCategoryForm.category, subcategories]);

//   // Fetch subcategories when category changes in product form
//   // NOTE: This logic might overwrite the general subcategories list, which is okay for the form context.
//   useEffect(() => {
//     if (productForm.category) {
//       fetch(`${BACKEND_URI}/subcategories/category/${productForm.category}`)
//         .then((res) => res.json())
//         .then((data) => setSubcategories(data));
//     }
//   }, [productForm.category]);

//   // Fetch labcategories when subcategory changes in product form
//   // NOTE: This logic might overwrite the general labcategories list, which is okay for the form context.
//   useEffect(() => {
//     if (productForm.subCategory) {
//       fetch(
//         `${BACKEND_URI}/labcategories/subcategory/${productForm.subCategory}`
//       )
//         .then((res) => res.json())
//         .then((data) => setLabCategories(data));
//     }
//   }, [productForm.subCategory]);

//   // Handle page change for pagination
//   const handlePageChange = (direction) => {
//     if (direction === "next" && paginationMeta.hasNextPage) {
//       setCurrentPage((prev) => prev + 1);
//     } else if (direction === "prev" && paginationMeta.hasPrevPage) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   // Category handlers
//   const handleCategoryChange = (e) => {
//     setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
//   };

//   const handleCategoryImageChange = (e) => {
//     setCategoryForm({ ...categoryForm, image: e.target.files[0] });
//   };

//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();

//     // Create form data for file upload
//     const formData = new FormData();
//     formData.append("name", categoryForm.name);
//     formData.append("description", categoryForm.description);
//     if (categoryForm.image) {
//       formData.append("image", categoryForm.image);
//     }

//     try {
//       const res = await fetch(`${BACKEND_URI}/categories`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const result = await res.json();
//       if (res.ok) {
//         // Use custom message component instead of alert in production
//         console.log("Category added successfully ✅");
//         alert("Category added successfully ✅");
//         setCategoryForm({ name: "", description: "", image: null });
//         fetchCategories();
//       } else {
//         // Use custom message component instead of alert in production
//         console.log(result.message || "Failed to add category ❌");
//         alert(result.message || "Failed to add category ❌");
//       }
//     } catch (err) {
//       // Use custom message component instead of alert in production
//       console.error("Error while adding category ❌", err);
//       alert("Error while adding category ❌");
//     }
//   };

//   // Subcategory handlers
//   const handleSubcategoryChange = (e) => {
//     setSubcategoryForm({ ...subcategoryForm, [e.target.name]: e.target.value });
//   };

//   const handleSubcategorySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BACKEND_URI}/subcategories`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: subcategoryForm.name,
//           description: subcategoryForm.description,
//           parentCategories: subcategoryForm.parentCategories,
//         }),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         // Use custom message component instead of alert in production
//         console.log("Subcategory added successfully ✅");
//         alert("Subcategory added successfully ✅");
//         setSubcategoryForm({ name: "", description: "", parentCategories: "" });
//         fetchSubcategories();
//       } else {
//         // Use custom message component instead of alert in production
//         console.log(result.message || "Failed to add subcategory ❌");
//         alert(result.message || "Failed to add subcategory ❌");
//       }
//     } catch (err) {
//       // Use custom message component instead of alert in production
//       console.error("Error while adding subcategory ❌", err);
//       alert("Error while adding subcategory ❌");
//     }
//   };

//   // Lab Category handlers
//   const handleLabCategoryChange = (e) => {
//     setLabCategoryForm({ ...labCategoryForm, [e.target.name]: e.target.value });
//   };

//   const handleLabCategorySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BACKEND_URI}/labcategories`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: labCategoryForm.name,
//           description: labCategoryForm.description,
//           parentSubcategory: labCategoryForm.parentSubcategory,
//         }),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         // Use custom message component instead of alert in production
//         console.log("Lab Category added successfully ✅");
//         alert("Lab Category added successfully ✅");
//         setLabCategoryForm({
//           name: "",
//           description: "",
//           parentSubcategory: "",
//           category: "",
//         });
//         fetchLabCategories();
//       } else {
//         // Use custom message component instead of alert in production
//         console.log(result.message || "Failed to add lab category ❌");
//         alert(result.message || "Failed to add lab category ❌");
//       }
//     } catch (err) {
//       // Use custom message component instead of alert in production
//       console.error("Error while adding lab category ❌", err);
//       alert("Error while adding lab category ❌");
//     }
//   };

//   // Product handlers
//   const handleProductChange = (e) => {
//     setProductForm({ ...productForm, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setProductForm({ ...productForm, image: e.target.files[0] });
//   };

//   // CORRECTED: Handle spec change for the 3x1 array structure
//   const handleSpecChange = (row, col, field, value) => {
//     const newSpecs = [...productForm.technicalSpecification];
//     // Since it's fixed at 1 column (col will always be 0), we simplify the check.
//     if (newSpecs[row] && newSpecs[row][0]) {
//       newSpecs[row][0] = {
//         ...newSpecs[row][0],
//         [field]: value,
//       };
//       setProductForm({ ...productForm, technicalSpecification: newSpecs });
//     }
//   };

//   const resetProductForm = () => {
//     setProductForm({
//       name: "",
//       description: "",
//       PCode: "",
//       category: "",
//       subCategory: "",
//       labCategory: "",
//       image: null,
//       technicalSpecification: Array.from({ length: 3 }, () =>
//         Array.from({ length: 1 }, () => ({ label: "", value: "" }))
//       ),
//     });
//     setEditingProduct(null); // Clear editing state
//   };

//   const handleProductSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", productForm.name);
//     data.append("description", productForm.description);
//     data.append("PCode", productForm.PCode);
//     data.append("categories", productForm.category); // Backend expects categories as a field, using 'categories' for consistency
//     data.append("subCategory", productForm.subCategory);
//     if (productForm.labCategory)
//       data.append("labCategory", productForm.labCategory);
//     if (productForm.image) data.append("image", productForm.image);

//     // Flatten technical specs and stringify (Backend expects JSON string in req.body for specs)
//     const technicalSpecification = productForm.technicalSpecification
//       .flat()
//       .filter((spec) => spec.label && spec.value);

//     // Append technical specs as a string to the FormData
//     data.append(
//       "technicalSpecification",
//       JSON.stringify(technicalSpecification)
//     );

//     const url = editingProduct
//       ? `${BACKEND_URI}/products/${editingProduct._id}`
//       : `${BACKEND_URI}/products`;
//     const method = editingProduct ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method: method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       const result = await res.json();
//       if (res.ok) {
//         const action = editingProduct ? "updated" : "added";
//         // Use custom message component instead of alert in production
//         console.log(`Product ${action} successfully ✅`);
//         alert(`Product ${action} successfully ✅`);
//         resetProductForm();
//         fetchProducts(); // Refresh products list
//       } else {
//         // Use custom message component instead of alert in production
//         console.log(
//           result.message ||
//             `Failed to ${editingProduct ? "update" : "add"} product ❌`
//         );
//         alert(
//           result.message ||
//             `Failed to ${editingProduct ? "update" : "add"} product ❌`
//         );
//       }
//     } catch (err) {
//       // Use custom message component instead of alert in production
//       console.error("Error during product submission:", err);
//       alert(`Error while ${editingProduct ? "updating" : "adding"} product ❌`);
//     }
//   };

//   // Handle Edit button click
//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setActiveTab("addProduct");

//     // Map technical specifications into the 3x1 form structure
//     const specsArray = product.technicalSpecification.map((spec) => ({
//       label: spec.label || "",
//       value: spec.value || "",
//     }));

//     // Pad the array to ensure 3 rows are visible in the form for editing
//     const paddedSpecs = Array.from(
//       { length: 3 },
//       (_, i) => specsArray[i] || { label: "", value: "" }
//     );

//     setProductForm({
//       name: product.name,
//       description: product.description,
//       PCode: product.PCode,
//       // Backend uses 'categories' array, extract the first one for the form selection
//       category: product.categories?.[0]?._id || "",
//       subCategory: product.subCategory?._id || "",
//       labCategory: product.labCategory?._id || "",
//       image: null, // Image must be re-uploaded or handled separately, set to null for form
//       technicalSpecification: paddedSpecs.map((spec) => [spec]),
//     });
//   };

//   // Handle Delete button click
//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const res = await fetch(`${BACKEND_URI}/products/${productId}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.ok) {
//           // Use custom message component instead of alert in production
//           console.log("Product deleted successfully ✅");
//           alert("Product deleted successfully ✅");
//           fetchProducts(); // Refresh the product list
//         } else {
//           const result = await res.json();
//           // Use custom message component instead of alert in production
//           console.log(result.message || "Failed to delete product ❌");
//           alert(result.message || "Failed to delete product ❌");
//         }
//       } catch (err) {
//         // Use custom message component instead of alert in production
//         console.error("Error while deleting product ❌", err);
//         alert("Error while deleting product ❌");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 font-sans">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">
//         <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
//           Product Catalog Admin Panel
//         </h1>

//         {/* Navigation Tabs */}
//         <div className="flex flex-wrap border-b mb-6 bg-gray-50 rounded-t-lg">
//           <button
//             className={`px-4 py-3 font-semibold transition-all duration-200 rounded-tl-lg ${
//               activeTab === "addProduct"
//                 ? "border-b-4 border-blue-600 text-blue-700 bg-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setActiveTab("addProduct")}
//           >
//             {editingProduct ? "Edit Product" : "Add Product"}
//           </button>
//           <button
//             className={`px-4 py-3 font-semibold transition-all duration-200 ${
//               activeTab === "addCategory"
//                 ? "border-b-4 border-blue-600 text-blue-700 bg-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setActiveTab("addCategory")}
//           >
//             Add Category
//           </button>
//           <button
//             className={`px-4 py-3 font-semibold transition-all duration-200 ${
//               activeTab === "addSubcategory"
//                 ? "border-b-4 border-blue-600 text-blue-700 bg-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setActiveTab("addSubcategory")}
//           >
//             Add Subcategory
//           </button>
//           <button
//             className={`px-4 py-3 font-semibold transition-all duration-200 ${
//               activeTab === "addLabCategory"
//                 ? "border-b-4 border-blue-600 text-blue-700 bg-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setActiveTab("addLabCategory")}
//           >
//             Add Lab Category
//           </button>
//           <button
//             className={`px-4 py-3 font-semibold transition-all duration-200 rounded-tr-lg ${
//               activeTab === "viewData"
//                 ? "border-b-4 border-blue-600 text-blue-700 bg-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => {
//               setActiveTab("viewData");
//               // Reset page to 1 if not already there when viewing data
//               if (currentPage !== 1) {
//                 setCurrentPage(1);
//               } else {
//                 fetchProducts(); // Manually trigger fetch if already on page 1
//               }
//             }}
//           >
//             View Products
//           </button>
//         </div>

//         {/* Add/Edit Product Form */}
//         {activeTab === "addProduct" && (
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h2 className="text-xl font-bold mb-4 text-blue-700">
//               {editingProduct ? "Edit Existing Product" : "Add New Product"}
//             </h2>
//             <form onSubmit={handleProductSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* Category Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="category"
//                     value={productForm.category}
//                     onChange={handleProductChange}
//                     className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Subcategory Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Subcategory <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="subCategory"
//                     value={productForm.subCategory}
//                     onChange={handleProductChange}
//                     className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     required
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subcategories.map((sub) => (
//                       <option key={sub._id} value={sub._id}>
//                         {sub.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Lab Category Selection (Optional) */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Lab Category
//                   </label>
//                   <select
//                     name="labCategory"
//                     value={productForm.labCategory}
//                     onChange={handleProductChange}
//                     className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                   >
//                     <option value="">Select Lab Category</option>
//                     {labCategories.map((lab) => (
//                       <option key={lab._id} value={lab._id}>
//                         {lab.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Product Code */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Product Code <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="PCode"
//                     placeholder="E.g., P001-A"
//                     value={productForm.PCode}
//                     onChange={handleProductChange}
//                     className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     required
//                   />
//                 </div>

//                 {/* Product Name */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Product Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="E.g., Digital Multimeter"
//                     value={productForm.name}
//                     onChange={handleProductChange}
//                     className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     required
//                   />
//                 </div>

//                 {/* Product Image */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Product Image (New)
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleImageChange}
//                     className="border border-gray-300 p-2 w-full rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition duration-150"
//                     accept="image/*"
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Detailed description of the product features."
//                   value={productForm.description}
//                   onChange={handleProductChange}
//                   className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                   rows="3"
//                 />
//               </div>

//               {/* Technical Specifications */}
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700">
//                   Technical Specifications (Max 3 rows)
//                 </label>
//                 <div className="overflow-x-auto shadow-inner rounded-lg">
//                   <table className="min-w-full bg-white text-sm">
//                     <tbody>
//                       {productForm.technicalSpecification.map(
//                         (row, rowIndex) => (
//                           <tr
//                             key={rowIndex}
//                             className="border-t border-gray-200"
//                           >
//                             {/* Assuming only 1 column group per row as per initial state */}
//                             {row.map((spec, colIndex) => (
//                               <td
//                                 key={colIndex}
//                                 className="p-2 border-r border-gray-200 last:border-r-0"
//                               >
//                                 <input
//                                   type="text"
//                                   placeholder="Label (e.g., Voltage)"
//                                   value={spec.label}
//                                   onChange={(e) =>
//                                     handleSpecChange(
//                                       rowIndex,
//                                       colIndex,
//                                       "label",
//                                       e.target.value
//                                     )
//                                   }
//                                   className="border border-gray-300 p-1 mb-1 w-full rounded text-sm"
//                                 />
//                                 <input
//                                   type="text"
//                                   placeholder="Value (e.g., 240V AC)"
//                                   value={spec.value}
//                                   onChange={(e) =>
//                                     handleSpecChange(
//                                       rowIndex,
//                                       colIndex,
//                                       "value",
//                                       e.target.value
//                                     )
//                                   }
//                                   className="border border-gray-300 p-1 w-full rounded text-sm"
//                                 />
//                               </td>
//                             ))}
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-4 pt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-[1.02]"
//                 >
//                   {editingProduct ? "Update Product" : "Add Product"}
//                 </button>
//                 {editingProduct && (
//                   <button
//                     type="button"
//                     onClick={resetProductForm}
//                     className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 transition duration-150 transform hover:scale-[1.02]"
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Add Category Form (omitted other forms for brevity, they remain unchanged) */}
//         {activeTab === "addCategory" && (
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h2 className="text-xl font-bold mb-4 text-blue-700">
//               Add New Category
//             </h2>
//             <form
//               onSubmit={handleCategorySubmit}
//               className="space-y-4 max-w-md"
//               encType="multipart/form-data"
//             >
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Category Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Category Name"
//                   value={categoryForm.name}
//                   onChange={handleCategoryChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Description"
//                   value={categoryForm.description}
//                   onChange={handleCategoryChange}
//                   className="border p-2 w-full rounded"
//                   rows="3"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Category Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleCategoryImageChange}
//                   className="border p-2 w-full rounded"
//                   accept="image/*"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//               >
//                 Add Category
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Add Subcategory Form */}
//         {activeTab === "addSubcategory" && (
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h2 className="text-xl font-bold mb-4 text-blue-700">
//               Add New Subcategory
//             </h2>
//             <form
//               onSubmit={handleSubcategorySubmit}
//               className="space-y-4 max-w-md"
//             >
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Category
//                 </label>
//                 <select
//                   name="parentCategories"
//                   value={subcategoryForm.parentCategories}
//                   onChange={handleSubcategoryChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Subcategory Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Subcategory Name"
//                   value={subcategoryForm.name}
//                   onChange={handleSubcategoryChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Description"
//                   value={subcategoryForm.description}
//                   onChange={handleSubcategoryChange}
//                   className="border p-2 w-full rounded"
//                   rows="3"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//               >
//                 Add Subcategory
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Add Lab Category Form */}
//         {activeTab === "addLabCategory" && (
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h2 className="text-xl font-bold mb-4 text-blue-700">
//               Add New Lab Category
//             </h2>
//             <form
//               onSubmit={handleLabCategorySubmit}
//               className="space-y-4 max-w-md"
//             >
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={labCategoryForm.category}
//                   onChange={(e) =>
//                     setLabCategoryForm({
//                       ...labCategoryForm,
//                       category: e.target.value,
//                       parentSubcategory: "",
//                     })
//                   }
//                   className="border p-2 w-full rounded"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Subcategory
//                 </label>
//                 <select
//                   name="parentSubcategory"
//                   value={labCategoryForm.parentSubcategory}
//                   onChange={handleLabCategoryChange}
//                   className="border p-2 w-full rounded"
//                   required
//                   disabled={!labCategoryForm.category}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {filteredSubcategories.map((sub) => (
//                     <option key={sub._id} value={sub._id}>
//                       {sub.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Lab Category Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Lab Category Name"
//                   value={labCategoryForm.name}
//                   onChange={handleLabCategoryChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Description"
//                   value={labCategoryForm.description}
//                   onChange={handleLabCategoryChange}
//                   className="border p-2 w-full rounded"
//                   rows="3"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//               >
//                 Add Lab Category
//               </button>
//             </form>
//           </div>
//         )}

//         {/* View Data Section with Pagination & Actions */}
//         {activeTab === "viewData" && (
//           <div className="p-4 border border-gray-200 rounded-lg">
//             <h2 className="text-xl font-bold mb-4 text-blue-700">View Data</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//               <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold mb-2">
//                   Categories ({categories?.length})
//                 </h3>
//                 <ul className="space-y-1 max-h-40 overflow-y-auto">
//                   {categories.map((cat) => (
//                     <li key={cat._id} className="text-sm text-gray-700">
//                       {cat.name}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold mb-2">
//                   Subcategories ({subcategories?.length})
//                 </h3>
//                 <ul className="space-y-1 max-h-40 overflow-y-auto">
//                   {subcategories?.map((sub) => (
//                     <li key={sub._id} className="text-sm text-gray-700">
//                       {sub.name}{" "}
//                       <span className="text-gray-500 text-xs">
//                         (
//                         {
//                           categories.find((c) => c._id === sub.parentCategories)
//                             ?.name
//                         }
//                         )
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold mb-2">
//                   Lab Categories ({labCategories?.length})
//                 </h3>
//                 <ul className="space-y-1 max-h-40 overflow-y-auto">
//                   {labCategories.map((lab) => (
//                     <li key={lab._id} className="text-sm text-gray-700">
//                       {lab.name}{" "}
//                       <span className="text-gray-500 text-xs">
//                         (
//                         {
//                           subcategories.find(
//                             (s) => s._id === lab.parentSubcategory
//                           )?.name
//                         }
//                         )
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Products Table */}
//             <div className="bg-gray-50 p-4 rounded-lg md:col-span-3 border border-gray-200 shadow-md">
//               <h3 className="font-semibold mb-2 text-lg text-gray-800">
//                 Products (Page {paginationMeta.currentPage} of{" "}
//                 {paginationMeta.totalPages} | {paginationMeta.totalProducts}{" "}
//                 Total)
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded-lg border border-gray-300">
//                   <thead className="bg-blue-100">
//                     <tr className="text-left text-sm font-medium text-blue-700">
//                       <th className="py-2 px-4 border-b border-gray-300">
//                         Name
//                       </th>
//                       <th className="py-2 px-4 border-b border-gray-300">
//                         Code
//                       </th>
//                       <th className="py-2 px-4 border-b border-gray-300">
//                         Category
//                       </th>
//                       <th className="py-2 px-4 border-b border-gray-300">
//                         Subcategory
//                       </th>
//                       <th className="py-2 px-4 border-b border-gray-300 w-32 text-center">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products && products.length > 0 ? (
//                       products.map((product) => (
//                         <tr
//                           key={product._id}
//                           className="hover:bg-gray-50 transition duration-100"
//                         >
//                           <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
//                             {product.name}
//                           </td>
//                           <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
//                             {product.PCode}
//                           </td>
//                           <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
//                             {product.categories?.map((c) => c.name).join(", ")}
//                           </td>
//                           <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
//                             {product.subCategory?.name}
//                           </td>
//                           <td className="py-2 px-4 border-b border-gray-200 flex space-x-2 justify-center">
//                             <button
//                               onClick={() => handleEditProduct(product)}
//                               className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-yellow-600 transition duration-150 shadow-sm"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteProduct(product._id)}
//                               className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-600 transition duration-150 shadow-sm"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="py-4 text-center text-gray-500"
//                         >
//                           {products === null
//                             ? "Loading products..."
//                             : "No products found."}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => handlePageChange("prev")}
//                   disabled={!paginationMeta.hasPrevPage}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md ${
//                     paginationMeta.hasPrevPage
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   &larr; Previous
//                 </button>
//                 <span className="text-sm font-medium text-gray-700">
//                   Showing Page {paginationMeta.currentPage} of{" "}
//                   {paginationMeta.totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange("next")}
//                   disabled={!paginationMeta.hasNextPage}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md ${
//                     paginationMeta.hasNextPage
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   Next &rarr;
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

// FIX: Replace VITE_BACKEND_URI with a static constant to resolve compilation issues.
// NOTE: You must replace "https://your-backend-api-uri" with your actual backend base URL.
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("addProduct");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [labCategories, setLabCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // NEW: State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  // State to manage the product being edited
  const [editingProduct, setEditingProduct] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    description: "",
    parentCategories: "",
  });
  const [labCategoryForm, setLabCategoryForm] = useState({
    name: "",
    description: "",
    parentSubcategory: "",
    category: "",
  });
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    PCode: "",
    category: "",
    subCategory: "",
    labCategory: "",
    image: null,
    technicalSpecification: Array.from({ length: 3 }, () =>
      Array.from({ length: 1 }, () => ({ label: "", value: "" }))
    ),
  });

  const token = localStorage.getItem("adminToken");

  // NEW: Logout function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      // Redirect to login page or home page
      window.location.href = "/login"; // Change this to your login route
    }
  };

  // Fetch static lists (Categories, Subcategories, LabCategories) once
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchLabCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${BACKEND_URI}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const fetchSubcategories = () => {
    fetch(`${BACKEND_URI}/subcategories`)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data);
      });
  };

  const fetchLabCategories = () => {
    fetch(`${BACKEND_URI}/labcategories`)
      .then((res) => res.json())
      .then((data) => setLabCategories(data));
  };

  // UPDATED: Fetch products with pagination (limit=10)
  const fetchProducts = () => {
    // Clear product list to show loading state implicitly
    setProducts([]);
    fetch(`${BACKEND_URI}/products?page=${currentPage}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        // Set pagination meta
        if (data.pagination) {
          setPaginationMeta(data.pagination);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  };

  // NEW: Effect to fetch products when the current page changes or when switching to 'viewData' tab
  useEffect(() => {
    if (activeTab === "viewData") {
      fetchProducts();
    }
  }, [currentPage, activeTab]);

  // Filter subcategories when category changes in lab category form
  useEffect(() => {
    if (labCategoryForm.category) {
      const filtered = subcategories.filter(
        (sub) => sub.parentCategories === labCategoryForm.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [labCategoryForm.category, subcategories]);

  // Fetch subcategories when category changes in product form
  // NOTE: This logic might overwrite the general subcategories list, which is okay for the form context.
  useEffect(() => {
    if (productForm.category) {
      fetch(`${BACKEND_URI}/subcategories/category/${productForm.category}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [productForm.category]);

  // Fetch labcategories when subcategory changes in product form
  // NOTE: This logic might overwrite the general labcategories list, which is okay for the form context.
  useEffect(() => {
    if (productForm.subCategory) {
      fetch(
        `${BACKEND_URI}/labcategories/subcategory/${productForm.subCategory}`
      )
        .then((res) => res.json())
        .then((data) => setLabCategories(data));
    }
  }, [productForm.subCategory]);

  // Handle page change for pagination
  const handlePageChange = (direction) => {
    if (direction === "next" && paginationMeta.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && paginationMeta.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Category handlers
  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleCategoryImageChange = (e) => {
    setCategoryForm({ ...categoryForm, image: e.target.files[0] });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    // Create form data for file upload
    const formData = new FormData();
    formData.append("name", categoryForm.name);
    formData.append("description", categoryForm.description);
    if (categoryForm.image) {
      formData.append("image", categoryForm.image);
    }

    try {
      const res = await fetch(`${BACKEND_URI}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        // Use custom message component instead of alert in production
        console.log("Category added successfully ✅");
        alert("Category added successfully ✅");
        setCategoryForm({ name: "", description: "", image: null });
        fetchCategories();
      } else {
        // Use custom message component instead of alert in production
        console.log(result.message || "Failed to add category ❌");
        alert(result.message || "Failed to add category ❌");
      }
    } catch (err) {
      // Use custom message component instead of alert in production
      console.error("Error while adding category ❌", err);
      alert("Error while adding category ❌");
    }
  };

  // Subcategory handlers
  const handleSubcategoryChange = (e) => {
    setSubcategoryForm({ ...subcategoryForm, [e.target.name]: e.target.value });
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URI}/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: subcategoryForm.name,
          description: subcategoryForm.description,
          parentCategories: subcategoryForm.parentCategories,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        // Use custom message component instead of alert in production
        console.log("Subcategory added successfully ✅");
        alert("Subcategory added successfully ✅");
        setSubcategoryForm({ name: "", description: "", parentCategories: "" });
        fetchSubcategories();
      } else {
        // Use custom message component instead of alert in production
        console.log(result.message || "Failed to add subcategory ❌");
        alert(result.message || "Failed to add subcategory ❌");
      }
    } catch (err) {
      // Use custom message component instead of alert in production
      console.error("Error while adding subcategory ❌", err);
      alert("Error while adding subcategory ❌");
    }
  };

  // Lab Category handlers
  const handleLabCategoryChange = (e) => {
    setLabCategoryForm({ ...labCategoryForm, [e.target.name]: e.target.value });
  };

  const handleLabCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URI}/labcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: labCategoryForm.name,
          description: labCategoryForm.description,
          parentSubcategory: labCategoryForm.parentSubcategory,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        // Use custom message component instead of alert in production
        console.log("Lab Category added successfully ✅");
        alert("Lab Category added successfully ✅");
        setLabCategoryForm({
          name: "",
          description: "",
          parentSubcategory: "",
          category: "",
        });
        fetchLabCategories();
      } else {
        // Use custom message component instead of alert in production
        console.log(result.message || "Failed to add lab category ❌");
        alert(result.message || "Failed to add lab category ❌");
      }
    } catch (err) {
      // Use custom message component instead of alert in production
      console.error("Error while adding lab category ❌", err);
      alert("Error while adding lab category ❌");
    }
  };

  // Product handlers
  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductForm({ ...productForm, image: e.target.files[0] });
  };

  // CORRECTED: Handle spec change for the 3x1 array structure
  const handleSpecChange = (row, col, field, value) => {
    const newSpecs = [...productForm.technicalSpecification];
    // Since it's fixed at 1 column (col will always be 0), we simplify the check.
    if (newSpecs[row] && newSpecs[row][0]) {
      newSpecs[row][0] = {
        ...newSpecs[row][0],
        [field]: value,
      };
      setProductForm({ ...productForm, technicalSpecification: newSpecs });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      PCode: "",
      category: "",
      subCategory: "",
      labCategory: "",
      image: null,
      technicalSpecification: Array.from({ length: 3 }, () =>
        Array.from({ length: 1 }, () => ({ label: "", value: "" }))
      ),
    });
    setEditingProduct(null); // Clear editing state
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", productForm.name);
    data.append("description", productForm.description);
    data.append("PCode", productForm.PCode);
    data.append("categories", productForm.category); // Backend expects categories as a field, using 'categories' for consistency
    data.append("subCategory", productForm.subCategory);
    if (productForm.labCategory)
      data.append("labCategory", productForm.labCategory);
    if (productForm.image) data.append("image", productForm.image);

    // Flatten technical specs and stringify (Backend expects JSON string in req.body for specs)
    const technicalSpecification = productForm.technicalSpecification
      .flat()
      .filter((spec) => spec.label && spec.value);

    // Append technical specs as a string to the FormData
    data.append(
      "technicalSpecification",
      JSON.stringify(technicalSpecification)
    );

    const url = editingProduct
      ? `${BACKEND_URI}/products/${editingProduct._id}`
      : `${BACKEND_URI}/products`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        const action = editingProduct ? "updated" : "added";
        // Use custom message component instead of alert in production
        console.log(`Product ${action} successfully ✅`);
        alert(`Product ${action} successfully ✅`);
        resetProductForm();
        fetchProducts(); // Refresh products list
      } else {
        // Use custom message component instead of alert in production
        console.log(
          result.message ||
            `Failed to ${editingProduct ? "update" : "add"} product ❌`
        );
        alert(
          result.message ||
            `Failed to ${editingProduct ? "update" : "add"} product ❌`
        );
      }
    } catch (err) {
      // Use custom message component instead of alert in production
      console.error("Error during product submission:", err);
      alert(`Error while ${editingProduct ? "updating" : "adding"} product ❌`);
    }
  };

  // Handle Edit button click
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("addProduct");

    // Map technical specifications into the 3x1 form structure
    const specsArray = product.technicalSpecification.map((spec) => ({
      label: spec.label || "",
      value: spec.value || "",
    }));

    // Pad the array to ensure 3 rows are visible in the form for editing
    const paddedSpecs = Array.from(
      { length: 3 },
      (_, i) => specsArray[i] || { label: "", value: "" }
    );

    setProductForm({
      name: product.name,
      description: product.description,
      PCode: product.PCode,
      // Backend uses 'categories' array, extract the first one for the form selection
      category: product.categories?.[0]?._id || "",
      subCategory: product.subCategory?._id || "",
      labCategory: product.labCategory?._id || "",
      image: null, // Image must be re-uploaded or handled separately, set to null for form
      technicalSpecification: paddedSpecs.map((spec) => [spec]),
    });
  };

  // Handle Delete button click
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`${BACKEND_URI}/products/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // Use custom message component instead of alert in production
          console.log("Product deleted successfully ✅");
          alert("Product deleted successfully ✅");
          fetchProducts(); // Refresh the product list
        } else {
          const result = await res.json();
          // Use custom message component instead of alert in production
          console.log(result.message || "Failed to delete product ❌");
          alert(result.message || "Failed to delete product ❌");
        }
      } catch (err) {
        // Use custom message component instead of alert in production
        console.error("Error while deleting product ❌", err);
        alert("Error while deleting product ❌");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        {/* Header with title and logout button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800">
            Product Catalog Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-150 transform hover:scale-[1.02] flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b mb-6 bg-gray-50 rounded-t-lg">
          <button
            className={`px-4 py-3 font-semibold transition-all duration-200 rounded-tl-lg ${
              activeTab === "addProduct"
                ? "border-b-4 border-blue-600 text-blue-700 bg-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("addProduct")}
          >
            {editingProduct ? "Edit Product" : "Add Product"}
          </button>
          <button
            className={`px-4 py-3 font-semibold transition-all duration-200 ${
              activeTab === "addCategory"
                ? "border-b-4 border-blue-600 text-blue-700 bg-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("addCategory")}
          >
            Add Category
          </button>
          <button
            className={`px-4 py-3 font-semibold transition-all duration-200 ${
              activeTab === "addSubcategory"
                ? "border-b-4 border-blue-600 text-blue-700 bg-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("addSubcategory")}
          >
            Add Subcategory
          </button>
          <button
            className={`px-4 py-3 font-semibold transition-all duration-200 ${
              activeTab === "addLabCategory"
                ? "border-b-4 border-blue-600 text-blue-700 bg-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("addLabCategory")}
          >
            Add Lab Category
          </button>
          <button
            className={`px-4 py-3 font-semibold transition-all duration-200 rounded-tr-lg ${
              activeTab === "viewData"
                ? "border-b-4 border-blue-600 text-blue-700 bg-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("viewData");
              // Reset page to 1 if not already there when viewing data
              if (currentPage !== 1) {
                setCurrentPage(1);
              } else {
                fetchProducts(); // Manually trigger fetch if already on page 1
              }
            }}
          >
            View Products
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {activeTab === "addProduct" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              {editingProduct ? "Edit Existing Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subCategory"
                    value={productForm.subCategory}
                    onChange={handleProductChange}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lab Category Selection (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Lab Category
                  </label>
                  <select
                    name="labCategory"
                    value={productForm.labCategory}
                    onChange={handleProductChange}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  >
                    <option value="">Select Lab Category</option>
                    {labCategories.map((lab) => (
                      <option key={lab._id} value={lab._id}>
                        {lab.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Code */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Product Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="PCode"
                    placeholder="E.g., P001-A"
                    value={productForm.PCode}
                    onChange={handleProductChange}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="E.g., Digital Multimeter"
                    value={productForm.name}
                    onChange={handleProductChange}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>

                {/* Product Image */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Product Image (New)
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="border border-gray-300 p-2 w-full rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition duration-150"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed description of the product features."
                  value={productForm.description}
                  onChange={handleProductChange}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  rows="3"
                />
              </div>

              {/* Technical Specifications */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Technical Specifications (Max 3 rows)
                </label>
                <div className="overflow-x-auto shadow-inner rounded-lg">
                  <table className="min-w-full bg-white text-sm">
                    <tbody>
                      {productForm.technicalSpecification.map(
                        (row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t border-gray-200"
                          >
                            {/* Assuming only 1 column group per row as per initial state */}
                            {row.map((spec, colIndex) => (
                              <td
                                key={colIndex}
                                className="p-2 border-r border-gray-200 last:border-r-0"
                              >
                                <input
                                  type="text"
                                  placeholder="Label (e.g., Voltage)"
                                  value={spec.label}
                                  onChange={(e) =>
                                    handleSpecChange(
                                      rowIndex,
                                      colIndex,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  className="border border-gray-300 p-1 mb-1 w-full rounded text-sm"
                                />
                                <input
                                  type="text"
                                  placeholder="Value (e.g., 240V AC)"
                                  value={spec.value}
                                  onChange={(e) =>
                                    handleSpecChange(
                                      rowIndex,
                                      colIndex,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="border border-gray-300 p-1 w-full rounded text-sm"
                                />
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-[1.02]"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 transition duration-150 transform hover:scale-[1.02]"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Add Category Form (omitted other forms for brevity, they remain unchanged) */}
        {activeTab === "addCategory" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Add New Category
            </h2>
            <form
              onSubmit={handleCategorySubmit}
              className="space-y-4 max-w-md"
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  className="border p-2 w-full rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleCategoryImageChange}
                  className="border p-2 w-full rounded"
                  accept="image/*"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Category
              </button>
            </form>
          </div>
        )}

        {/* Add Subcategory Form */}
        {activeTab === "addSubcategory" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Add New Subcategory
            </h2>
            <form
              onSubmit={handleSubcategorySubmit}
              className="space-y-4 max-w-md"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="parentCategories"
                  value={subcategoryForm.parentCategories}
                  onChange={handleSubcategoryChange}
                  className="border p-2 w-full rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subcategory Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Subcategory Name"
                  value={subcategoryForm.name}
                  onChange={handleSubcategoryChange}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={subcategoryForm.description}
                  onChange={handleSubcategoryChange}
                  className="border p-2 w-full rounded"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Subcategory
              </button>
            </form>
          </div>
        )}

        {/* Add Lab Category Form */}
        {activeTab === "addLabCategory" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Add New Lab Category
            </h2>
            <form
              onSubmit={handleLabCategorySubmit}
              className="space-y-4 max-w-md"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={labCategoryForm.category}
                  onChange={(e) =>
                    setLabCategoryForm({
                      ...labCategoryForm,
                      category: e.target.value,
                      parentSubcategory: "",
                    })
                  }
                  className="border p-2 w-full rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subcategory
                </label>
                <select
                  name="parentSubcategory"
                  value={labCategoryForm.parentSubcategory}
                  onChange={handleLabCategoryChange}
                  className="border p-2 w-full rounded"
                  required
                  disabled={!labCategoryForm.category}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Lab Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Lab Category Name"
                  value={labCategoryForm.name}
                  onChange={handleLabCategoryChange}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={labCategoryForm.description}
                  onChange={handleLabCategoryChange}
                  className="border p-2 w-full rounded"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Lab Category
              </button>
            </form>
          </div>
        )}

        {/* View Data Section with Pagination & Actions */}
        {activeTab === "viewData" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">View Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="font-semibold mb-2">
                  Categories ({categories?.length})
                </h3>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                  {categories.map((cat) => (
                    <li key={cat._id} className="text-sm text-gray-700">
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="font-semibold mb-2">
                  Subcategories ({subcategories?.length})
                </h3>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                  {subcategories?.map((sub) => (
                    <li key={sub._id} className="text-sm text-gray-700">
                      {sub.name}{" "}
                      <span className="text-gray-500 text-xs">
                        (
                        {
                          categories.find((c) => c._id === sub.parentCategories)
                            ?.name
                        }
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="font-semibold mb-2">
                  Lab Categories ({labCategories?.length})
                </h3>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                  {labCategories.map((lab) => (
                    <li key={lab._id} className="text-sm text-gray-700">
                      {lab.name}{" "}
                      <span className="text-gray-500 text-xs">
                        (
                        {
                          subcategories.find(
                            (s) => s._id === lab.parentSubcategory
                          )?.name
                        }
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-3 border border-gray-200 shadow-md">
              <h3 className="font-semibold mb-2 text-lg text-gray-800">
                Products (Page {paginationMeta.currentPage} of{" "}
                {paginationMeta.totalPages} | {paginationMeta.totalProducts}{" "}
                Total)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg border border-gray-300">
                  <thead className="bg-blue-100">
                    <tr className="text-left text-sm font-medium text-blue-700">
                      <th className="py-2 px-4 border-b border-gray-300">
                        Name
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Code
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Category
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Subcategory
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 w-32 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 transition duration-100"
                        >
                          <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-800">
                            {product.name}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
                            {product.PCode}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
                            {product.categories?.map((c) => c.name).join(", ")}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
                            {product.subCategory?.name}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200 flex space-x-2 justify-center">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-yellow-600 transition duration-150 shadow-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-600 transition duration-150 shadow-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-4 text-center text-gray-500"
                        >
                          {products === null
                            ? "Loading products..."
                            : "No products found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handlePageChange("prev")}
                  disabled={!paginationMeta.hasPrevPage}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md ${
                    paginationMeta.hasPrevPage
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  &larr; Previous
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Showing Page {paginationMeta.currentPage} of{" "}
                  {paginationMeta.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange("next")}
                  disabled={!paginationMeta.hasNextPage}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md ${
                    paginationMeta.hasNextPage
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
