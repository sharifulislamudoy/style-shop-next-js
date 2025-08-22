import { ObjectId } from 'mongodb';
import clientPromise from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Heart, ShoppingCart, ChevronLeft, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus } from "lucide-react";
import Link from "next/link";

async function getProduct(id) {
    try {
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
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <div className="container w-11/12 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Breadcrumb */}
                <nav className="py-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Home
                        </Link>
                        <ChevronRight size={16} />
                        <Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Products
                        </Link>
                        <ChevronRight size={16} />
                        <span className="text-gray-900 dark:text-gray-100 truncate max-w-xs">{product.name}</span>
                    </div>
                </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
                {/* Product Image Gallery */}
                <div className="flex flex-col">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        
                        {product.isNew && (
                            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                New Arrival
                            </span>
                        )}

                        <button className="absolute top-4 right-4 p-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-900 transition-colors">
                            <Heart size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="aspect-square relative rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-400 transition-colors">
                                <Image
                                    src={product.image}
                                    alt={`${product.name} view ${item}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="py-2">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">
                            {product.category}
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center mb-6">
                            <div className="flex items-center mr-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={
                                            i < Math.floor(product.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300 dark:text-gray-700"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                {product.rating} • ({product.reviewCount} reviews)
                            </span>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                                {product.originalPrice && (
                                    <span className="text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2.5 py-1 rounded-full">
                                        Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            {product.description || "This premium product combines style and comfort for everyday wear. Made with high-quality materials and attention to detail, it's designed to elevate your wardrobe."}
                        </p>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-medium text-gray-900 dark:text-white">Select Size</h3>
                                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        className="px-4 py-3 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">Color</h3>
                            <div className="flex gap-3">
                                {[
                                    { name: 'Black', value: 'bg-gray-900' },
                                    { name: 'Blue', value: 'bg-blue-600' },
                                    { name: 'Red', value: 'bg-red-600' },
                                    { name: 'Green', value: 'bg-emerald-600' },
                                    { name: 'Sand', value: 'bg-amber-300' }
                                ].map((color) => (
                                    <button
                                        key={color.name}
                                        className={`w-10 h-10 rounded-full ${color.value} border-2 border-transparent hover:border-indigo-400 transition-colors flex items-center justify-center`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                                <button className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 font-medium">1</span>
                                <button className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium">
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                        </div>

                        <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 mb-8 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                                    <Truck size={20} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Free shipping</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                                    <RotateCcw size={20} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Easy returns</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">30 day return policy</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                                    <Shield size={20} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Secure payment</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Payment encryption</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Details</h3>
                            <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                                <li className="flex">
                                    <span className="text-gray-900 dark:text-gray-200 font-medium w-24 flex-shrink-0">Material:</span>
                                    <span>High-quality fabric blend with elastic properties</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-900 dark:text-gray-200 font-medium w-24 flex-shrink-0">Care:</span>
                                    <span>Machine wash cold, tumble dry low</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-900 dark:text-gray-200 font-medium w-24 flex-shrink-0">Origin:</span>
                                    <span>Imported</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-900 dark:text-gray-200 font-medium w-24 flex-shrink-0">SKU:</span>
                                    <span>{product._id.slice(-6).toUpperCase()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}