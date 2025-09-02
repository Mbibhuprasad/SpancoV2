import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductOnLabCategories() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [labCategory, setLabCategory] = useState({});
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const labCategoryId = "68566aba6ef80b19790a2b08"; // later get from params
  const limit = 10;

  useEffect(() => {
    const getLabcategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/labcategories/${labCategoryId}`
        );
        setLabCategory(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getLabcategories();
  }, [labCategoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URI
          }/products/labcategory/${labCategoryId}?page=${page}&limit=${limit}`
        );
        if (res.data.success) {
          setProducts(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [labCategoryId, page]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        {labCategory?.name} Products
      </h1>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-xl transition"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <button
              onClick={() => setSelectedProduct(product)}
              className="mt-3 px-4 py-2 bg-[#8F3C3F] text-white rounded-lg hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-[#8F3C3F] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={!pagination.hasNextPage}
            onClick={() =>
              setPage((prev) => (pagination.hasNextPage ? prev + 1 : prev))
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image[0]}
              alt={selectedProduct.name}
              className="w-full h-56 object-contain mb-4"
            />
            <p className="mb-2">
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p className="mb-2">
              <strong>PCode:</strong> {selectedProduct.PCode}
            </p>
            <p className="mb-2">
              <strong>Categories:</strong>{" "}
              {selectedProduct.categories.map((c) => c.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Subcategory:</strong> {selectedProduct.subCategory?.name}
            </p>
            <p className="mb-2">
              <strong>Lab Category:</strong> {selectedProduct.labCategory?.name}
            </p>
            <div className="mt-4">
              <strong>Technical Specifications:</strong>
              <ul className="list-disc ml-6">
                {selectedProduct.technicalSpecification.map((spec, idx) => (
                  <li key={idx}>
                    {spec.label} {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
