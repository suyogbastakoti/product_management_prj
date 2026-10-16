import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

    } catch (error) {
        console.error("Error connecting to mongodb");
        process.exit(1); 
    }
}