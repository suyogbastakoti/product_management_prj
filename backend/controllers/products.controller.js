import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProducts = async(req, res)=>{
    
    const {name, price, image}= req.body;

    if(!name || !price || !image){
        return res.status(400).json({message:"Please provide all fields."});
    }

    try {
        const product = await Product.create({name, price, image});
        res.status(201).json({success: true, data: product});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};

export const updateProducts = async(req, res)=>{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid Product ID"});
    }

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true, runValidators: true}
        );

        if(!product){
            return res.status(404).json({success: false, message:"Product not found!"});
        }
        res.status(200).json({success: true, data: product});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProducts = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid product ID"});
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, message: "Product Deleted Successfully!"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

