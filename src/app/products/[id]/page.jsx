import { ObjectId } from 'mongodb';
import clientPromise from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import Link from "next/link";

async function getProduct(id) {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            return null;
        }
        
        const client = await clientPromise;
        const db = client.db("ShopStyleDB");
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

        return product ? {
            ...product,
            _id: product._id.toString()
        } : null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="container w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link
                        href="/"
                        className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Products
                    </Link>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="aspect-square overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>

                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
                                    New Arrival
                                </span>
                            )}

                            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Heart size={20} className="text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="py-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
                                {product.category}
                            </p>

                            <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center mb-6">
                                <div className="flex items-center mr-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={
                                                i < Math.floor(product.rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300 dark:text-gray-600"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold text-gray-950 dark:text-white">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                            ${product.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                    {product.originalPrice && (
                                        <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                {product.description || "This premium product combines style and comfort for everyday wear. Made with high-quality materials and attention to detail, it's designed to elevate your wardrobe."}
                            </p>

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white mb-3">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white mb-3">Color</h3>
                                <div className="flex gap-3">
                                    {['bg-black', 'bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-yellow-400'].map((color) => (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 rounded-full ${color} border-2 border-transparent hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 mb-8">
                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                    <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        -
                                    </button>
                                    <span className="px-4 py-2">1</span>
                                    <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        +
                                    </button>
                                </div>

                                <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white mb-3">Product Details</h3>
                                <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                                    <li>• Material: High-quality fabric blend</li>
                                    <li>• Care: Machine wash cold, tumble dry low</li>
                                    <li>• Imported</li>
                                    <li>• SKU: {product._id.slice(-6).toUpperCase()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}