import { Document, model, Schema } from "mongoose";

export interface ProductDocument extends Document{
    name: string;
    description?: string;
    price: number; 
    countInStock: number;
    category?: string;
}

const productSchema = new Schema<ProductDocument> ({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required:true, default: 0},
    countInStock: {type: Number, required: true, default:0},
    category: {type: String}
});

export const Product  = model<ProductDocument>("Product", productSchema, "products")