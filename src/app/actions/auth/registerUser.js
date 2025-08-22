"use server";

import clientPromise from "@/lib/dbConnect";
import { hash } from "bcryptjs";

export const registerUser = async (formData) => {
  try {
    const { name, email, password, confirmPassword, agreeToTerms } = formData;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return { error: "All fields are required" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }

    if (!agreeToTerms) {
      return { error: "You must agree to the terms and conditions" };
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db("ShopStyleDB");
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Inserted user:", result);

    return {
      success: true,
      userId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("Registration error:", error);
    return { error: error.message || "An error occurred during registration" };
  }
};
