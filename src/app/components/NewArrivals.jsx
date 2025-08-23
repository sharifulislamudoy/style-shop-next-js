'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const NewArrivals = () => {

    const products = [
        {
            id: 1,
            name: 'Premium Denim Jacket',
            price: 89.99,
            rating: 4.8,
            image: '/api/placeholder/300/400',
            category: 'Jackets',
        },
        {
            id: 2,
            name: 'Casual Summer Dress',
            price: 59.99,
            rating: 4.5,
            image: '/api/placeholder/300/400',
            category: 'Dresses',
        },
        {
            id: 3,
            name: 'Designer Leather Bag',
            price: 129.99,
            rating: 4.9,
            image: '/api/placeholder/300/400',
            category: 'Accessories',
        },
        {
            id: 4,
            name: 'Classic White Sneakers',
            price: 79.99,
            rating: 4.7,
            image: '/api/placeholder/300/400',
            category: 'Footwear',
        },
        {
            id: 5,
            name: 'Striped Cotton T-Shirt',
            price: 29.99,
            rating: 4.3,
            image: '/api/placeholder/300/400',
            category: 'Tops',
        },
        {
            id: 6,
            name: 'Slim Fit Chino Pants',
            price: 49.99,
            rating: 4.6,
            image: '/api/placeholder/300/400',
            category: 'Bottoms',
        },
        {
            id: 7,
            name: 'Oversized Knit Sweater',
            price: 69.99,
            rating: 4.4,
            image: '/api/placeholder/300/400',
            category: 'Sweaters',
        },
        {
            id: 8,
            name: 'Vintage Style Sunglasses',
            price: 39.99,
            rating: 4.2,
            image: '/api/placeholder/300/400',
            category: 'Accessories',
        },
    ];

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        New Arrivals
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover our latest collection of fashion pieces that will elevate your style
                    </motion.p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <Link href={`/products/${product.id}`}>
                                    <div className="h-80 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-500 dark:text-gray-400">Product Image</span>
                                    </div>
                                </Link>
                                
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-4">
                                <Link href={`/products/${product.id}`}>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                
                                {/* Rating */}
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i}
                                                size={16} 
                                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                        ({product.rating})
                                    </span>
                                </div>
                                
                                {/* Price and CTA */}
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                                        aria-label="Add to cart"
                                    >
                                        <ShoppingCart size={18} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/new">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            View All New Arrivals
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default NewArrivals;