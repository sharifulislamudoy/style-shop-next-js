// src/app/products/page.js
import clientPromise from "@/lib/dbConnect";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid"; // Fixed import

export default async function ProductsPage({ searchParams }) {
  const client = await clientPromise;
  const db = client.db("ShopStyleDB");
  
  // Build query based on filters
  let query = {};
  
  if (searchParams.category) {
    query.category = searchParams.category;
  }
  
  if (searchParams.minPrice || searchParams.maxPrice) {
    query.price = {};
    if (searchParams.minPrice) query.price.$gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) query.price.$lte = parseFloat(searchParams.maxPrice);
  }
  
  // Get all products with optional filtering
  const products = await db.collection("products").find(query).toArray();
  
  // Convert MongoDB ObjectId to string for React keys
  const safeProducts = products.map(p => ({
    ...p,
    _id: p._id.toString(),
  }));

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
                Showing {safeProducts.length} products
              </p>
              
              {/* Sort dropdown would go here */}
            </div>
            
            <ProductGrid products={safeProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}