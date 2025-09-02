import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("addProduct");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [labCategories, setLabCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

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

  // Fetch all data
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchLabCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const fetchSubcategories = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/subcategories`)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data);
      });
  };

  const fetchLabCategories = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/labcategories`)
      .then((res) => res.json())
      .then((data) => setLabCategories(data));
  };

  const fetchProducts = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data.data", data.data);
        setProducts(data.data);
      });
  };

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
  useEffect(() => {
    if (productForm.category) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URI}/subcategories/category/${
          productForm.category
        }`
      )
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [productForm.category]);

  // Fetch labcategories when subcategory changes in product form
  useEffect(() => {
    if (productForm.subCategory) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URI}/labcategories/subcategory/${
          productForm.subCategory
        }`
      )
        .then((res) => res.json())
        .then((data) => setLabCategories(data));
    }
  }, [productForm.subCategory]);

  // Fetch product when subcategory changes in product form

  const handleViewProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/products`);
      const data = await res.json();
      setProducts(data);
      console.log(products);
    } catch (err) {
      console.error(err);
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/categories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Category added successfully ✅");
        setCategoryForm({ name: "", description: "", image: null });
        fetchCategories();
      } else {
        alert(result.message || "Failed to add category ❌");
      }
    } catch (err) {
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/subcategories`,
        {
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
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Subcategory added successfully ✅");
        setSubcategoryForm({ name: "", description: "", parentCategories: "" });
        fetchSubcategories();
      } else {
        alert(result.message || "Failed to add subcategory ❌");
      }
    } catch (err) {
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/labcategories`,
        {
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
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Lab Category added successfully ✅");
        setLabCategoryForm({
          name: "",
          description: "",
          parentSubcategory: "",
          category: "",
        });
        fetchLabCategories();
      } else {
        alert(result.message || "Failed to add lab category ❌");
      }
    } catch (err) {
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

  const handleSpecChange = (row, col, field, value) => {
    const newSpecs = [...productForm.technicalSpecification];
    newSpecs[row][col][field] = value;
    setProductForm({ ...productForm, technicalSpecification: newSpecs });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", productForm.name);
    data.append("description", productForm.description);
    data.append("PCode", productForm.PCode);
    data.append("category", productForm.category);
    data.append("subCategory", productForm.subCategory);
    data.append("labCategory", productForm.labCategory);
    if (productForm.image) data.append("image", productForm.image);

    // Flatten technical specs
    productForm.technicalSpecification.forEach((row) =>
      row.forEach((spec) => {
        if (spec.label && spec.value) {
          data.append("technicalSpecification", JSON.stringify(spec));
        }
      })
    );

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Product added successfully ✅");
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
        fetchProducts();
      } else {
        alert(result.message || "Failed to add product ❌");
      }
    } catch (err) {
      alert("Error while adding product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "addProduct"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("addProduct")}
          >
            Add Product
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "addCategory"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("addCategory")}
          >
            Add Category
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "addSubcategory"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("addSubcategory")}
          >
            Add Subcategory
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "addLabCategory"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("addLabCategory")}
          >
            Add Lab Category
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "viewData"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("viewData")}
          >
            View product
          </button>
        </div>

        {/* Add Product Form */}
        {activeTab === "addProduct" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
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
                    name="subCategory"
                    value={productForm.subCategory}
                    onChange={handleProductChange}
                    className="border p-2 w-full rounded"
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

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lab Category
                  </label>
                  <select
                    name="labCategory"
                    value={productForm.labCategory}
                    onChange={handleProductChange}
                    className="border p-2 w-full rounded"
                  >
                    <option value="">Select Lab Category</option>
                    {labCategories.map((lab) => (
                      <option key={lab._id} value={lab._id}>
                        {lab.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Code
                  </label>
                  <input
                    type="text"
                    name="PCode"
                    placeholder="Product Code"
                    value={productForm.PCode}
                    onChange={handleProductChange}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={productForm.name}
                    onChange={handleProductChange}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="border p-2 w-full rounded"
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  className="border p-2 w-full rounded"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Technical Specifications
                </label>
                <div className="overflow-x-auto">
                  <table className="border-collapse border border-gray-300 w-full text-sm">
                    <tbody>
                      {productForm.technicalSpecification.map(
                        (row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((spec, colIndex) => (
                              <td
                                key={colIndex}
                                className="border border-gray-300 p-2"
                              >
                                <input
                                  type="text"
                                  placeholder="Label"
                                  value={spec.label}
                                  onChange={(e) =>
                                    handleSpecChange(
                                      rowIndex,
                                      colIndex,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  className="border p-1 mb-1 w-full rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={spec.value}
                                  onChange={(e) =>
                                    handleSpecChange(
                                      rowIndex,
                                      colIndex,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="border p-1 w-full rounded"
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

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Add Category Form */}
        {activeTab === "addCategory" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
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
          <div>
            <h2 className="text-xl font-bold mb-4">Add New Subcategory</h2>
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

        {/* Add Lab Category Form - FIXED */}
        {activeTab === "addLabCategory" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Add New Lab Category</h2>
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
                  {/* <option value="">Select Subcategory</option>
                  {filteredSubcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))} */}

                  <option value="">Select Subcategory</option>
                  {subcategories.map((sub) => (
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

        {/* View Data Section */}
        {activeTab === "viewData" && (
          <div>
            <h2 className="text-xl font-bold mb-4">View Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Categories ({categories?.length})
                </h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat._id} className="text-sm">
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Subcategories ({subcategories?.length})
                </h3>
                <ul className="space-y-1">
                  {subcategories?.map((sub) => (
                    <li key={sub._id} className="text-sm">
                      {sub.name}{" "}
                      <span className="text-gray-500">
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

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Lab Categories ({labCategories?.length})
                </h3>
                <ul className="space-y-1">
                  {labCategories.map((lab) => (
                    <li key={lab._id} className="text-sm">
                      {lab.name}{" "}
                      <span className="text-gray-500">
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

              <div className="bg-gray-50 p-4 rounded-lg md:col-span-3">
                <h3 className="font-semibold mb-2">
                  Products ({products?.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Code</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Subcategory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => (
                        <tr key={product._id}>
                          <td className="py-2 px-4 border-b">{product.name}</td>
                          <td className="py-2 px-4 border-b">
                            {product.PCode}
                          </td>

                          {/* Categories (array) */}
                          <td className="py-2 px-4 border-b">
                            {product.categories?.map((c) => c.name).join(", ")}
                          </td>

                          {/* Subcategory (single object) */}
                          <td className="py-2 px-4 border-b">
                            {product.subCategory?.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
