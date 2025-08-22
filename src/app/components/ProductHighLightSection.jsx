import clientPromise from "@/lib/dbConnect";
import ProductHighlightClient from "./ProductHighlightClient";

export default async function ProductHighlightSection() {
  const client = await clientPromise;
  const db = client.db("ShopStyleDB"); 
  const products = await db.collection("products").find({}).toArray();

  // Convert MongoDB ObjectId to string for React keys
  const safeProducts = products.map(p => ({
    ...p,
    _id: p._id.toString(),
  }));

  return <ProductHighlightClient products={safeProducts} />;
}
