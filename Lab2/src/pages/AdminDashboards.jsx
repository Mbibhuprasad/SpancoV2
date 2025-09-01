import React, { useState } from "react";
import { Settings, Plus, Edit, Trash2 } from "lucide-react";
import { useData } from "../context/DataContext";

const AdminDashboard = () => {
  const {
    categories,
    labCategories,
    bioCategories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    addLabCategory,
    updateLabCategory,
    deleteLabCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useData();

  const [activeTab, setActiveTab] = useState("categories");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAddCategory = () => {
    if (formData.name) {
      addCategory({ name: formData.name });
      setFormData({});
    }
  };

  const handleEditCategory = (category) => {
    setEditingItem(category);
    setFormData({ name: category.name });
  };

  const handleUpdateCategory = () => {
    if (editingItem && formData.name) {
      updateCategory(editingItem.id, { name: formData.name });
      setEditingItem(null);
      setFormData({});
    }
  };

  const handleAddLabCategory = () => {
    if (formData.name) {
      addLabCategory({ name: formData.name });
      setFormData({});
    }
  };

  const handleEditLabCategory = (labCategory) => {
    setEditingItem(labCategory);
    setFormData({ name: labCategory.name });
  };

  const handleUpdateLabCategory = () => {
    if (editingItem && formData.name) {
      updateLabCategory(editingItem.id, { name: formData.name });
      setEditingItem(null);
      setFormData({});
    }
  };

  const handleAddProduct = () => {
    if (
      formData.name &&
      formData.description &&
      formData.pcode &&
      formData.categoryId &&
      formData.subcategoryId &&
      formData.labCategoryId
    ) {
      addProduct({
        name: formData.name,
        description: formData.description,
        pcode: formData.pcode,
        image:
          formData.image ||
          "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400",
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        labCategoryId: formData.labCategoryId,
        technicalSpecifications:
          formData.technicalSpecifications ||
          Array(20)
            .fill()
            .map(() => Array(20).fill("")),
      });
      setFormData({});
    }
  };

  const handleEditProduct = (product) => {
    setEditingItem(product);
    setFormData({
      ...product,
      technicalSpecifications:
        product.technicalSpecifications ||
        Array(20)
          .fill()
          .map(() => Array(20).fill("")),
    });
  };

  const handleUpdateProduct = () => {
    if (editingItem) {
      updateProduct(editingItem.id, {
        name: formData.name,
        description: formData.description,
        pcode: formData.pcode,
        image: formData.image,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        labCategoryId: formData.labCategoryId,
        technicalSpecifications: formData.technicalSpecifications,
      });
      setEditingItem(null);
      setFormData({});
    }
  };

  const handleTechnicalSpecChange = (row, col, value) => {
    const updatedSpecs = formData.technicalSpecifications.map(
      (rowData, rowIndex) =>
        rowIndex === row
          ? rowData.map((cell, colIndex) => (colIndex === col ? value : cell))
          : rowData
    );
    setFormData({ ...formData, technicalSpecifications: updatedSpecs });
  };

  // Updated logic so only one shows at a time
  const [physicsshow, setPhysicsshow] = useState(false);
  const [biotechshow, setbiotechshow] = useState(false);

  const togglePhysics = () => {
    setPhysicsshow(true);
    setbiotechshow(false);
  };
  const toggleBiotech = () => {
    setbiotechshow(true);
    setPhysicsshow(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Settings className="h-8 w-8 text-[#703233] mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "categories"
                    ? "border-[#973E42] text-[#703233]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("labCategories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "labCategories"
                    ? "border-[#973E42] text-[#703233]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Lab Categories
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-[#973E42] text-[#703233]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Products
              </button>
            </nav>
          </div>
        </div>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            {/* Add Category Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? "Edit Category" : "Add New Category"}
              </h3>
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#973E42]"
                    placeholder="Enter category name"
                  />
                </div>
                <button
                  onClick={
                    editingItem ? handleUpdateCategory : handleAddCategory
                  }
                  className="bg-[#973E42] text-white px-4 py-2 rounded-md hover:bg-[#703233] flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Category
                </button>
                {editingItem && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Categories
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {category.subcategories.length} subcategories
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subcategories */}
                    <div className="px-6 pb-4">
                      <div className="bg-gray-50 rounded p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">
                          Subcategories:
                        </h5>
                        <div className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm text-gray-600">
                                {sub.name}
                              </span>
                              <button
                                onClick={() => deleteSubcategory(sub.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add Subcategory */}
                        <div className="mt-3 flex space-x-2">
                          <input
                            type="text"
                            value={formData.subcategoryName || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subcategoryName: e.target.value,
                                categoryId: category.id,
                              })
                            }
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Add subcategory"
                          />
                          <button
                            onClick={() => {
                              if (formData.subcategoryName) {
                                addSubcategory({
                                  name: formData.subcategoryName,
                                  categoryId: category.id,
                                });
                                setFormData({
                                  ...formData,
                                  subcategoryName: "",
                                });
                              }
                            }}
                            className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lab Categories Tab */}
        {activeTab === "labCategories" && (
          <div className="space-y-6">
            {/* Add Lab Category Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem ? "Edit Lab Category" : "Add New Lab Category"}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={togglePhysics}
                    className="bg-[#973E42] text-white px-3 py-1 rounded-md hover:bg-[#703233] text-lg"
                  >
                    Physics
                  </button>
                  <button
                    onClick={toggleBiotech}
                    className="bg-[#973E42] text-white px-3 py-1 rounded-md hover:bg-[#703233] text-lg"
                  >
                    Biotechnology
                  </button>
                </div>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lab category name"
                  />
                </div>
                <button
                  onClick={
                    editingItem ? handleUpdateLabCategory : handleAddLabCategory
                  }
                  className="bg-[#973E42] text-white px-4 py-2 rounded-md hover:bg-[#703233] flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Lab Category
                </button>
                {editingItem && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Physics Lab Categories */}
            {physicsshow && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Physics Lab Categories
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {labCategories.map((labCategory) => (
                    <div
                      key={labCategory.id}
                      className="px-6 py-4 flex items-center justify-between"
                    >
                      <h4 className="text-lg font-medium text-gray-900">
                        {labCategory.name}
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLabCategory(labCategory)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteLabCategory(labCategory.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Biotechnology Lab Categories */}
            {biotechshow && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Biotechnology Lab Categories
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {bioCategories.map((labCategory) => (
                    <div
                      key={labCategory.id}
                      className="px-6 py-4 flex items-center justify-between"
                    >
                      <h4 className="text-lg font-medium text-gray-900">
                        {labCategory.name}
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLabCategory(labCategory)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteLabCategory(labCategory.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? "Edit Product" : "Add New Product"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pcode
                  </label>
                  <input
                    type="text"
                    value={formData.pcode || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, pcode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.categoryId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        subcategoryId: "",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    value={formData.subcategoryId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subcategoryId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!formData.categoryId}
                  >
                    <option value="">Select Subcategory</option>
                    {formData.categoryId &&
                      categories
                        .find((cat) => cat.id === formData.categoryId)
                        ?.subcategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab Category
                  </label>
                  <select
                    value={formData.labCategoryId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        labCategoryId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Lab Category</option>
                    {labCategories.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Specifications
                  </label>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <tbody>
                        {(
                          formData.technicalSpecifications ||
                          Array(20)
                            .fill()
                            .map(() => Array(20).fill(""))
                        ).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <td
                                key={colIndex}
                                className="border border-gray-300"
                              >
                                {cell ? (
                                  <div className="p-2 bg-gray-100">{cell}</div>
                                ) : (
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleTechnicalSpecChange(
                                        rowIndex,
                                        colIndex,
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={editingItem ? handleUpdateProduct : handleAddProduct}
                  className="bg-[#973E42] text-white px-4 py-2 rounded-md hover:bg-[#703233] flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Product
                </button>
                {editingItem && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Products</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.description}
                      </p>
                      <p className="text-lg font-bold text-blue-600 mb-3">
                        {product.pcode}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          <Edit className="h-3 w-3 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3 inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
