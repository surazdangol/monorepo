import { Request, Response, NextFunction } from "express";
import { Product } from "../models/productModel";

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create new product (Admin only - reminder: Admin check will be added later)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, countInStock, category } = req.body;
    const product = await Product.create({ name, description, price, countInStock, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
