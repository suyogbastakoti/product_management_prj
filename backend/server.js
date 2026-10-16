import express from 'express';
import { connectDb } from './config/db.js';
import productRoutes from "./routes/product.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//middleware
app.use(express.json());  //allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(PORT, ()=>{
    connectDb();
    console.log(`Server started at PORT: ${PORT}`);
});