// app/api/products/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { 
      name, 
      description, 
      price, 
      originalPrice, 
      rating, 
      reviewCount, 
      image, 
      category, 
      isNew,
      stock 
    } = await request.json();
    
    // Validate required fields
    if (!name || !price || !image || !category || stock === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, image, category, stock" }, 
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db("ShopStyleDB");
    
    // Insert product into database
    const result = await db.collection("products").insertOne({
      name,
      description: description || "",
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      rating: rating ? parseFloat(rating) : 0,
      reviewCount: reviewCount ? parseInt(reviewCount) : 0,
      image,
      category,
      isNew: Boolean(isNew),
      stock: parseInt(stock),
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(
      { 
        message: "Product added successfully", 
        productId: result.insertedId 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}