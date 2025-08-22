import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/dbConnect";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("ShopStyleDB");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const client = await clientPromise;
        const db = client.db("ShopStyleDB");
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          // Save Google user to DB
          const result = await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            password: null, // Google users don't have a password
            createdAt: new Date(),
            updatedAt: new Date(),
            provider: "google",
          });
          console.log("Google user saved:", result.insertedId.toString());
        }
      }
      return true;
    },

    async session({ session, token, user }) {
      // Attach DB user ID to session
      session.user.id = token.sub;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
