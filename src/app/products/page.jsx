import clientPromise from "@/lib/dbConnect";
import ProductsWrapper from "./ProductsWrapper";

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

  return <ProductsWrapper products={safeProducts} />;
}
