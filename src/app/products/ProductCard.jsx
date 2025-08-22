// src/app/products/ProductCard.js
"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                        New
                    </span>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Heart size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div className="absolute bottom-2 left-2 flex items-center bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                    <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                    {product.rating} ({product.reviewCount})
                </div>
            </div>

            <div className="p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                    {product.category}
                </p>
                <h3 className="font-medium text-gray-950 dark:text-white mb-2 line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-950 dark:text-white">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                        aria-label="Add to cart"
                    >
                        <Link href={`/products/${product._id}`}>
                            <ShoppingCart size={16} />
                        </Link>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}