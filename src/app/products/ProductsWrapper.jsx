'use client';

import { useEffect } from "react";
import { toast } from "react-toastify";
import ProductGrid from "./ProductGrid";


export default function ProductsWrapper({ products }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("loginSuccess") === "true") {
                toast.success("Signed successful! 🚀");
                localStorage.removeItem("loginSuccess");
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="container w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-2">
                        All Products
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Discover our complete collection of trendy fashion items
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Products grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                Showing {products.length} products
                            </p>
                        </div>
                        <ProductGrid products={products} />
                    </div>
                </div>
            </div>
        </div>
    );
}
