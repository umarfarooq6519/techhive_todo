import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(import.meta.env.VITE_MONGO_URI || "");
    console.log("MongoDB connected:", conn.connection.host);
  } catch (e) {
    console.log("Error:", e.message);
    process.exit(1);
  }
};
