import { Schema, model, Document } from "mongoose";

export interface OrderDocument extends Document {
  user: Schema.Types.ObjectId; // who placed the order
  orderItems: {
    product: Schema.Types.ObjectId; // reference to Product
    name: string;
    qty: number;
    price: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;

  // Payment fields
  isPaid: boolean;
  paidAt?: Date;
  paymentResult?: {
    id: string; // payment gateway ID (Stripe/PayPal)
    status: string;
    update_time: string;
    email_address: string;
  };

  // Delivery fields
  isDelivered: boolean;
  deliveredAt?: Date;

  // Pricing
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const orderSchema = new Schema<OrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },

    // Payment status
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    // Delivery status
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    // Prices
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Order = model<OrderDocument>("Order", orderSchema, "orders");