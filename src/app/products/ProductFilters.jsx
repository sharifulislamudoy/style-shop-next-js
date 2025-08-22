// src/app/components/products/ProductFilters.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Filter } from "lucide-react";

const categories = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Bags",
  "Jewelry",
  "Activewear"
];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: null }
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  
  const currentCategory = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    updateFilters({ 
      category: category === currentCategory ? '' : category 
    });
  };

  const handlePriceRangeChange = (range) => {
    const isCurrentRange = minPrice == range.min && maxPrice == range.max;
    
    if (isCurrentRange) {
      updateFilters({ minPrice: '', maxPrice: '' });
    } else {
      updateFilters({ 
        minPrice: range.min !== null ? range.min.toString() : '',
        maxPrice: range.max !== null ? range.max.toString() : ''
      });
    }
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-950 dark:text-white flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </h3>
        {(currentCategory || minPrice || maxPrice) && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-950 dark:text-white"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          Category
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isCategoryOpen && (
          <div className="mt-2 space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={currentCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label 
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-950 dark:text-white"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          Price
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isPriceOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isPriceOpen && (
          <div className="mt-2 space-y-2">
            {priceRanges.map((range, index) => {
              const isActive = minPrice == range.min && maxPrice == range.max;
              return (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`price-${index}`}
                    checked={isActive}
                    onChange={() => handlePriceRangeChange(range)}
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label 
                    htmlFor={`price-${index}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {range.label}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}