// app/dashboard/add-product/page.jsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/dashboard/add-product");
    return null;
  }
  
  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    rating: "",
    reviewCount: "",
    image: "",
    category: "",
    stock: "",
    isNew: false,
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          rating: formData.rating ? parseFloat(formData.rating) : 0,
          reviewCount: formData.reviewCount ? parseInt(formData.reviewCount) : 0,
          stock: parseInt(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        rating: "",
        reviewCount: "",
        image: "",
        category: "",
        stock: "",
        isNew: false,
        featured: false,
      });
      
      // Auto-dismiss success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      
      // Auto-dismiss error message after 5 seconds
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gradient-to-br from-gray-900 to-gray-950 py-8 px-4">
      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Left Content Section */}
          <div className="lg:w-2/5 bg-gradient-to-br from-indigo-900 to-purple-900 p-8 text-white flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
              <p className="text-indigo-200 mb-6">Fill out the form to add a new product to your catalog</p>
              
              <div className="space-y-6 mt-10">
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Product Details</h3>
                    <p className="text-indigo-200 text-sm">Provide accurate and detailed information about your product.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">High-Quality Images</h3>
                    <p className="text-indigo-200 text-sm">Use clear, high-resolution images to showcase your product.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure & Reliable</h3>
                    <p className="text-indigo-200 text-sm">Your product data is securely stored and managed.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-indigo-700 pt-6">
              <p className="text-indigo-300 text-sm">Need help? Contact our support team at support@example.com</p>
            </div>
          </div>
          
          {/* Right Form Section */}
          <div className="lg:w-3/5 p-8">
            <div className="mb-6 lg:hidden">
              <h1 className="text-2xl font-bold text-white">Add New Product</h1>
              <p className="text-gray-400">Fill out the form to add a new product</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-500 text-red-200 rounded-md"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>{error}</div>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-green-900/30 border-l-4 border-green-500 text-green-200 rounded-md"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>{success}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="Describe the product features and benefits"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-300 mb-2">
                    Original Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="4.5"
                  />
                </div>

                <div>
                  <label htmlFor="reviewCount" className="block text-sm font-medium text-gray-300 mb-2">
                    Review Count
                  </label>
                  <input
                    type="number"
                    id="reviewCount"
                    name="reviewCount"
                    value={formData.reviewCount}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="120"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select a category</option>
                    <option value="clothing">Clothing</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home & Living</option>
                    <option value="outerwear">Outerwear</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none text-white"
                    placeholder="100"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-2">
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="isNew"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">New Product</span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">Featured Product</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 极速 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 极速 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}