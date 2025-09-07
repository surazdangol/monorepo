import { Schema, model, Document } from "mongoose";

export interface CartItem {
  product: Schema.Types.ObjectId; // reference to Product
  qty: number;
}

export interface CartDocument extends Document {
  user: Schema.Types.ObjectId; // reference to User
  cartItems: CartItem[];
}

const cartSchema = new Schema<CartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    cartItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model<CartDocument>("Cart", cartSchema, "carts");