'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Zap, Tag, ArrowRight } from 'lucide-react';

const SaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Mock sale products data
  const saleProducts = [
    {
      id: 1,
      name: 'Premium Denim Jacket',
      originalPrice: 89.99,
      salePrice: 59.99,
      discount: 33,
      image: '/denim-jacket.jpg'
    },
    {
      id: 2,
      name: 'Casual Summer Dress',
      originalPrice: 65.00,
      salePrice: 45.50,
      discount: 30,
      image: '/summer-dress.jpg'
    },
    {
      id: 3,
      name: 'Sport Running Shoes',
      originalPrice: 120.00,
      salePrice: 79.99,
      discount: 33,
      image: '/running-shoes.jpg'
    },
    {
      id: 4,
      name: 'Designer Handbag',
      originalPrice: 145.00,
      salePrice: 99.99,
      discount: 31,
      image: '/handbag.jpg'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Summer Sale</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don&apos;t miss our biggest sale of the season! Up to 50% off on selected items.
          </p>
          
          {/* Countdown Timer */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 inline-flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.days}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.hours}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Mins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Secs</span>
            </div>
          </div>
        </motion.div>

        {/* Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium flex items-center gap-2 mx-auto hover:bg-indigo-700 transition-colors duration-200"
          >
            View All Sale Items
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SaleSection;