// // import React, { createContext, useContext, useState } from "react";

// // const DataContext = createContext(undefined);

// // export const useData = () => {
// //   const context = useContext(DataContext);
// //   if (!context) {
// //     throw new Error("useData must be used within a DataProvider");
// //   }
// //   return context;
// // };

// // export const DataProvider = ({ children }) => {
// //   const [categories, setCategories] = useState([
// //     {
// //       id: "1",
// //       name: "Engineering",
// //       subcategories: [
// //         { id: "1", name: "Mechanical", categoryId: "1" },
// //         { id: "2", name: "Civil ", categoryId: "1" },
// //         { id: "3", name: "Electrical ", categoryId: "1" },
// //       ],
// //     },
// //     {
// //       id: "2",
// //       name: "Higher Education",
// //       subcategories: [
// //         { id: "4", name: "Physics", categoryId: "2" },
// //         { id: "5", name: "Biotechnology", categoryId: "2" },
// //       ],
// //     },
// //     {
// //       id: "3",
// //       name: "School",
// //       subcategories: [
// //         { id: "6", name: " ATL", categoryId: "3" },
// //         { id: "7", name: "STEM", categoryId: "3" },
// //       ],
// //     },
// //     {
// //       id: "4",
// //       name: "Skill",
// //       subcategories: [
// //         { id: "8", name: "COE", categoryId: "4" },
// //         { id: "9", name: "IDEA LAB-PCB-3D", categoryId: "4" },
// //       ],
// //     },
// //     {
// //       id: "5",
// //       name: "Furniture",
// //       subcategories: [
// //         { id: "10", name: "Lab Tables", categoryId: "5" },
// //         { id: "11", name: "Storage Solutions", categoryId: "5" },
// //       ],
// //     },
// //   ]);

// //   const [labCategories, setLabCategories] = useState([
// //     { id: "1", name: "Mechanics Thermal" },
// //     { id: "2", name: "Electricity & Magnetism Physics" },
// //     { id: "3", name: "Wave & Optics" },
// //     { id: "4", name: "Analog Systems & Application" },
// //     { id: "4", name: "Digital System" },
// //     { id: "4", name: "Element Of Modern Physics" },
// //     { id: "4", name: "Quantum Mechanics Theory Lab" },
// //     { id: "4", name: "Solid State Physics" },
// //     { id: "4", name: "Electromagnetic" },
// //   ]);
// //   const [bioCategories, setBioCategories] = useState([
// //     { id: "1", name: "Analytical" },
// //     { id: "2", name: "Heating And Cooling" },
// //     { id: "3", name: "Microscope" },
// //   ]);

// //   const [products, setProducts] = useState([
// //     {
// //       id: "1",
// //       name: "Digital Microscope",
// //       description: "High-resolution digital microscope for biological studies",
// //       price: "₹25,000",
// //       image:
// //         "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       categoryId: "3",
// //       subcategoryId: "6",
// //       labCategoryId: "3",
// //     },
// //     {
// //       id: "2",
// //       name: "Chemistry Lab Kit",
// //       description: "Complete chemistry experiment kit for schools",
// //       price: "₹15,000",
// //       image:
// //         "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       categoryId: "3",
// //       subcategoryId: "6",
// //       labCategoryId: "2",
// //     },
// //   ]);

// //   // Category CRUD operations
// //   const addCategory = (category) => {
// //     const newCategory = {
// //       ...category,
// //       id: Date.now().toString(),
// //       subcategories: [],
// //     };
// //     setCategories([...categories, newCategory]);
// //   };

// //   const updateCategory = (id, category) => {
// //     setCategories(
// //       categories.map((cat) => (cat.id === id ? { ...cat, ...category } : cat))
// //     );
// //   };

// //   const deleteCategory = (id) => {
// //     setCategories(categories.filter((cat) => cat.id !== id));
// //   };

// //   // Subcategory CRUD operations
// //   const addSubcategory = (subcategory) => {
// //     const newSubcategory = {
// //       ...subcategory,
// //       id: Date.now().toString(),
// //     };

// //     setCategories(
// //       categories.map((cat) =>
// //         cat.id === subcategory.categoryId
// //           ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
// //           : cat
// //       )
// //     );
// //   };

// //   const updateSubcategory = (id, subcategory) => {
// //     setCategories(
// //       categories.map((cat) => ({
// //         ...cat,
// //         subcategories: cat.subcategories.map((sub) =>
// //           sub.id === id ? { ...sub, ...subcategory } : sub
// //         ),
// //       }))
// //     );
// //   };

// //   const deleteSubcategory = (id) => {
// //     setCategories(
// //       categories.map((cat) => ({
// //         ...cat,
// //         subcategories: cat.subcategories.filter((sub) => sub.id !== id),
// //       }))
// //     );
// //   };

// //   // Lab Category CRUD operations
// //   const addLabCategory = (labCategory) => {
// //     const newLabCategory = {
// //       ...labCategory,
// //       id: Date.now().toString(),
// //     };
// //     setLabCategories([...labCategories, newLabCategory]);
// //   };

// //   const updateLabCategory = (id, labCategory) => {
// //     setLabCategories(
// //       labCategories.map((lab) =>
// //         lab.id === id ? { ...lab, ...labCategory } : lab
// //       )
// //     );
// //   };

// //   const deleteLabCategory = (id) => {
// //     setLabCategories(labCategories.filter((lab) => lab.id !== id));
// //   };

// //   // Product CRUD operations
// //   const addProduct = async (product) => {
// //     const res = await fetch("http://localhost:5000/api/admin/products", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(product),
// //     });
// //     const data = await res.json();
// //     setProducts((prev) => [...prev, data]);
// //   };

// //   const updateProduct = (id, product) => {
// //     setProducts(
// //       products.map((prod) => (prod.id === id ? { ...prod, ...product } : prod))
// //     );
// //   };

// //   const deleteProduct = (id) => {
// //     setProducts(products.filter((prod) => prod.id !== id));
// //   };

// //   return (
// //     <DataContext.Provider
// //       value={{
// //         categories,
// //         labCategories,
// //         bioCategories,
// //         products,
// //         addCategory,
// //         updateCategory,
// //         deleteCategory,
// //         addSubcategory,
// //         updateSubcategory,
// //         deleteSubcategory,
// //         addLabCategory,
// //         updateLabCategory,
// //         deleteLabCategory,
// //         addProduct,
// //         updateProduct,
// //         deleteProduct,
// //       }}
// //     >
// //       {children}
// //     </DataContext.Provider>
// //   );
// // };

// import React, { createContext, useContext, useEffect, useState } from "react";

// const DataContext = createContext(undefined);

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) throw new Error("useData must be inside DataProvider");
//   return context;
// };

// export const DataProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [labCategories, setLabCategories] = useState([]);
//   const [products, setProducts] = useState([]);

//   const API = "http://localhost:5000/api/admin";

//   // Fetch initial data
//   useEffect(() => {
//     fetchCategories();
//     fetchLabCategories();
//     fetchProducts();
//   }, []);

//   /* ---------- CATEGORY CRUD ---------- */
//   const fetchCategories = async () => {
//     const res = await fetch(`${API}/categories`);
//     setCategories(await res.json());
//   };

//   const addCategory = async (category) => {
//     const res = await fetch(`${API}/categories`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(category),
//     });
//     const data = await res.json();
//     setCategories((prev) => [...prev, data]);
//   };

//   const updateCategory = async (id, category) => {
//     const res = await fetch(`${API}/categories/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(category),
//     });
//     const data = await res.json();
//     setCategories((prev) => prev.map((c) => (c._id === id ? data : c)));
//   };

//   const deleteCategory = async (id) => {
//     await fetch(`${API}/categories/${id}`, { method: "DELETE" });
//     setCategories((prev) => prev.filter((c) => c._id !== id));
//   };

//   /* ---------- SUBCATEGORY ---------- */
//   const addSubcategory = async ({ categoryId, name }) => {
//     const res = await fetch(`${API}/categories/${categoryId}/subcategories`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     });
//     const data = await res.json();
//     setCategories((prev) => prev.map((c) => (c._id === categoryId ? data : c)));
//   };

//   const deleteSubcategory = async (categoryId, subId) => {
//     const res = await fetch(
//       `${API}/categories/${categoryId}/subcategories/${subId}`,
//       {
//         method: "DELETE",
//       }
//     );
//     const data = await res.json();
//     setCategories((prev) => prev.map((c) => (c._id === categoryId ? data : c)));
//   };

//   /* ---------- LAB CATEGORIES ---------- */
//   const fetchLabCategories = async () => {
//     const res = await fetch(`${API}/labCategories`);
//     setLabCategories(await res.json());
//   };

//   const addLabCategory = async (lab) => {
//     const res = await fetch(`${API}/labCategories`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(lab),
//     });
//     const data = await res.json();
//     setLabCategories((prev) => [...prev, data]);
//   };

//   const updateLabCategory = async (id, lab) => {
//     const res = await fetch(`${API}/labCategories/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(lab),
//     });
//     const data = await res.json();
//     setLabCategories((prev) => prev.map((l) => (l._id === id ? data : l)));
//   };

//   const deleteLabCategory = async (id) => {
//     await fetch(`${API}/labCategories/${id}`, { method: "DELETE" });
//     setLabCategories((prev) => prev.filter((l) => l._id !== id));
//   };

//   /* ---------- PRODUCTS ---------- */
//   const fetchProducts = async () => {
//     const res = await fetch(`${API}/products`);
//     setProducts(await res.json());
//   };

//   const addProduct = async (product) => {
//     const res = await fetch(`${API}/products`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     const data = await res.json();
//     setProducts((prev) => [...prev, data]);
//   };

//   const updateProduct = async (id, product) => {
//     const res = await fetch(`${API}/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     const data = await res.json();
//     setProducts((prev) => prev.map((p) => (p._id === id ? data : p)));
//   };

//   const deleteProduct = async (id) => {
//     await fetch(`${API}/products/${id}`, { method: "DELETE" });
//     setProducts((prev) => prev.filter((p) => p._id !== id));
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         categories,
//         labCategories,
//         products,
//         addCategory,
//         updateCategory,
//         deleteCategory,
//         addSubcategory,
//         deleteSubcategory,
//         addLabCategory,
//         updateLabCategory,
//         deleteLabCategory,
//         addProduct,
//         updateProduct,
//         deleteProduct,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };
