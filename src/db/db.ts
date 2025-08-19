import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = await import.meta.env.VITE_MONGO_URI;

  if (!uri) {
    throw new Error("Please define the VITE_MONGO_URI environment variable");
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (e) {
    console.log("Error:", e.message);
    process.exit(1);
  }
};
